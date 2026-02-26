"use client";

import Navbar from "@/components/navbar";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState(""); // must match JWT default
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post("http://127.0.0.1:8000/api/auth/login/", {
        username,
        password,
      });

      // Save tokens to localStorage
      localStorage.setItem("access_token", res.data.access);
      localStorage.setItem("refresh_token", res.data.refresh);

      // Redirect to landing page
      router.push("/landing");
    } catch (err: any) {
      console.error(err);
      setError("Login failed. Check username/password.");
    }
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen flex flex-col items-center justify-center p-6 bg-white">
        <div className="w-full max-w-md bg-gray-50 p-8 rounded-xl shadow-md">
          <h1 className="text-3xl font-bold text-center mb-6">Login</h1>

          {error && (
            <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
          )}

          <form className="space-y-4" onSubmit={handleLogin}>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-black"
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-black"
            />

            <button
              type="submit"
              className="w-full px-6 py-3 rounded bg-black text-white hover:opacity-80"
            >
              Login
            </button>
          </form>

          <p className="text-sm text-center text-gray-500 mt-4">
            Don't have an account?{" "}
            <button
              onClick={() => router.push("/signup")}
              className="underline text-black hover:opacity-80"
            >
              Sign Up
            </button>
          </p>
        </div>
      </main>
    </>
  );
}
