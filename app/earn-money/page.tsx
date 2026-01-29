import Navbar from "@/components/navbar";

export default function EarnMoneyPage() {
  return (
    <>
      <Navbar />

      <main className="w-full">
        {/* Hero Section */}
        <section className="min-h-screen flex flex-col items-center justify-center text-center px-6">
          <h1 className="text-5xl font-bold mb-4">
            Earn Money Using Your Skills
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl">
            Join Mimi and get paid for services you already know how to do.
            Work on your own terms, set your price, and reach nearby customers.
          </p>

          <button className="mt-8 px-8 py-4 rounded bg-black text-white text-lg hover:opacity-80">
            Start Earning
          </button>
        </section>

        {/* How It Works */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-6xl mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold mb-12">How It Works</h2>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="p-6 bg-white rounded-lg shadow">
                <h3 className="text-xl font-semibold mb-2">1. Create a Profile</h3>
                <p className="text-gray-600">
                  Sign up as a service provider and list the services you offer.
                </p>
              </div>

              <div className="p-6 bg-white rounded-lg shadow">
                <h3 className="text-xl font-semibold mb-2">2. Get Matched</h3>
                <p className="text-gray-600">
                  Customers near you find your services and send job requests.
                </p>
              </div>

              <div className="p-6 bg-white rounded-lg shadow">
                <h3 className="text-xl font-semibold mb-2">3. Get Paid</h3>
                <p className="text-gray-600">
                  Complete milestones and receive secure payments through escrow.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Services */}
        <section className="py-20">
          <div className="max-w-6xl mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold mb-8">Popular Services</h2>

            <div className="flex flex-wrap justify-center gap-4">
              {[
                "Electrician",
                "Plumber",
                "Cleaner",
                "Tutor",
                "Mechanic",
                "Doctor",
                "Graphic Designer",
                "More…",
              ].map((service) => (
                <span
                  key={service}
                  className="px-5 py-2 rounded-full border text-gray-700 bg-white"
                >
                  {service}
                </span>
              ))}
            </div>

            <p className="mt-6 text-gray-600">
              Don’t see your service? You can add custom services when you sign up.
            </p>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-6xl mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold mb-12">Why Providers Choose Mimi</h2>

            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <h3 className="font-semibold text-lg mb-2">Flexible Work</h3>
                <p className="text-gray-600">
                  Choose when and where you work. No fixed schedule.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-2">Secure Payments</h3>
                <p className="text-gray-600">
                  Milestone-based escrow ensures you get paid fairly.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-2">More Visibility</h3>
                <p className="text-gray-600">
                  Promote your profile and reach more customers.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 text-center">
          <h2 className="text-4xl font-bold mb-4">
            Turn Your Skills Into Income
          </h2>
          <p className="text-gray-600 mb-8">
            Join Mimi today and start earning on your own terms.
          </p>

          <button className="px-10 py-4 rounded bg-black text-white text-lg hover:opacity-80">
            Join as a Provider
          </button>
        </section>
      </main>
    </>
  );
}
