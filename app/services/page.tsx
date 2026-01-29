import Navbar from "@/components/navbar";

const categories = [
  {
    title: "Home Services",
    services: ["Plumber", "Electrician", "Cleaner", "Carpenter"],
  },
  {
    title: "Automobile",
    services: ["Mechanic", "Car Wash", "Towing"],
  },
  {
    title: "Education",
    services: ["Tutor", "Exam Coach", "Music Teacher"],
  },
  {
    title: "Health & Wellness",
    services: ["Doctor", "Nurse", "Physiotherapist"],
  },
  {
    title: "Tech & Digital",
    services: ["Web Developer", "Graphic Designer", "IT Support"],
  },
];

export default function ServicesPage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen px-6 py-20 max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">
            Find the Service You Need
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Browse service categories or search for exactly what you’re looking for.
          </p>

          <input
            type="text"
            placeholder="Search for a service..."
            className="mt-8 w-full max-w-xl px-5 py-3 border rounded-lg focus:outline-none focus:ring"
          />
        </div>

        {/* Categories */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category) => (
            <div
              key={category.title}
              className="border rounded-xl p-6 hover:shadow transition"
            >
              <h2 className="text-xl font-semibold mb-4">
                {category.title}
              </h2>

              <ul className="space-y-2">
                {category.services.map((service) => (
                  <li
                    key={service}
                    className="text-gray-700 hover:underline cursor-pointer"
                  >
                    {service}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Custom Service CTA */}
        <div className="mt-20 text-center">
          <h2 className="text-2xl font-semibold mb-3">
            Can’t Find Your Service?
          </h2>
          <p className="text-gray-600 mb-6">
            Providers can add custom services during registration.
          </p>

          <button className="px-8 py-3 rounded border hover:bg-gray-100">
            Add Custom Service
          </button>
        </div>
      </main>
    </>
  );
}
