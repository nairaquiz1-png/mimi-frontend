import Navbar from "@/components/navbar";
import Link from "next/link";
import { providers } from "@/app/data/providers";

export default function ProvidersPage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen px-6 py-16 max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-10 text-center">
          Available Service Providers
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {providers.map((provider) => (
            <Link
              key={provider.slug}
              href={`/providers/${provider.slug}`}
            >
              <div className="border rounded-xl p-6 hover:shadow cursor-pointer">
                <h3 className="text-xl font-semibold">
                  {provider.name}
                </h3>

                <p className="text-gray-600">
                  {provider.service}
                </p>

                <p className="text-sm text-gray-500 mt-2">
                  ⭐ {provider.rating} • {provider.distance}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </>
  );
}
