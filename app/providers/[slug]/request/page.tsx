import Navbar from "@/components/navbar";
import { notFound } from "next/navigation";
import { providers } from "@/app/data/providers";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function RequestServicePage({ params }: Props) {
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

      <main className="min-h-screen bg-gray-50 px-6 py-16">
        <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-sm p-8">
          <h1 className="text-3xl font-bold mb-2">
            Request {provider.service}
          </h1>

          <p className="text-gray-600 mb-8">
            You are requesting service from{" "}
            <span className="font-medium">
              {provider.name}
            </span>
          </p>

          <form className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-1">
                Describe your issue
              </label>
              <textarea
                className="w-full border rounded-lg p-3"
                rows={4}
                placeholder="My car stopped on the highway..."
              />
            </div>

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
