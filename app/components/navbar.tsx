"use client";

import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();

  return (
    <nav className="w-full bg-white shadow-md px-6 py-4 flex justify-between items-center fixed top-0 left-0 z-50">
      <div className="text-2xl font-bold cursor-pointer" onClick={() => router.push("/landing")}>
        Mimi
      </div>

      <div className="flex gap-4">
        <button
          onClick={() => router.push("/login")}
          className="text-black hover:opacity-80"
        >
          Login
        </button>
        <button
          onClick={() => router.push("/signup")}
          className="bg-black text-white px-4 py-2 rounded hover:opacity-80"
        >
          Sign Up
        </button>
      </div>
    </nav>
  );
}
