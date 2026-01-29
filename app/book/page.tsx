import Navbar from "@/components/navbar";

export default function BookServicePage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-3xl mx-auto px-6">
          <h1 className="text-3xl font-bold mb-2">Request a Service</h1>
          <p className="text-gray-600 mb-8">
            Describe what you need and we’ll match you with nearby professionals.
          </p>

          <div className="space-y-8">
            {/* SERVICE */}
            <section className="bg-white rounded-xl p-6">
              <h2 className="font-semibold mb-4">Service Type</h2>

              <select className="w-full border rounded px-4 py-3">
                <option>Select a service</option>
                <option>Mechanic</option>
                <option>Plumber</option>
                <option>Electrician</option>
                <option>Cleaner</option>
                <option>Other (describe below)</option>
              </select>
            </section>

            {/* DESCRIPTION */}
            <section className="bg-white rounded-xl p-6">
              <h2 className="font-semibold mb-4">Describe the Job</h2>

              <textarea
                className="w-full border rounded px-4 py-3 h-32"
                placeholder="Explain the problem, requirements, or task..."
              />
            </section>

            {/* LOCATION */}
            <section className="bg-white rounded-xl p-6">
              <h2 className="font-semibold mb-4">Location</h2>

              <div className="flex items-center gap-3">
                <input type="checkbox" defaultChecked />
                <span className="text-gray-600">
                  This service requires physical presence
                </span>
              </div>

              <div className="mt-4 p-4 bg-gray-100 rounded text-gray-500 text-sm">
                📍 Live location tracking will be enabled during the job
              </div>
            </section>

            {/* MILESTONES */}
            <section className="bg-white rounded-xl p-6">
              <h2 className="font-semibold mb-4">Milestones</h2>

              <div className="space-y-4">
                <div className="flex gap-4">
                  <input
                    className="flex-1 border rounded px-3 py-2"
                    placeholder="Milestone title"
                  />
                  <input
                    className="w-32 border rounded px-3 py-2"
                    placeholder="₦ Amount"
                  />
                </div>

                <button className="text-sm text-blue-600 hover:underline">
                  + Add another milestone
                </button>
              </div>
            </section>

            {/* ACTION */}
            <section className="flex justify-end gap-4">
              <button className="px-6 py-3 rounded border border-gray-300 hover:bg-gray-100">
                Cancel
              </button>

              <button className="px-6 py-3 rounded bg-black text-white hover:opacity-80">
                Continue to Payment
              </button>
            </section>
          </div>
        </div>
      </main>
    </>
  );
}
