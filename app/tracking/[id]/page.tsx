"use client";

import { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import mapboxgl from "mapbox-gl";
import Navbar from "@/components/navbar";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN!;

export default function TrackingPage() {
  // ✅ Next.js 16 client-safe params
  const params = useParams();
  const jobId = params.id as string;

  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const providerMarker = useRef<mapboxgl.Marker | null>(null);

  // ETA state (minutes)
  const [eta, setEta] = useState<number | null>(null);

  // Customer coordinates (replace with backend data later)
  const customerLat = 6.5244;
  const customerLng = 3.3792;

  // Provider initial coordinates
  const providerLat = 6.5240;
  const providerLng = 3.3780;

  // Fetch route and calculate ETA using Mapbox Directions API
  const getRoute = async (from: number[], to: number[]) => {
    const query = `https://api.mapbox.com/directions/v5/mapbox/driving/${from[0]},${from[1]};${to[0]},${to[1]}?geometries=geojson&access_token=${process.env.NEXT_PUBLIC_MAPBOX_TOKEN}`;
    const response = await fetch(query);
    const data = await response.json();
    if (!data.routes || !data.routes[0]) return null;

    // ETA in minutes
    setEta(Math.round(data.routes[0].duration / 60));
    return data.routes[0].geometry; // GeoJSON LineString
  };

  useEffect(() => {
    if (!map.current && mapContainer.current) {
      // Initialize Mapbox map
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/streets-v11",
        center: [customerLng, customerLat],
        zoom: 14,
      });

      // Customer marker (blue)
      new mapboxgl.Marker({ color: "blue" })
        .setLngLat([customerLng, customerLat])
        .addTo(map.current);

      // Provider marker (red)
      providerMarker.current = new mapboxgl.Marker({ color: "red" })
        .setLngLat([providerLng, providerLat])
        .addTo(map.current);

      // Draw initial route
      (async () => {
        const geojson = await getRoute([providerLng, providerLat], [customerLng, customerLat]);
        if (!geojson) return;

        if (!map.current!.getSource("route")) {
          map.current!.addSource("route", { type: "geojson", data: geojson });
          map.current!.addLayer({
            id: "route-line",
            type: "line",
            source: "route",
            layout: { "line-join": "round", "line-cap": "round" },
            paint: { "line-color": "#1D4ED8", "line-width": 4 },
          });
        } else {
          (map.current!.getSource("route") as mapboxgl.GeoJSONSource).setData(geojson);
        }
      })();
    }

    // Connect to WebSocket for live provider location
    const socket = new WebSocket(
      `${location.protocol === "https:" ? "wss" : "ws"}://${location.host}/ws/job/${jobId}/`
    );

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      const { lat, lng } = data;

      if (lat && lng && providerMarker.current) {
        providerMarker.current.setLngLat([lng, lat]);
        // Optional: follow provider
        map.current?.setCenter([lng, lat]);
      }
    };

    return () => socket.close();
  }, [jobId]);

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="text-3xl font-bold mb-2">Live Job Tracking</h1>
          <p className="text-gray-600 mb-8">Job ID: #{jobId}</p>

          {/* Map */}
          <div ref={mapContainer} className="rounded-xl mb-8" style={{ height: "500px" }} />

          {/* Status */}
          <div className="bg-white rounded-xl p-6 mb-6">
            <h2 className="font-semibold mb-2">Provider Status</h2>
            <p className="text-gray-600">🚗 Provider is on the way to your location</p>
            {eta !== null && <p className="text-gray-600 mt-1">⏱ Estimated arrival: {eta} min</p>}
          </div>

          {/* Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <a
              href={`/chat/${jobId}`}
              className="block text-center p-4 bg-white rounded-xl border hover:bg-gray-50"
            >
              💬 Open Chat
            </a>
            <a
              href={`/job/${jobId}`}
              className="block text-center p-4 bg-white rounded-xl border hover:bg-gray-50"
            >
              📄 View Job Details
            </a>
          </div>
        </div>
      </main>
    </>
  );
}