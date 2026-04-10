"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import type { AxiosError } from "axios";
import { CalendarDays, CircleUserRound, LoaderCircle, MapPin, RotateCcw } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { customerService } from "@/services/customerService";
import { bookingService } from "@/services/bookingService";
import type { CustomerProfile, UpdateCustomerPayload } from "@/types/Customer";
import type { Booking } from "@/types/Booking";
import { formatCurrency } from "@/utils/formatters";

type AccountTab = "profile" | "bookings";
type BookingFilter = "upcoming" | "active" | "past" | "all";

const PROFILE_FIELDS: Array<{
  key: keyof UpdateCustomerPayload;
  label: string;
  autoComplete?: string;
}> = [
  { key: "firstName", label: "First name", autoComplete: "given-name" },
  { key: "lastName", label: "Last name", autoComplete: "family-name" },
  { key: "email", label: "Email", autoComplete: "email" },
  { key: "phone", label: "Phone", autoComplete: "tel" },
  { key: "address", label: "Address", autoComplete: "street-address" },
  { key: "city", label: "City", autoComplete: "address-level2" },
  { key: "postalCode", label: "Postal code", autoComplete: "postal-code" },
  { key: "country", label: "Country", autoComplete: "country-name" },
];

const emptyProfile = (
  userId: number,
  email: string,
  firstName: string,
  lastName: string,
): CustomerProfile => ({
  id: userId,
  email,
  firstName,
  lastName,
  role: "customer",
  phone: "",
  address: "",
  city: "",
  postalCode: "",
  country: "",
});

const toDateOnly = (value: string): Date | null => {
  if (!value) {
    return null;
  }

  const [year, month, day] = value.split("T")[0]?.split("-").map(Number) ?? [];
  if (!year || !month || !day) {
    return null;
  }

  return new Date(year, month - 1, day);
};

const getToday = (): Date => {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), now.getDate());
};

const diffInDays = (left: Date, right: Date): number =>
  Math.floor((left.getTime() - right.getTime()) / (1000 * 60 * 60 * 24));

const formatDate = (value: string): string => {
  const date = toDateOnly(value);
  if (!date) {
    return value || "N/A";
  }

  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
};

const getBookingBadgeClasses = (status: Booking["status"]): string => {
  switch (status) {
    case "ACTIVE":
      return "border-emerald-200 bg-emerald-50 text-emerald-800";
    case "COMPLETED":
      return "border-slate-200 bg-slate-100 text-slate-700";
    case "CANCELLED":
      return "border-rose-200 bg-rose-50 text-rose-700";
    case "PENDING":
    default:
      return "border-amber-200 bg-amber-50 text-amber-800";
  }
};

const getBookingBucket = (booking: Booking): BookingFilter => {
  if (booking.status === "ACTIVE") {
    return "active";
  }

  if (booking.status === "CANCELLED" || booking.status === "COMPLETED") {
    return "past";
  }

  const today = getToday();
  const startDate = toDateOnly(booking.startDate);
  const endDate = toDateOnly(booking.endDate);

  if (startDate && endDate && today >= startDate && today <= endDate) {
    return "active";
  }

  if (startDate && today < startDate) {
    return "upcoming";
  }

  return "past";
};

const canCancelBooking = (booking: Booking): boolean => {
  if (booking.status !== "PENDING") {
    return false;
  }

  const startDate = toDateOnly(booking.startDate);
  if (!startDate) {
    return false;
  }

  return diffInDays(startDate, getToday()) >= 1;
};

const getVehicleLabel = (booking: Booking): string => {
  const vehicleName = [booking.carBrand, booking.carModel].filter(Boolean).join(" ");
  if (vehicleName) {
    return booking.carRegNr ? `${vehicleName} • ${booking.carRegNr}` : vehicleName;
  }

  return booking.carRegNr ? `Vehicle ${booking.carRegNr}` : `Car #${booking.carId}`;
};

const Dashboard = () => {
  const { user, syncUser } = useAuth();
  const [activeTab, setActiveTab] = useState<AccountTab>("profile");
  const [bookingFilter, setBookingFilter] = useState<BookingFilter>("upcoming");
  const [profile, setProfile] = useState<CustomerProfile | null>(null);
  const [draftProfile, setDraftProfile] = useState<UpdateCustomerPayload | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [loadingBookings, setLoadingBookings] = useState(true);
  const [savingProfile, setSavingProfile] = useState(false);
  const [cancellingBookingId, setCancellingBookingId] = useState<number | null>(null);
  const [profileError, setProfileError] = useState<string | null>(null);
  const [profileSuccess, setProfileSuccess] = useState<string | null>(null);
  const [bookingError, setBookingError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) {
      return;
    }

    let isMounted = true;

    const loadProfile = async () => {
      setLoadingProfile(true);
      setProfileError(null);

      try {
        const nextProfile = await customerService.getById(user.id);
        if (!isMounted) {
          return;
        }

        setProfile(nextProfile);
        setDraftProfile({
          firstName: nextProfile.firstName,
          lastName: nextProfile.lastName,
          email: nextProfile.email,
          phone: nextProfile.phone,
          address: nextProfile.address,
          city: nextProfile.city,
          postalCode: nextProfile.postalCode,
          country: nextProfile.country,
        });
      } catch (error) {
        if (!isMounted) {
          return;
        }

        const fallbackProfile = emptyProfile(user.id, user.email, user.firstName, user.lastName);
        setProfile(fallbackProfile);
        setDraftProfile({
          firstName: fallbackProfile.firstName,
          lastName: fallbackProfile.lastName,
          email: fallbackProfile.email,
          phone: fallbackProfile.phone,
          address: fallbackProfile.address,
          city: fallbackProfile.city,
          postalCode: fallbackProfile.postalCode,
          country: fallbackProfile.country,
        });
        setProfileError(
          "We could not load your full profile right now. You can still try saving your details.",
        );
      } finally {
        if (isMounted) {
          setLoadingProfile(false);
        }
      }
    };

    const loadBookings = async () => {
      setLoadingBookings(true);
      setBookingError(null);

      try {
        const nextBookings = await bookingService.getMyBookings();
        if (isMounted) {
          setBookings(nextBookings);
        }
      } catch (error) {
        if (isMounted) {
          setBookingError("We could not load your bookings right now.");
        }
      } finally {
        if (isMounted) {
          setLoadingBookings(false);
        }
      }
    };

    void loadProfile();
    void loadBookings();

    return () => {
      isMounted = false;
    };
  }, [user]);

  const filteredBookings = useMemo(() => {
    if (bookingFilter === "all") {
      return bookings;
    }

    return bookings.filter((booking) => getBookingBucket(booking) === bookingFilter);
  }, [bookingFilter, bookings]);

  const bookingCounts = useMemo(
    () => ({
      upcoming: bookings.filter((booking) => getBookingBucket(booking) === "upcoming").length,
      active: bookings.filter((booking) => getBookingBucket(booking) === "active").length,
      past: bookings.filter((booking) => getBookingBucket(booking) === "past").length,
      all: bookings.length,
    }),
    [bookings],
  );

  if (!user) {
    return null;
  }

  const handleDraftChange = (field: keyof UpdateCustomerPayload, value: string) => {
    setProfileSuccess(null);
    setDraftProfile((current) => (current ? { ...current, [field]: value } : current));
  };

  const handleProfileSave = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!draftProfile) {
      return;
    }

    setSavingProfile(true);
    setProfileError(null);
    setProfileSuccess(null);

    try {
      const nextProfile = await customerService.updateById(user.id, draftProfile);
      setProfile(nextProfile);
      setDraftProfile({
        firstName: nextProfile.firstName,
        lastName: nextProfile.lastName,
        email: nextProfile.email,
        phone: nextProfile.phone,
        address: nextProfile.address,
        city: nextProfile.city,
        postalCode: nextProfile.postalCode,
        country: nextProfile.country,
      });
      syncUser({
        ...user,
        email: nextProfile.email,
        firstName: nextProfile.firstName,
        lastName: nextProfile.lastName,
      });
      setProfileSuccess("Your profile has been updated.");
    } catch (error) {
      const axiosError = error as AxiosError<{ message?: string }>;
      setProfileError(axiosError.response?.data?.message ?? "We could not save your profile.");
    } finally {
      setSavingProfile(false);
    }
  };

  const handleBookingCancel = async (bookingId: number) => {
    setCancellingBookingId(bookingId);
    setBookingError(null);

    try {
      const updatedBooking = await bookingService.cancelBooking(bookingId);
      setBookings((current) =>
        current.map((booking) => (booking.id === bookingId ? updatedBooking : booking)),
      );
    } catch (error) {
      const axiosError = error as AxiosError<{ message?: string }>;
      setBookingError(
        axiosError.response?.data?.message ??
          "We could not cancel that booking. Please try again or contact support.",
      );
    } finally {
      setCancellingBookingId(null);
    }
  };

  return (
    <div className="page-container">
      <section className="overflow-hidden rounded-3xl bg-gradient-to-r from-navy-dark via-navy to-navy-light text-white shadow-xl">
        <div className="flex flex-col gap-6 px-6 py-8 sm:px-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.28em] text-amber-300">My account</p>
            <h1 className="mt-3 text-3xl font-bold sm:text-4xl">
              Welcome back, {user.firstName || user.email}
            </h1>
            <p className="mt-3 max-w-2xl text-sm text-slate-200 sm:text-base">
              Manage your profile, follow upcoming rentals, and jump back to the home page when you
              are ready to book again.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-full bg-amber-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-amber-600"
            >
              Book Another Car
            </Link>
            <Link
              href="/#available-cars"
              className="inline-flex items-center justify-center rounded-full border border-white/20 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Browse Availability
            </Link>
          </div>
        </div>
      </section>

      <div className="mt-8 grid gap-8 lg:grid-cols-[240px_minmax(0,1fr)]">
        <aside className="space-y-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
            <button
              type="button"
              onClick={() => setActiveTab("profile")}
              className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-medium transition ${
                activeTab === "profile"
                  ? "bg-slate-900 text-white"
                  : "text-slate-700 hover:bg-slate-100"
              }`}
            >
              <CircleUserRound className="h-4 w-4" />
              Profile
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("bookings")}
              className={`mt-2 flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-medium transition ${
                activeTab === "bookings"
                  ? "bg-slate-900 text-white"
                  : "text-slate-700 hover:bg-slate-100"
              }`}
            >
              <CalendarDays className="h-4 w-4" />
              Bookings
            </button>
          </div>

          <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900 shadow-sm">
            <p className="font-semibold">Cancellation rule</p>
            <p className="mt-2">
              Pending bookings can be cancelled up to 1 day before the start date.
            </p>
          </div>
        </aside>

        <div>
          {activeTab === "profile" && (
            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">Profile information</h2>
                  <p className="mt-2 text-sm text-slate-600">
                    Keep your contact and address details up to date for smoother bookings.
                  </p>
                </div>
                {loadingProfile && <LoaderCircle className="h-5 w-5 animate-spin text-slate-400" />}
              </div>

              {profileError && (
                <p className="mt-4 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
                  {profileError}
                </p>
              )}
              {profileSuccess && (
                <p className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                  {profileSuccess}
                </p>
              )}

              <form className="mt-6" onSubmit={handleProfileSave}>
                <div className="grid gap-4 sm:grid-cols-2">
                  {PROFILE_FIELDS.map((field) => (
                    <label
                      key={field.key}
                      className={field.key === "address" ? "sm:col-span-2" : ""}
                    >
                      <span className="mb-1.5 block text-sm font-medium text-slate-700">
                        {field.label}
                      </span>
                      <Input
                        value={draftProfile?.[field.key] ?? ""}
                        autoComplete={field.autoComplete}
                        onChange={(event) => handleDraftChange(field.key, event.target.value)}
                        disabled={loadingProfile || savingProfile}
                      />
                    </label>
                  ))}
                </div>

                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <Button type="submit" disabled={loadingProfile || savingProfile || !draftProfile}>
                    {savingProfile ? "Saving..." : "Save Changes"}
                  </Button>
                  {profile && (
                    <button
                      type="button"
                      onClick={() =>
                        setDraftProfile({
                          firstName: profile.firstName,
                          lastName: profile.lastName,
                          email: profile.email,
                          phone: profile.phone,
                          address: profile.address,
                          city: profile.city,
                          postalCode: profile.postalCode,
                          country: profile.country,
                        })
                      }
                      className="rounded-full border border-slate-300 px-5 py-2.5 text-sm font-medium text-slate-700 transition hover:border-slate-400 hover:bg-slate-100"
                    >
                      Reset
                    </button>
                  )}
                </div>
              </form>
            </section>
          )}

          {activeTab === "bookings" && (
            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">Your bookings</h2>
                  <p className="mt-2 text-sm text-slate-600">
                    Review current, future, and past rentals in one place.
                  </p>
                </div>
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 rounded-full border border-amber-300 bg-amber-50 px-4 py-2 text-sm font-medium text-amber-900 transition hover:bg-amber-100"
                >
                  <RotateCcw className="h-4 w-4" />
                  Book again
                </Link>
              </div>

              <div className="mt-6 flex flex-wrap gap-2">
                {(
                  [
                    ["upcoming", "Upcoming"],
                    ["active", "Active"],
                    ["past", "Past"],
                    ["all", "All"],
                  ] as Array<[BookingFilter, string]>
                ).map(([value, label]) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setBookingFilter(value)}
                    className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                      bookingFilter === value
                        ? "bg-slate-900 text-white"
                        : "border border-slate-300 bg-white text-slate-700 hover:bg-slate-100"
                    }`}
                  >
                    {label} ({bookingCounts[value]})
                  </button>
                ))}
              </div>

              {bookingError && (
                <p className="mt-4 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
                  {bookingError}
                </p>
              )}

              {loadingBookings ? (
                <div className="mt-8 flex items-center gap-3 text-sm text-slate-500">
                  <LoaderCircle className="h-5 w-5 animate-spin" />
                  Loading your bookings...
                </div>
              ) : filteredBookings.length === 0 ? (
                <div className="mt-8 rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center">
                  <p className="text-lg font-semibold text-slate-800">
                    No bookings in this view yet.
                  </p>
                  <p className="mt-2 text-sm text-slate-600">
                    Head back home to explore available cars and reserve your next trip.
                  </p>
                  <Link
                    href="/#available-cars"
                    className="mt-5 inline-flex rounded-full bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-700"
                  >
                    Find a car
                  </Link>
                </div>
              ) : (
                <div className="mt-6 space-y-4">
                  {filteredBookings.map((booking) => (
                    <article
                      key={booking.id}
                      className="rounded-2xl border border-slate-200 bg-slate-50/70 p-5 shadow-sm"
                    >
                      <div className="flex flex-wrap items-start justify-between gap-4">
                        <div>
                          <div className="flex flex-wrap items-center gap-2">
                            <p className="text-lg font-semibold text-slate-900">
                              {getVehicleLabel(booking)}
                            </p>
                            <span
                              className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wide ${getBookingBadgeClasses(
                                booking.status,
                              )}`}
                            >
                              {booking.status}
                            </span>
                          </div>
                          <p className="mt-1 text-sm text-slate-500">
                            Booking #{booking.bookingNumber}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-slate-500">Total</p>
                          <p className="text-lg font-semibold text-slate-900">
                            {formatCurrency(booking.totalPrice)}
                          </p>
                        </div>
                      </div>

                      <div className="mt-4 grid gap-3 text-sm text-slate-600 sm:grid-cols-3">
                        <div className="rounded-xl bg-white px-4 py-3">
                          <p className="font-medium text-slate-800">Start date</p>
                          <p className="mt-1">{formatDate(booking.startDate)}</p>
                        </div>
                        <div className="rounded-xl bg-white px-4 py-3">
                          <p className="font-medium text-slate-800">End date</p>
                          <p className="mt-1">{formatDate(booking.endDate)}</p>
                        </div>
                        <div className="rounded-xl bg-white px-4 py-3">
                          <p className="font-medium text-slate-800">Booked on</p>
                          <p className="mt-1">{formatDate(booking.rentalDate)}</p>
                        </div>
                      </div>

                      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                        <div className="flex items-center gap-2 text-sm text-slate-500">
                          <MapPin className="h-4 w-4" />
                          <span>
                            {canCancelBooking(booking)
                              ? "You can still cancel this booking online."
                              : booking.status === "PENDING"
                                ? "Online cancellation is no longer available for this booking."
                                : "This booking is no longer cancellable online."}
                          </span>
                        </div>

                        {canCancelBooking(booking) && (
                          <button
                            type="button"
                            onClick={() => handleBookingCancel(booking.id)}
                            disabled={cancellingBookingId === booking.id}
                            className="rounded-full border border-rose-300 px-4 py-2 text-sm font-medium text-rose-700 transition hover:bg-rose-50 disabled:cursor-not-allowed disabled:opacity-60"
                          >
                            {cancellingBookingId === booking.id
                              ? "Cancelling..."
                              : "Cancel booking"}
                          </button>
                        )}
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
