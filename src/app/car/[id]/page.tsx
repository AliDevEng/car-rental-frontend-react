import { Suspense } from "react";
import CarDetail from "@/views/CarDetail";

export default function CarDetailPage() {
  return (
    <Suspense
      fallback={<div className="py-12 text-center text-gray-500">Loading car details...</div>}
    >
      <CarDetail />
    </Suspense>
  );
}
