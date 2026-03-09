"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

interface Milestone {
  id: number;
  title: string;
  amount: number;
  funded: boolean;
  released?: boolean;
}

export default function MilestonesPage() {
  const { id: jobId } = useParams();
  const [milestones, setMilestones] = useState<Milestone[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMilestone, setLoadingMilestone] = useState<number | null>(null);

  const API_BASE = "http://62.171.148.243:8000";
  const token = localStorage.getItem("token");

  // Fetch milestones for the job
  useEffect(() => {
    async function fetchMilestones() {
      try {
        const res = await fetch(`${API_BASE}/api/jobs/${jobId}/`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setMilestones(data.milestones || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    if (jobId) fetchMilestones();
  }, [jobId, token]);

  // Fund a milestone
  async function fundMilestone(milestoneId: number) {
    setLoadingMilestone(milestoneId);
    try {
      const res = await fetch(`${API_BASE}/api/milestones/${milestoneId}/fund/`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (res.ok) {
        setMilestones((prev) =>
          prev.map((m) =>
            m.id === milestoneId ? { ...m, funded: true } : m
          )
        );
        alert("Milestone funded!");
      } else {
        alert(data.detail || "Error funding milestone");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    } finally {
      setLoadingMilestone(null);
    }
  }

  // Release a milestone
  async function releaseMilestone(milestoneId: number) {
    setLoadingMilestone(milestoneId);
    try {
      const res = await fetch(`${API_BASE}/api/milestones/${milestoneId}/release/`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (res.ok) {
        setMilestones((prev) =>
          prev.map((m) =>
            m.id === milestoneId ? { ...m, released: true } : m
          )
        );
        alert("Milestone released!");
      } else {
        alert(data.detail || "Error releasing milestone");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    } finally {
      setLoadingMilestone(null);
    }
  }

  if (loading) return <p>Loading milestones...</p>;

  return (
    <div className="milestones-page">
      <h2>Job Milestones</h2>
      <div className="milestone-list">
        {milestones.map((m) => (
          <div key={m.id} className="milestone-card">
            <h3>{m.title}</h3>
            <p>Amount: ₦{m.amount}</p>
            <p>Status: {m.released ? "Released" : m.funded ? "Funded" : "Pending"}</p>

            {!m.funded && (
              <button
                onClick={() => fundMilestone(m.id)}
                disabled={loadingMilestone === m.id}
              >
                {loadingMilestone === m.id ? "Processing..." : "Fund"}
              </button>
            )}

            {m.funded && !m.released && (
              <button
                onClick={() => releaseMilestone(m.id)}
                disabled={loadingMilestone === m.id}
              >
                {loadingMilestone === m.id ? "Processing..." : "Release"}
              </button>
            )}

            {m.released && <p>💰 Released to provider</p>}
          </div>
        ))}
      </div>
    </div>
  );
}