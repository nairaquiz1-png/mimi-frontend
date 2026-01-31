"use client";

import Navbar from "@/components/navbar";
import { useRouter } from "next/navigation";

export default function LandingPage() {
  const router = useRouter();

  return (
    <>
      <Navbar />

      <main className="min-h-screen w-full flex flex-col items-center justify-center p-6 bg-white">
        <div className="max-w-3xl text-center">
          <h1 className="text-5xl font-bold tracking-tight mb-4">
            Get Help + Earn Money
          </h1>

          <p className="text-lg text-gray-600 mb-8">
            Hire people for tasks you need. Offer your skills to earn instantly.
            Connect with verified service providers in real time — locally or remotely.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 w-full max-w-lg">
          <input
            type="text"
            placeholder="Cars, Plumbing, Medical, Tutoring, Cleaning, etc..."
            className="border rounded-lg px-4 py-3 flex-1 outline-none ring-0"
          />

          <input
            type="text"
            placeholder="Enter your location"
            className="border rounded-lg px-4 py-3 flex-1 outline-none ring-0"
          />
        </div>

        <div className="flex gap-4 mt-6">
          <button
            onClick={() => router.push("/discover")}
            className="px-6 py-3 rounded bg-black text-white hover:opacity-80"
          >
            Search
          </button>

          <button
            onClick={() => router.push("/earn-money")}
            className="px-6 py-3 rounded border border-gray-300 hover:bg-gray-50"
          >
            Become a Provider
          </button>
        </div>

        <p className="text-sm text-gray-500 mt-4">
          Not listed?{" "}
          <button
            onClick={() => router.push("/services")}
            className="text-black underline hover:opacity-80"
          >
            Add your service
          </button>
        </p>
      </main>
    </>
  );
}
