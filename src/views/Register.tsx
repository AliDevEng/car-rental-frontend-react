"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import type { ChangeEvent } from "react";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";
import PhoneInput from "react-phone-input-2";
import { getData as getCountryData } from "country-list";
import { type CountryCode, getCountryCallingCode } from "libphonenumber-js";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/hooks/useAuth";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

interface PhoneCountryData {
  countryCode?: string;
}

interface CountryOption {
  code: string;
  name: string;
}

const COUNTRIES: CountryOption[] = getCountryData()
  .map((country) => ({ code: country.code, name: country.name }))
  .sort((a, b) => a.name.localeCompare(b.name));

const COUNTRY_CODE_BY_NAME = new Map<string, string>(
  COUNTRIES.map((country) => [country.name, country.code]),
);

const getDialPrefix = (countryCode: string): string => {
  try {
    return `+${getCountryCallingCode(countryCode as CountryCode)}`;
  } catch {
    return "";
  }
};

const registerSchema = z
  .object({
    firstName: z.string().trim().min(1, "First name is required"),
    lastName: z.string().trim().min(1, "Last name is required"),
    email: z.string().email("Enter a valid email"),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .regex(/[A-Z]/, "Password must include at least 1 uppercase letter")
      .regex(/\d/, "Password must include at least 1 number"),
    confirmPassword: z.string().min(6, "Confirm password must be at least 6 characters"),
    country: z.string().trim().min(1, "Country is required"),
    phone: z
      .string()
      .trim()
      .min(4, "Phone number is too short")
      .refine((value) => value.startsWith("+"), "Phone must include country prefix"),
    address: z.string().trim().min(1, "Address is required"),
    city: z.string().trim().min(1, "City is required"),
    postalCode: z.string().trim().min(3, "Postal code is too short"),
  })
  .refine((values) => values.password === values.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type RegisterFormValues = z.infer<typeof registerSchema>;

const Register = () => {
  const router = useRouter();
  const { register: registerUser, loading, error, user } = useAuth();
  const [phoneCountryIso2, setPhoneCountryIso2] = useState("se");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    control,
    watch,
    formState: { errors },
    setError,
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      country: "",
      phone: "",
      address: "",
      city: "",
      postalCode: "",
    },
  });
  const passwordValue = watch("password") ?? "";
  const passwordChecks = [
    { label: "Minimum 6 characters", ok: passwordValue.length >= 6 },
    { label: "At least 1 uppercase letter", ok: /[A-Z]/.test(passwordValue) },
    { label: "At least 1 number", ok: /\d/.test(passwordValue) },
  ];

  useEffect(() => {
    if (user) {
      router.replace("/dashboard");
    }
  }, [router, user]);

  const onSubmit = async (values: RegisterFormValues) => {
    await registerUser({
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      password: values.password,
      phone: values.phone,
      address: values.address,
      city: values.city,
      postalCode: values.postalCode,
      country: values.country,
    });
  };

  useEffect(() => {
    if (!error?.errors) {
      return;
    }

    for (const [key, messages] of Object.entries(error.errors)) {
      const message = messages?.[0];
      if (!message) {
        continue;
      }

      const normalized = key.toLowerCase();
      if (normalized.includes("firstname")) {
        setError("firstName", { type: "server", message });
      } else if (normalized.includes("lastname")) {
        setError("lastName", { type: "server", message });
      } else if (normalized.includes("email")) {
        setError("email", { type: "server", message });
      } else if (normalized.includes("password")) {
        setError("password", { type: "server", message });
      } else if (normalized.includes("phone")) {
        setError("phone", { type: "server", message });
      } else if (normalized.includes("address")) {
        setError("address", { type: "server", message });
      } else if (normalized.includes("city")) {
        setError("city", { type: "server", message });
      } else if (normalized.includes("postal")) {
        setError("postalCode", { type: "server", message });
      } else if (normalized.includes("country")) {
        setError("country", { type: "server", message });
      }
    }
  }, [error, setError]);

  return (
    <div className="page-container">
      <section className="card mx-auto max-w-lg">
        <h2 className="text-2xl font-bold text-gray-900">Register</h2>
        <p className="mt-2 text-gray-600">Create your account to start booking cars.</p>

        <form className="mt-6 space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label htmlFor="firstName" className="mb-1 block text-sm font-medium text-gray-700">
              First name
            </label>
            <Input id="firstName" autoComplete="given-name" {...register("firstName")} />
            {errors.firstName && (
              <p className="mt-1 text-sm text-red-600">{errors.firstName.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="lastName" className="mb-1 block text-sm font-medium text-gray-700">
              Last name
            </label>
            <Input id="lastName" autoComplete="family-name" {...register("lastName")} />
            {errors.lastName && (
              <p className="mt-1 text-sm text-red-600">{errors.lastName.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="address" className="mb-1 block text-sm font-medium text-gray-700">
              Address
            </label>
            <Input id="address" autoComplete="street-address" {...register("address")} />
            {errors.address && (
              <p className="mt-1 text-sm text-red-600">{errors.address.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="country" className="mb-1 block text-sm font-medium text-gray-700">
              Country
            </label>
            <select
              id="country"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
              defaultValue=""
              {...register("country", {
                onChange: (event: ChangeEvent<HTMLSelectElement>) => {
                  const countryName = event.target.value;
                  const countryCode = COUNTRY_CODE_BY_NAME.get(countryName);
                  if (!countryCode) {
                    return;
                  }

                  const dialPrefix = getDialPrefix(countryCode);
                  setPhoneCountryIso2(countryCode.toLowerCase());
                  if (dialPrefix) {
                    setValue("phone", dialPrefix, { shouldDirty: true, shouldValidate: true });
                  }
                },
              })}
            >
              <option value="" disabled>
                Select your country
              </option>
              {COUNTRIES.map((country) => (
                <option key={country.code} value={country.name}>
                  {country.name}
                </option>
              ))}
            </select>
            {errors.country && (
              <p className="mt-1 text-sm text-red-600">{errors.country.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="phone" className="mb-1 block text-sm font-medium text-gray-700">
              Phone
            </label>
            <Controller
              name="phone"
              control={control}
              render={({ field }) => (
                <div className="relative z-30">
                  <PhoneInput
                    country={phoneCountryIso2}
                    enableSearch
                    value={field.value}
                    onChange={(value, country) => {
                      const countryData = country as PhoneCountryData;
                      const normalizedPhone = value.startsWith("+") ? value : `+${value}`;
                      field.onChange(normalizedPhone);
                      if (countryData.countryCode) {
                        setPhoneCountryIso2(countryData.countryCode);
                      }
                    }}
                    inputProps={{
                      id: "phone",
                      name: field.name,
                      autoComplete: "tel",
                    }}
                    containerClass="w-full"
                    inputClass="!w-full !h-10 !rounded-lg !border !border-gray-300 !px-12 !py-2 !text-gray-900"
                    buttonClass="!rounded-l-lg !border-gray-300"
                    searchClass="!w-full !m-0 !border !border-gray-300 !rounded-md"
                    dropdownClass="!text-gray-900"
                    dropdownStyle={{ zIndex: 60 }}
                  />
                </div>
              )}
            />
            <p className="mt-1 text-xs text-gray-500">
              Country sets a default prefix, but you can change phone prefix if needed.
            </p>
            {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>}
          </div>

          <div>
            <label htmlFor="city" className="mb-1 block text-sm font-medium text-gray-700">
              City
            </label>
            <Input id="city" autoComplete="address-level2" {...register("city")} />
            {errors.city && <p className="mt-1 text-sm text-red-600">{errors.city.message}</p>}
          </div>

          <div>
            <label htmlFor="postalCode" className="mb-1 block text-sm font-medium text-gray-700">
              Postal code
            </label>
            <Input id="postalCode" autoComplete="postal-code" {...register("postalCode")} />
            {errors.postalCode && (
              <p className="mt-1 text-sm text-red-600">{errors.postalCode.message}</p>
            )}
          </div>

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
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
                className="pr-10"
                {...register("password")}
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            <ul className="mt-2 space-y-1 text-xs">
              {passwordChecks.map((check) => (
                <li key={check.label} className={check.ok ? "text-green-600" : "text-gray-500"}>
                  {`• ${check.label}`}
                </li>
              ))}
            </ul>
            {errors.password && (
              <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Confirm password
            </label>
            <div className="relative">
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                autoComplete="new-password"
                className="pr-10"
                {...register("confirmPassword")}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
                aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}
              >
                {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="mt-1 text-sm text-red-600">{errors.confirmPassword.message}</p>
            )}
          </div>

          {error && (
            <p className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
              {error.message}
            </p>
          )}

          <Button type="submit" disabled={loading} className="w-full disabled:cursor-not-allowed">
            {loading ? "Creating account..." : "Register"}
          </Button>
        </form>

        <p className="mt-4 text-sm text-gray-600">
          Already have an account?{" "}
          <Link href="/login" className="font-medium text-blue-600 hover:underline">
            Login
          </Link>
        </p>
      </section>
    </div>
  );
};

export default Register;
