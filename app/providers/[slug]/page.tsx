import Navbar from "@/components/navbar";
import Link from "next/link";
import { notFound } from "next/navigation";

// Fetch a single provider by slug from Django
async function fetchProvider(slug: string) {
  const res = await fetch(`http://127.0.0.1:8000/providers/${slug}/`, {
    cache: "no-store",
  });

  if (!res.ok) return null;
  return res.json();
}

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function ProviderProfilePage({ params }: Props) {
  const { slug } = await params;
  const provider = await fetchProvider(slug);

  if (!provider) {
    notFound();
  }

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-gray-50">
        {/* HEADER */}
        <div className="bg-white border-b pt-25">
          <div className="max-w-6xl mx-auto px-6 pb-25 flex flex-col md:flex-row gap-8 items-center md:items-start">
            
            {/* PROFILE IMAGE */}
            <div className="w-32 h-32 bg-gray-200 rounded-full flex-shrink-0 shadow-md" />

            {/* PROFILE INFO */}
            <div className="flex-1">
              <h1 className="text-3xl font-bold">
                {provider.user.username}
              </h1>

              <p className="text-gray-600 mt-2">
                {provider.bio}
              </p>

              <div className="flex gap-4 mt-4 text-sm text-gray-500 flex-wrap">
                <span>⭐ {provider.rating} Rating</span>
                <span>•</span>
                <span>{provider.location}</span>
              </div>

              <div className="mt-6 flex gap-4">
                <Link href={`/providers/${provider.slug}/request`}>
                  <button className="px-6 py-3 rounded bg-black text-white hover:opacity-80 transition">
                    Request Service
                  </button>
                </Link>

                <button
                  disabled
                  className="px-6 py-3 rounded border border-gray-300 text-gray-400 cursor-not-allowed"
                >
                  Message (Coming soon)
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* CONTENT */}
        <div className="max-w-6xl mx-auto px-6 py-12">
          <section className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-4">
              Services Offered
            </h2>

            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-600">
              {provider.services.map((service: string) => (
                <li key={service} className="flex items-center gap-2">
                  <span>•</span> {service}
                </li>
              ))}
            </ul>
          </section>
        </div>
      </main>
    </>
  );
}
