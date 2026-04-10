import { Suspense } from "react";
import Home from "@/views/Home";

export default function Page() {
  return (
    <Suspense fallback={<div className="py-12 text-center text-gray-500">Loading page...</div>}>
      <Home />
    </Suspense>
  );
}
