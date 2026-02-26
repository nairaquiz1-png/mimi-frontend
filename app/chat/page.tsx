"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

interface ChatRoom {
  id: number;
  job: number;
}

export default function ChatRoomsPage() {
  const [rooms, setRooms] = useState<ChatRoom[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const token = localStorage.getItem("access_token");
        if (!token) throw new Error("Not logged in");

        const res = await axios.get("http://localhost:8000/chat/rooms/", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setRooms(res.data);
      } catch (err: any) {
        console.error(err);
        setError("Failed to load chat rooms");
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, []);

  if (loading) return <p>Loading chat rooms...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (rooms.length === 0) return <p>No chat rooms yet.</p>;

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Your Chat Rooms</h1>
      <ul className="space-y-2">
        {rooms.map((room) => (
          <li
            key={room.id}
            className="border rounded p-3 hover:bg-gray-50 transition"
          >
            <Link href={`/chat/${room.job}`}>
              <span>Job #{room.job}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
