"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Navbar() {
  const router = useRouter();
  const [loggedIn, setLoggedIn] = useState(false);

  // Check if user is logged in
  useEffect(() => {
    const token = localStorage.getItem("access");
    setLoggedIn(!!token);
  }, []);

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("token");
    router.push("/login");
  };

  return (
    <nav className="w-full bg-white shadow-md px-6 py-4 flex justify-between items-center fixed top-0 left-0 z-50 flex-wrap">
      {/* Logo */}
      <div
        className="text-2xl font-bold cursor-pointer"
        onClick={() => router.push("/landing")}
      >
        Mimi
      </div>

      {/* Navigation Links */}
      <div className="flex gap-4 items-center flex-wrap">
        <Link href="/" className="hover:opacity-80">Home</Link>
        <Link href="/landing" className="hover:opacity-80">Landing</Link>
        <Link href="/book" className="hover:opacity-80">Book</Link>
        <Link href="/chat" className="hover:opacity-80">Chat</Link>
        <Link href="/discover" className="hover:opacity-80">Discover</Link>
        <Link href="/earn-money" className="hover:opacity-80">Earn Money</Link>
        <Link href="/get-help" className="hover:opacity-80">Get Help</Link>
        <Link href="/services" className="hover:opacity-80">Services</Link>
        <Link href="/request-service" className="hover:opacity-80">Request Service</Link>

        {/* Protected Links */}
        {loggedIn && (
          <>
            <Link href="/wallet" className="hover:opacity-80">Wallet</Link>
            <Link href="/wallet/fund" className="hover:opacity-80">Fund Wallet</Link>
          </>
        )}
      </div>

      {/* Auth Buttons */}
      <div className="flex gap-4 items-center">
        {loggedIn ? (
          <button
            onClick={handleLogout}
            className="bg-black text-white px-4 py-2 rounded hover:opacity-80"
          >
            Logout
          </button>
        ) : (
          <>
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
          </>
        )}
      </div>
    </nav>
  );
}