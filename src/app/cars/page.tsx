import { Suspense } from "react";
import Cars from "@/views/Cars";

export default function CarsPage() {
  return (
    <Suspense fallback={<div className="p-6 text-gray-500">Loading...</div>}>
      <Cars />
    </Suspense>
  );
}
