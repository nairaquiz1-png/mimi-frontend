"use client";

import Navbar from "@/components/navbar";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function SignupPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("customer"); // default role
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post(
        "http://62.171.148.243:8000/api/auth/register/",
        {
          username,
          email,
          password,
          role,
          phone,
        }
      );

      if (res.status === 201 || res.status === 200) {
        router.push("/login"); // redirect to login page
      }
    } catch (err: any) {
      console.error(err);

      // Display validation errors from backend
      if (err.response?.data) {
        const data = err.response.data;
        if (data.role) setError(`Role: ${data.role.join(", ")}`);
        else if (data.username) setError(`Username: ${data.username.join(", ")}`);
        else if (data.email) setError(`Email: ${data.email.join(", ")}`);
        else if (data.password) setError(`Password: ${data.password.join(", ")}`);
        else if (data.detail) setError(data.detail);
        else setError("Signup failed. Please check your input.");
      } else {
        setError("Network or server error.");
      }
    }
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen flex flex-col items-center justify-center p-6 bg-white">
        <div className="w-full max-w-md bg-gray-50 p-8 rounded-xl shadow-md">
          <h1 className="text-3xl font-bold text-center mb-6">Sign Up</h1>

          {error && (
            <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
          )}

          <form className="space-y-4" onSubmit={handleSignup}>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-black"
            />

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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

            <input
              type="text"
              placeholder="Phone (optional)"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-black"
            />

            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-black"
            >
              <option value="customer">Customer</option>
              <option value="provider">Provider</option>
            </select>

            <button
              type="submit"
              className="w-full px-6 py-3 rounded bg-black text-white hover:opacity-80"
            >
              Sign Up
            </button>
          </form>

          <p className="text-sm text-center text-gray-500 mt-4">
            Already have an account?{" "}
            <button
              onClick={() => router.push("/login")}
              className="underline text-black hover:opacity-80"
            >
              Login
            </button>
          </p>
        </div>
      </main>
    </>
  );
}