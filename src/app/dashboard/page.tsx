"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Dashboard from "@/views/Dashboard";
import { useAuth } from "@/hooks/useAuth";

export default function DashboardPage() {
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login");
    }
  }, [loading, router, user]);

  if (loading || !user) {
    return (
      <div className="page-container">
        <section className="card">
          <p className="text-gray-600">Checking authentication...</p>
        </section>
      </div>
    );
  }

  return <Dashboard />;
}
