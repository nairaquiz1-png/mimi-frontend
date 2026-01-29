import Navbar from "@/components/navbar";
import Link from "next/link";

export default function ProvidersPage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen px-6 py-16 max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-10 text-center">
          Available Service Providers
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link href="/providers/mechanic-john">
            <div className="border rounded-xl p-6 hover:shadow cursor-pointer">
              <h3 className="text-xl font-semibold">John the Mechanic</h3>
              <p className="text-gray-600">Auto repairs • 3km away</p>
            </div>
          </Link>

          <Link href="/providers/plumber-mary">
            <div className="border rounded-xl p-6 hover:shadow cursor-pointer">
              <h3 className="text-xl font-semibold">Mary the Plumber</h3>
              <p className="text-gray-600">Plumbing • 1.5km away</p>
            </div>
          </Link>
        </div>
      </main>
    </>
  );
}
