import Navbar from "@/components/navbar";
import Link from "next/link";

const steps = [
  { label: "Requested", done: true },
  { label: "Provider Accepted", done: true },
  { label: "In Progress", done: false },
  { label: "Completed", done: false },
  { label: "Closed", done: false },
];

export default function JobStatusPage() {
  const jobId = "123"; // mock job id for Week 1

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="text-3xl font-bold mb-2">Job Status</h1>
          <p className="text-gray-600 mb-8">
            Track progress and communicate in real-time.
          </p>

          {/* STATUS CARD */}
          <div className="bg-white rounded-xl p-6 mb-8">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="font-semibold">Plumbing Repair</h2>
                <p className="text-sm text-gray-500">
                  Job ID: #{jobId} • Lagos
                </p>
              </div>

              <span className="px-4 py-1 rounded-full text-sm bg-yellow-100 text-yellow-800">
                Awaiting Progress
              </span>
            </div>
          </div>

          {/* TIMELINE */}
          <div className="bg-white rounded-xl p-6 mb-8">
            <h3 className="font-semibold mb-6">Progress Timeline</h3>

            <div className="space-y-6">
              {steps.map((step, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div
                    className={`w-4 h-4 rounded-full ${
                      step.done ? "bg-green-500" : "bg-gray-300"
                    }`}
                  />

                  <p
                    className={`font-medium ${
                      step.done ? "text-black" : "text-gray-400"
                    }`}
                  >
                    {step.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* ACTIONS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link href={`/chat/${jobId}`}>
              <button className="w-full p-4 bg-white rounded-xl border hover:bg-gray-50">
                💬 Open Chat
              </button>
            </Link>

            <Link href={`/tracking/${jobId}`}>
              <button className="w-full p-4 bg-white rounded-xl border hover:bg-gray-50">
                📍 View Live Location
              </button>
            </Link>

            <button
              disabled
              className="p-4 bg-red-50 text-red-400 rounded-xl cursor-not-allowed"
            >
              ⚠ Raise Dispute (Coming Soon)
            </button>
          </div>
        </div>
      </main>
    </>
  );
}
