import Navbar from "@/components/navbar";

export default function RequestServicePage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-gray-50 px-6 py-16">
        <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-sm p-8">
          <h1 className="text-3xl font-bold mb-2">
            Request a Service
          </h1>

          <p className="text-gray-600 mb-8">
            Please describe the service you need and we’ll match you with a provider.
          </p>

          {/* FORM */}
          <form className="space-y-6">
            {/* ISSUE DESCRIPTION */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Describe your issue
              </label>
              <textarea
                className="w-full border rounded-lg p-3 focus:outline-none focus:ring"
                rows={4}
                placeholder="Describe your problem..."
              />
            </div>

            {/* LOCATION */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Your location
              </label>
              <input
                type="text"
                className="w-full border rounded-lg p-3"
                placeholder="Enter your location"
              />
            </div>

            {/* URGENCY */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Urgency
              </label>
              <select className="w-full border rounded-lg p-3">
                <option>Immediate</option>
                <option>Within 1 hour</option>
                <option>Today</option>
              </select>
            </div>

            {/* SUBMIT */}
            <button
              type="submit"
              className="w-full bg-black text-white py-4 rounded-lg hover:opacity-90"
            >
              Submit Request
            </button>
          </form>
        </div>
      </main>
    </>
  );
}
