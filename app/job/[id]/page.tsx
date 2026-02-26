"use client";

import { useEffect, useState } from "react";
import axios from "axios";

type Message = {
  id: number;
  sender: "user" | "provider";
  text: string;
  time: string;
};

const CHAT_ENABLED = true; // Unlock chat once the job exists

export default function JobChatPage({ params }: { params: { jobId: string } }) {
  const jobId = params.jobId;
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [error, setError] = useState("");

  // -----------------------------
  // Fetch messages every 3 seconds
  // -----------------------------
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const token = localStorage.getItem("access_token");
        if (!token) throw new Error("Not logged in");

        const res = await axios.get(
          `http://127.0.0.1:8000/api/chat/rooms/${jobId}/messages/`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        setMessages(
          res.data.map((msg: any) => ({
            id: msg.id,
            sender: msg.sender === msg.sender ? "user" : "provider", // Simplified
            text: msg.text,
            time: new Date(msg.created_at).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
          }))
        );
      } catch (err: any) {
        console.error(err);
        setError(err.response?.data?.detail || err.message);
      }
    };

    fetchMessages();
    const interval = setInterval(fetchMessages, 3000);
    return () => clearInterval(interval);
  }, [jobId]);

  // -----------------------------
  // Send message
  // -----------------------------
  const sendMessage = async () => {
    if (!CHAT_ENABLED || !input.trim()) return;

    try {
      const token = localStorage.getItem("access_token");
      if (!token) throw new Error("Not logged in");

      await axios.post(
        `http://127.0.0.1:8000/api/chat/rooms/${jobId}/messages/send/`,
        { text: input },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setInput("");
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.detail || err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-3xl bg-white rounded-lg shadow-md flex flex-col">
        {/* Header */}
        <div className="border-b p-4 flex items-center justify-between">
          <div>
            <h2 className="font-semibold text-lg">Job Chat</h2>
            <p className="text-sm text-gray-500">Chat with your provider</p>
            {!CHAT_ENABLED && (
              <p className="text-xs text-gray-400 mt-1">
                Chat becomes active once the provider accepts your job.
              </p>
            )}
          </div>
          {!CHAT_ENABLED && (
            <span className="text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded">
              Locked
            </span>
          )}
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${
                msg.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-xs md:max-w-md px-4 py-2 rounded-lg text-sm shadow ${
                  msg.sender === "user"
                    ? "bg-black text-white rounded-br-none"
                    : "bg-gray-100 text-gray-900 rounded-bl-none"
                }`}
              >
                <p>{msg.text}</p>
                <span className="block text-[10px] opacity-70 mt-1 text-right">
                  {msg.time}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="border-t p-4 flex gap-2">
          <input
            disabled={!CHAT_ENABLED}
            type="text"
            placeholder={
              CHAT_ENABLED
                ? "Type a message..."
                : "Chat locked until job acceptance"
            }
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className={`flex-1 border rounded-md px-3 py-2 text-sm ${
              CHAT_ENABLED ? "" : "bg-gray-100 cursor-not-allowed"
            }`}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                sendMessage();
              }
            }}
          />
          <button
            disabled={!CHAT_ENABLED}
            onClick={sendMessage}
            className={`px-5 py-2 rounded-md text-sm ${
              CHAT_ENABLED
                ? "bg-black text-white"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            Send
          </button>
        </div>

        {error && <p className="text-red-500 mt-2">{error}</p>}
      </div>
    </div>
  );
}
