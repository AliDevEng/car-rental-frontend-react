import { Suspense } from "react";
import Login from "@/views/Login";

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="py-12 text-center text-gray-500">Loading page...</div>}>
      <Login />
    </Suspense>
  );
}
