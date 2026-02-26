"use client";

import Navbar from "@/components/navbar";
import { useState } from "react";
import { useRouter } from "next/navigation";

type Provider = {
  slug: string;
  user: { username: string };
  service: string;
  bio?: string;
  rating: number;
  location: string;
};

type Props = {
  provider: Provider;
};

export default function RequestServicePage({ provider }: Props) {
  const router = useRouter();
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [urgency, setUrgency] = useState("Immediate");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const token = localStorage.getItem("access_token");
      if (!token) throw new Error("Not logged in");

      await fetch(`http://127.0.0.1:8000/jobs/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          provider_slug: provider.slug,
          description,
          location,
          urgency,
        }),
      });

      setSuccess("Request submitted successfully!");
      setDescription("");
      setLocation("");
      setUrgency("Immediate");

      // Redirect to chat page after submission (optional)
      router.push(`/chat/${provider.slug}`);
    } catch (err: any) {
      console.error(err);
      setError("Failed to submit request. Make sure you're logged in.");
    }
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50 px-6 py-16">
        <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-sm p-8">
          <h1 className="text-3xl font-bold mb-2">Request {provider.service}</h1>

          <p className="text-gray-600 mb-8">
            You are requesting service from{" "}
            <span className="font-medium">{provider.user.username}</span>
          </p>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium mb-1">
                Describe your issue
              </label>
              <textarea
                className="w-full border rounded-lg p-3"
                rows={4}
                placeholder="My car stopped on the highway..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Your location
              </label>
              <input
                type="text"
                className="w-full border rounded-lg p-3"
                placeholder="Enter your location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Urgency</label>
              <select
                className="w-full border rounded-lg p-3"
                value={urgency}
                onChange={(e) => setUrgency(e.target.value)}
              >
                <option>Immediate</option>
                <option>Within 1 hour</option>
                <option>Today</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full bg-black text-white py-4 rounded-lg hover:opacity-90"
            >
              Submit Request
            </button>
          </form>

          {error && <p className="text-red-500 mt-4">{error}</p>}
          {success && <p className="text-green-500 mt-4">{success}</p>}
        </div>
      </main>
    </>
  );
}
