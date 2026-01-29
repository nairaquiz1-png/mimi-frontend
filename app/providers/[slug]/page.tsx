import Navbar from "@/components/navbar";

export default function ProviderProfilePage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-gray-50">
        {/* HEADER */}
        <div className="bg-white border-b">
          <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col md:flex-row gap-8">
            <div className="w-32 h-32 bg-gray-200 rounded-full" />

            <div className="flex-1">
              <h1 className="text-3xl font-bold">John Mechanic</h1>
              <p className="text-gray-600 mt-1">Auto Repair Specialist</p>

              <div className="flex gap-4 mt-4 text-sm text-gray-500">
                <span>⭐ 4.8 Rating</span>
                <span>•</span>
                <span>120 Jobs Completed</span>
                <span>•</span>
                <span>1.2 km away</span>
              </div>

              <div className="mt-6 flex gap-4">
                <button className="px-6 py-3 rounded bg-black text-white hover:opacity-80">
                  Request Service
                </button>

                <button className="px-6 py-3 rounded border border-gray-300 hover:bg-gray-100">
                  Message
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* CONTENT */}
        <div className="max-w-6xl mx-auto px-6 py-12 grid md:grid-cols-3 gap-10">
          {/* LEFT */}
          <div className="md:col-span-2 space-y-8">
            {/* ABOUT */}
            <section className="bg-white rounded-xl p-6">
              <h2 className="text-xl font-semibold mb-3">About</h2>
              <p className="text-gray-600 leading-relaxed">
                I’m a certified automobile mechanic with over 8 years of
                experience repairing vehicles, diagnosing faults, and providing
                roadside assistance. Fast, reliable, and honest service.
              </p>
            </section>

            {/* SERVICES */}
            <section className="bg-white rounded-xl p-6">
              <h2 className="text-xl font-semibold mb-4">Services Offered</h2>

              <ul className="grid grid-cols-2 gap-4 text-gray-600">
                <li>• Engine Diagnostics</li>
                <li>• Battery Replacement</li>
                <li>• Brake Repair</li>
                <li>• Oil Change</li>
              </ul>
            </section>

            {/* REVIEWS */}
            <section className="bg-white rounded-xl p-6">
              <h2 className="text-xl font-semibold mb-4">Reviews</h2>

              <div className="space-y-4">
                <div className="border-b pb-4">
                  <p className="font-medium">Sarah A.</p>
                  <p className="text-sm text-gray-500">⭐ 5.0</p>
                  <p className="text-gray-600 mt-2">
                    Very professional and quick. My car was fixed in no time.
                  </p>
                </div>

                <div>
                  <p className="font-medium">Michael T.</p>
                  <p className="text-sm text-gray-500">⭐ 4.5</p>
                  <p className="text-gray-600 mt-2">
                    Honest pricing and good communication.
                  </p>
                </div>
              </div>
            </section>
          </div>

          {/* RIGHT */}
          <aside className="space-y-6">
            {/* PROMOTION */}
            <div className="bg-black text-white rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-2">
                🚀 Promoted Provider
              </h3>
              <p className="text-sm opacity-90">
                This provider is currently promoted for higher visibility.
              </p>
            </div>

            {/* AVAILABILITY */}
            <div className="bg-white rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-2">
                Availability
              </h3>
              <p className="text-gray-600">
                Available today • 8:00 AM – 6:00 PM
              </p>
            </div>
          </aside>
        </div>
      </main>
    </>
  );    
}
