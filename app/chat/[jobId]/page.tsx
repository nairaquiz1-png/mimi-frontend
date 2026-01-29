"use client";

import { useState } from "react";

type Message = {
  id: number;
  sender: "user" | "provider";
  text: string;
  time: string;
};

export default function JobChatPage() {
  const [messages, setMessages] = useState<Message[]>([
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
    if (!input.trim()) return;

    setMessages([
      ...messages,
      {
        id: messages.length + 1,
        sender: "user",
        text: input,
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      },
    ]);
    setInput("");
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
          </div>
          <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
            Active Job
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
            type="text"
            placeholder="Type your message…"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
          />
          <button
            onClick={sendMessage}
            className="bg-black text-white px-5 py-2 rounded-md text-sm hover:opacity-90"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
