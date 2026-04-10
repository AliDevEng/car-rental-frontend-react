"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/hooks/useAuth";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

const loginSchema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  isAdmin: z.boolean().default(false),
});

type LoginFormValues = z.infer<typeof loginSchema>;
type LoginFormInput = z.input<typeof loginSchema>;

const Login = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login, loading, error, user, clearError } = useAuth();
  const redirectPath = searchParams?.get("redirect");
  const loginMessage = searchParams?.get("message");

  const safeRedirectPath =
    redirectPath && redirectPath.startsWith("/") && !redirectPath.startsWith("//")
      ? redirectPath
      : "/dashboard";

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<LoginFormInput, unknown, LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "", isAdmin: false },
  });

  useEffect(() => {
    clearError();
  }, [clearError]);

  useEffect(() => {
    if (user) {
      router.replace(safeRedirectPath);
    }
  }, [router, safeRedirectPath, user]);

  const onSubmit = async (values: LoginFormValues) => {
    clearError();
    await login(
      {
        email: values.email,
        password: values.password,
      },
      values.isAdmin,
    );
  };

  useEffect(() => {
    if (!error?.errors) {
      return;
    }

    for (const [key, rawMessages] of Object.entries(error.errors)) {
      const message = Array.isArray(rawMessages) ? rawMessages[0] : rawMessages;
      if (!message) {
        continue;
      }

      const normalized = key.toLowerCase();
      if (normalized.includes("email")) {
        setError("email", { type: "server", message });
      } else if (normalized.includes("password")) {
        setError("password", { type: "server", message });
      }
    }
  }, [error, setError]);

  return (
    <div className="page-container">
      <section className="card mx-auto max-w-lg">
        <h2 className="text-2xl font-bold text-gray-900">Login</h2>
        <p className="mt-2 text-gray-600">Sign in to access your dashboard and bookings.</p>
        {loginMessage && (
          <p className="mt-4 rounded-md border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-800">
            {loginMessage}
          </p>
        )}

        <form className="mt-6 space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label htmlFor="email" className="mb-1 block text-sm font-medium text-gray-700">
              Email
            </label>
            <Input id="email" type="email" autoComplete="email" {...register("email")} />
            {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
          </div>

          <div>
            <label htmlFor="password" className="mb-1 block text-sm font-medium text-gray-700">
              Password
            </label>
            <Input
              id="password"
              type="password"
              autoComplete="current-password"
              {...register("password")}
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
            )}
          </div>

          <label className="flex items-center gap-2 text-sm text-gray-700">
            <input type="checkbox" className="h-4 w-4" {...register("isAdmin")} />
            Login as admin
          </label>

          {error && (
            <p className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
              {error.message}
            </p>
          )}

          <Button type="submit" disabled={loading} className="w-full disabled:cursor-not-allowed">
            {loading ? "Signing in..." : "Login"}
          </Button>
        </form>

        <p className="mt-4 text-sm text-gray-600">
          No account yet?{" "}
          <Link href="/register" className="font-medium text-blue-600 hover:underline">
            Register
          </Link>
        </p>
      </section>
    </div>
  );
};

export default Login;
