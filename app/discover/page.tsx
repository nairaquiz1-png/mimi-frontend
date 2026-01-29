import Navbar from "@/components/navbar";

const providers = [
  {
    name: "John Mechanic",
    service: "Auto Repair",
    distance: "1.2 km away",
    rating: "4.8",
  },
  {
    name: "Sarah Plumber",
    service: "Plumbing",
    distance: "2.5 km away",
    rating: "4.9",
  },
  {
    name: "David Tutor",
    service: "Math Tutor",
    distance: "3.1 km away",
    rating: "4.7",
  },
];

export default function DiscoverPage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen">
        {/* MAP SECTION */}
        <div className="relative h-[60vh] bg-gray-200 flex items-center justify-center">
          <span className="text-gray-600 text-lg">
            Live Map View (Location Enabled)
          </span>

          {/* Floating badge */}
          <div className="absolute top-6 left-1/2 -translate-x-1/2 bg-black text-white px-5 py-2 rounded-full text-sm">
            Searching for providers near you…
          </div>
        </div>

        {/* PROVIDER LIST */}
        <div className="max-w-6xl mx-auto px-6 py-12">
          <h2 className="text-2xl font-semibold mb-6">
            Available Providers Nearby
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {providers.map((provider) => (
              <div
                key={provider.name}
                className="border rounded-xl p-5 hover:shadow transition"
              >
                <h3 className="text-lg font-semibold">
                  {provider.name}
                </h3>

                <p className="text-gray-600">{provider.service}</p>

                <div className="flex justify-between text-sm text-gray-500 mt-3">
                  <span>{provider.distance}</span>
                  <span>⭐ {provider.rating}</span>
                </div>

                <button className="mt-4 w-full py-2 rounded bg-black text-white hover:opacity-80">
                  View Profile
                </button>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
