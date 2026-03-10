"use client";

import { useEffect, useState, ReactNode } from "react";
import { useRouter } from "next/navigation";

interface AuthGuardProps {
  children: ReactNode;
}

export default function AuthGuard({ children }: AuthGuardProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("access"); // your JWT token
    if (token) {
      setAuthenticated(true);
    } else {
      router.push("/login"); // redirect if not logged in
    }
    setLoading(false);
  }, [router]);

  if (loading) return <p>Loading...</p>; // optional loading state
  if (!authenticated) return null; // prevents flashing

  return <>{children}</>;
}