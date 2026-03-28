"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

const CarDetail = () => {
  const searchParams = useSearchParams();
  const startDate = searchParams?.get("startDate");
  const endDate = searchParams?.get("endDate");
  const returnTo = searchParams?.get("returnTo");
  const safeReturnTo =
    returnTo && returnTo.startsWith("/") && !returnTo.startsWith("//")
      ? returnTo
      : "/#available-cars";

  return (
    <div className="page-container">
      <section className="card">
        <h2 className="text-2xl font-bold text-gray-900">Car Details</h2>
        {startDate && endDate && (
          <p className="mt-3 rounded-md border border-amber-200 bg-amber-50 px-4 py-3 text-amber-900">
            Booking started for <strong>{startDate}</strong> to <strong>{endDate}</strong>.
          </p>
        )}
        <p className="mt-3 text-gray-600">
          Car detail and booking flow will be implemented in Iteration 4.
        </p>
        <Link
          href={safeReturnTo}
          className="mt-4 inline-flex items-center text-sm font-medium text-blue-600 hover:underline"
        >
          Back to search results
        </Link>
      </section>
    </div>
  );
};

export default CarDetail;
