import Navbar from "@/components/navbar";

type Props = {
  params: {
    id: string;
  };
};

export default function TrackingPage({ params }: Props) {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="text-3xl font-bold mb-2">
            Live Job Tracking
          </h1>

          <p className="text-gray-600 mb-8">
            Job ID: #{params.id}
          </p>

          {/* MAP PLACEHOLDER */}
          <div className="bg-gray-200 rounded-xl h-80 flex items-center justify-center mb-8">
            <p className="text-gray-600">
              📍 Live map will appear here
            </p>
          </div>

          {/* STATUS */}
          <div className="bg-white rounded-xl p-6 mb-6">
            <h2 className="font-semibold mb-2">
              Provider Status
            </h2>
            <p className="text-gray-600">
              🚗 Provider is on the way to your location
            </p>
          </div>

          {/* ACTIONS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <a
              href={`/chat/${params.id}`}
              className="block text-center p-4 bg-white rounded-xl border hover:bg-gray-50"
            >
              💬 Open Chat
            </a>

            <a
              href={`/job/${params.id}`}
              className="block text-center p-4 bg-white rounded-xl border hover:bg-gray-50"
            >
              📄 View Job Details
            </a>
          </div>
        </div>
      </main>
    </>
  );
}
