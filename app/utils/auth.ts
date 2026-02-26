// app/utils/auth.ts
"use client"; // ensures it's treated as a client module

export function getToken(): string | null {
  if (typeof window !== "undefined") {
    return localStorage.getItem("token"); // JWT stored in localStorage
  }
  return null;
}
