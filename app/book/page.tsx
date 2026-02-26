"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/navbar";
import axios from "axios";
import { getToken } from "@/utils/auth";

interface Milestone {
  title: string;
  amount: number;
}

interface Service {
  id: number;
  title: string;
}

export default function BookServicePage() {
  const router = useRouter();

  const [services, setServices] = useState<Service[]>([]);
  const [service, setService] = useState("");
  const [description, setDescription] = useState("");
  const [requiresPhysical, setRequiresPhysical] = useState(true);
  const [milestones, setMilestones] = useState<Milestone[]>([{ title: "", amount: 0 }]);
  const [error, setError] = useState("");

  // Fetch real services from backend
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const token = getToken();
        const res = await axios.get("http://localhost:8000/services/", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setServices(res.data);
      } catch (err) {
        console.error("Failed to load services", err);
        setError("Failed to load services. Refresh the page.");
      }
    };
    fetchServices();
  }, []);

  const handleMilestoneChange = (index: number, field: "title" | "amount", value: string) => {
    const newMilestones = [...milestones];
    if (field === "amount") {
      newMilestones[index][field] = Number(value);
    } else {
      newMilestones[index][field] = value;
    }
    setMilestones(newMilestones);
  };

  const addMilestone = () => {
    setMilestones([...milestones, { title: "", amount: 0 }]);
  };

  const handleSubmit = async () => {
    if (!service || !description) {
      setError("Please select a service and describe the job.");
      return;
    }

    try {
      const token = getToken();
      const res = await axios.post(
        "/api/jobs/",
        {
          service: service, // this is ProviderService ID
          description,
          location: requiresPhysical ? "Physical" : "Remote",
          milestones,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Redirect to Job Status page
      router.push(`/job/${res.data.id}`);
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.detail || "Failed to create job");
    }
  };

  return (
    <>
      <Navbar />

      <main className="min-h-screen pt-24 px-6">
        <div className="max-w-3xl mx-auto px-6">
          <h1 className="text-3xl font-bold mb-2">Request a Service</h1>
          <p className="text-gray-600 mb-8">
            Describe what you need and we’ll match you with nearby professionals.
          </p>

          {error && <div className="text-red-500 mb-4">{error}</div>}

          <div className="space-y-8">
            {/* SERVICE */}
            <section className="bg-white rounded-xl p-6">
              <h2 className="font-semibold mb-4">Service Type</h2>
              <select
                className="w-full border rounded px-4 py-3"
                value={service}
                onChange={(e) => setService(e.target.value)}
              >
                <option value="">Select a service</option>
                {services.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.title}
                  </option>
                ))}
              </select>
            </section>

            {/* DESCRIPTION */}
            <section className="bg-white rounded-xl p-6">
              <h2 className="font-semibold mb-4">Describe the Job</h2>
              <textarea
                className="w-full border rounded px-4 py-3 h-32"
                placeholder="Explain the problem, requirements, or task..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </section>

            {/* LOCATION */}
            <section className="bg-white rounded-xl p-6">
              <h2 className="font-semibold mb-4">Location</h2>
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={requiresPhysical}
                  onChange={(e) => setRequiresPhysical(e.target.checked)}
                />
                <span className="text-gray-600">
                  This service requires physical presence
                </span>
              </div>
              <div className="mt-4 p-4 bg-gray-100 rounded text-gray-500 text-sm">
                📍 Live location tracking will be enabled during the job
              </div>
            </section>

            {/* MILESTONES */}
            <section className="bg-white rounded-xl p-6">
              <h2 className="font-semibold mb-4">Milestones</h2>
              <div className="space-y-4">
                {milestones.map((m, idx) => (
                  <div key={idx} className="flex gap-4">
                    <input
                      className="flex-1 border rounded px-3 py-2"
                      placeholder="Milestone title"
                      value={m.title}
                      onChange={(e) => handleMilestoneChange(idx, "title", e.target.value)}
                    />
                    <input
                      type="number"
                      className="w-32 border rounded px-3 py-2"
                      placeholder="₦ Amount"
                      value={m.amount}
                      onChange={(e) => handleMilestoneChange(idx, "amount", e.target.value)}
                    />
                  </div>
                ))}

                <button
                  type="button"
                  className="text-sm text-blue-600 hover:underline"
                  onClick={addMilestone}
                >
                  + Add another milestone
                </button>
              </div>
            </section>

            {/* ACTION */}
            <section className="flex justify-end gap-4">
              <button
                className="px-6 py-3 rounded border border-gray-300 hover:bg-gray-100"
                onClick={() => router.back()}
              >
                Cancel
              </button>

              <button
                className="px-6 py-3 rounded bg-black text-white hover:opacity-80"
                onClick={handleSubmit}
              >
                Continue to Job Status
              </button>
            </section>
          </div>
        </div>
      </main>
    </>
  );
}
