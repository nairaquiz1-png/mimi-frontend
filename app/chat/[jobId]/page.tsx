"use client";

import { useState } from "react";

type Message = {
  id: number;
  sender: "user" | "provider";
  text: string;
  time: string;
};

// 🔒 Week 1 lock — enable in Week 2/3
const CHAT_ENABLED = false;

export default function JobChatPage() {
  const [messages] = useState<Message[]>([
    {
      id: 1,
      sender: "provider",
      text: "Hello, I’m on my way to your location.",
      time: "10:02 AM",
    },
    {
      id: 2,
      sender: "user",
      text: "Great, my car broke down near the bridge.",
      time: "10:03 AM",
    },
  ]);

  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (!CHAT_ENABLED) return;
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-3xl bg-white rounded-lg shadow-md flex flex-col">
        {/* Header */}
        <div className="border-b p-4 flex items-center justify-between">
          <div>
            <h2 className="font-semibold text-lg">Job Chat</h2>
            <p className="text-sm text-gray-500">
              Mechanic • En route to your location
            </p>
            <p className="text-xs text-gray-400 mt-1">
              Chat becomes active once the provider accepts your job.
            </p>
          </div>

          <span className="text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded">
            Locked
          </span>
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
                className={`max-w-xs md:max-w-md px-4 py-2 rounded-lg text-sm shadow
                  ${
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
            disabled
            type="text"
            placeholder="Chat will be enabled after job acceptance"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 border rounded-md px-3 py-2 text-sm bg-gray-100 cursor-not-allowed"
          />

          <button
            disabled
            onClick={sendMessage}
            className="bg-gray-300 text-gray-500 px-5 py-2 rounded-md text-sm cursor-not-allowed"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
