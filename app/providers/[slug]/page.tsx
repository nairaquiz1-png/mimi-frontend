import Navbar from "@/components/navbar";
import Link from "next/link";
import { notFound } from "next/navigation";
import { providers } from "@/app/data/providers";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function ProviderProfilePage({ params }: Props) {
  const { slug } = await params;

  const provider = providers.find(
    (p) => p.slug === slug
  );

  if (!provider) {
    notFound();
  }

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-gray-50">
        {/* HEADER */}
        <div className="bg-white border-b">
          <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col md:flex-row gap-8">
            <div className="w-32 h-32 bg-gray-200 rounded-full" />

            <div className="flex-1">
              <h1 className="text-3xl font-bold">
                {provider.name}
              </h1>

              <p className="text-gray-600 mt-1">
                {provider.service}
              </p>

              <div className="flex gap-4 mt-4 text-sm text-gray-500">
                <span>⭐ {provider.rating} Rating</span>
                <span>•</span>
                <span>{provider.jobs} Jobs Completed</span>
                <span>•</span>
                <span>{provider.distance} away</span>
              </div>

              <div className="mt-6 flex gap-4">
                <Link href={`/providers/${provider.slug}/request`}>
                  <button className="px-6 py-3 rounded bg-black text-white hover:opacity-80">
                    Request Service
                  </button>
                </Link>

                <button className="px-6 py-3 rounded border border-gray-300 hover:bg-gray-100">
                  Message
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* CONTENT */}
        <div className="max-w-6xl mx-auto px-6 py-12 grid md:grid-cols-3 gap-10">
          <div className="md:col-span-2 space-y-8">
            <section className="bg-white rounded-xl p-6">
              <h2 className="text-xl font-semibold mb-3">About</h2>
              <p className="text-gray-600 leading-relaxed">
                {provider.about}
              </p>
            </section>

            <section className="bg-white rounded-xl p-6">
              <h2 className="text-xl font-semibold mb-4">
                Services Offered
              </h2>

              <ul className="grid grid-cols-2 gap-4 text-gray-600">
                {provider.services.map((service) => (
                  <li key={service}>• {service}</li>
                ))}
              </ul>
            </section>
          </div>

          <aside className="space-y-6">
            <div className="bg-black text-white rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-2">
                🚀 Promoted Provider
              </h3>
              <p className="text-sm opacity-90">
                This provider is currently promoted.
              </p>
            </div>
          </aside>
        </div>
      </main>
    </>
  );
}
