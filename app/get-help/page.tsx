import Link from "next/link";

import Navbar from "@/components/navbar";

export default function GetHelpPage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen w-full bg-white px-6 py-16">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <section className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Get Help from Trusted Professionals Near You
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Mimi connects you with verified service providers around you —
              fast, secure, and transparent.
            </p>
          </section>

          {/* How it works */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            <div className="border rounded-xl p-6 text-center">
              <h3 className="text-xl font-semibold mb-2">1. Choose a Service</h3>
              <p className="text-gray-600">
                Select the service you need or describe it if it’s not listed.
              </p>
            </div>

            <div className="border rounded-xl p-6 text-center">
              <h3 className="text-xl font-semibold mb-2">2. Get Matched</h3>
              <p className="text-gray-600">
                We match you with nearby professionals based on location,
                rating, and availability.
              </p>
            </div>

            <div className="border rounded-xl p-6 text-center">
              <h3 className="text-xl font-semibold mb-2">3. Pay Securely</h3>
              <p className="text-gray-600">
                Funds are held safely in escrow and released only when the job
                is completed.
              </p>
            </div>
          </section>

          {/* CTA */}
          <section className="text-center">
            <h2 className="text-2xl font-semibold mb-4">
              Ready to get started?
            </h2>
            <p className="text-gray-600 mb-6">
              Find reliable help for your task in just a few steps.
            </p>

            <Link href="/providers">
  <button className="px-8 py-4 rounded-lg bg-black text-white text-lg hover:opacity-90">
    Find a Service
  </button>
</Link>

          </section>
        </div>
      </main>
    </>
  );
}
