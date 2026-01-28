"use client";

import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="w-full sticky top-0 bg-white border-b shadow-sm z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between p-4 gap-4">

        {/* LOGO */}
        <Link href="/" className="text-2xl font-bold text-black">
          Mimi
        </Link>

        {/* SEARCH BAR */}
        <div className="flex-1 hidden md:flex">
          <input
            type="text"
            placeholder="Search for services (e.g. plumber, tutor, nurse...)"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-black"
          />
        </div>

        {/* RIGHT ACTIONS */}
        <div className="hidden md:flex items-center gap-5">

          {/* Category dropdown */}
          <div className="relative">
            <button
              onClick={() => setOpen(!open)}
              className="text-gray-700 hover:text-black"
            >
              Browse ▾
            </button>

            {open && (
              <div className="absolute top-9 left-0 w-56 bg-white border shadow-md rounded p-2">
                <Link href="#" className="block px-3 py-2 hover:bg-gray-100">Technical Services</Link>
                <Link href="#" className="block px-3 py-2 hover:bg-gray-100">Home Repairs</Link>
                <Link href="#" className="block px-3 py-2 hover:bg-gray-100">Medical & Health</Link>
                <Link href="#" className="block px-3 py-2 hover:bg-gray-100">Education & Tutors</Link>
                <Link href="#" className="block px-3 py-2 hover:bg-gray-100">Beauty & Personal Care</Link>
              </div>
            )}
          </div>

          <Link href="#" className="hover:text-black text-gray-700">
            Become a Provider
          </Link>

          <Link
            href="#"
            className="px-4 py-2 border rounded-md hover:bg-gray-50"
          >
            Sign In
          </Link>

          <Link
            href="#"
            className="px-4 py-2 rounded-md bg-black text-white hover:opacity-80"
          >
            Join
          </Link>
        </div>
      </div>

      {/* Mobile Search Bar */}
      <div className="md:hidden w-full px-4 pb-3">
        <input
          type="text"
          placeholder="Search services..."
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-black"
        />
      </div>
    </nav>
  );
}
