"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { CalendarDays, Search, Filter, ChevronDown, X } from "lucide-react";
import CarCard from "@/components/features/CarCard";
import { useCars } from "@/hooks/useCars";
import { useAuth } from "@/hooks/useAuth";
import type { Car } from "@/types/Car";
import DatePicker from "@/components/ui/DatePicker";

type SortOption = "price-asc" | "price-desc";
type ActiveFilters = { category: string; fuel: string; transmission: string };

const AVAILABLE_SECTION_ID = "available-cars";

const toUtcDate = (date: string): Date => {
  const [year, month, day] = date.split("-").map(Number);
  return new Date(Date.UTC(year, month - 1, day));
};

const calculateRentalDays = (startDate: string, endDate: string): number => {
  const diff = toUtcDate(endDate).getTime() - toUtcDate(startDate).getTime();
  const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
  return Math.max(days, 1);
};

const isAvailableStatus = (status: string): boolean => status.toLowerCase() === "available";

const Home = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, token } = useAuth();

  const [sort, setSort] = useState<SortOption>("price-asc");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [searchError, setSearchError] = useState<string | null>(null);
  const [appliedPeriod, setAppliedPeriod] = useState<{ startDate: string; endDate: string } | null>(
    null,
  );
  const [filters, setFilters] = useState<ActiveFilters>({
    category: "",
    fuel: "",
    transmission: "",
  });

  const hydratedFromQueryRef = useRef(false);
  const resultsRef = useRef<HTMLElement | null>(null);

  const { cars, loading, error } = useCars(
    appliedPeriod ? { startDate: appliedPeriod.startDate, endDate: appliedPeriod.endDate } : undefined,
  );

  const availableCategories = useMemo(
    () => [...new Set((Array.isArray(cars) ? cars : []).map((car) => car.categoryName).filter(Boolean))],
    [cars],
  );
  const availableFuels = useMemo(
    () => [...new Set((Array.isArray(cars) ? cars : []).map((car) => car.fuel).filter(Boolean))],
    [cars],
  );
  const availableTransmissions = useMemo(
    () =>
      [...new Set((Array.isArray(cars) ? cars : []).map((car) => car.transmission).filter(Boolean))],
    [cars],
  );

  const rentalDays = useMemo(() => {
    if (!appliedPeriod) return null;
    return calculateRentalDays(appliedPeriod.startDate, appliedPeriod.endDate);
  }, [appliedPeriod]);
  const hasActiveFilters = Boolean(filters.category || filters.fuel || filters.transmission);

  const filteredAndSortedCars = useMemo(() => {
    const safeCars = Array.isArray(cars) ? cars : [];
    const byAvailability = appliedPeriod
      ? safeCars.filter((car) => isAvailableStatus(car.status))
      : safeCars;

    const byFilters = byAvailability.filter((car) => {
      if (filters.category && car.categoryName !== filters.category) return false;
      if (filters.fuel && car.fuel !== filters.fuel) return false;
      if (filters.transmission && car.transmission !== filters.transmission) return false;
      return true;
    });

    return [...byFilters].sort((a, b) =>
      sort === "price-asc" ? a.price - b.price : b.price - a.price,
    );
  }, [appliedPeriod, cars, filters, sort]);

  const buildQuery = (next: {
    sort?: SortOption;
    startDate?: string;
    endDate?: string;
    category?: string;
    fuel?: string;
    transmission?: string;
  }): string => {
    const params = new URLSearchParams();
    const nextSort = next.sort ?? sort;
    const nextStart = next.startDate ?? startDate;
    const nextEnd = next.endDate ?? endDate;
    const nextCategory = next.category ?? filters.category;
    const nextFuel = next.fuel ?? filters.fuel;
    const nextTransmission = next.transmission ?? filters.transmission;

    if (nextSort) params.set("sort", nextSort);
    if (nextStart) params.set("startDate", nextStart);
    if (nextEnd) params.set("endDate", nextEnd);
    if (nextCategory) params.set("category", nextCategory);
    if (nextFuel) params.set("fuel", nextFuel);
    if (nextTransmission) params.set("transmission", nextTransmission);

    return params.toString();
  };

  const scrollToResults = () => {
    const section = resultsRef.current;
    if (!section) return;

    section.scrollIntoView({ behavior: "smooth", block: "start" });
    section.focus({ preventScroll: true });
  };

  useEffect(() => {
    if (hydratedFromQueryRef.current) return;

    const querySort = searchParams?.get("sort");
    const queryStartDate = searchParams?.get("startDate");
    const queryEndDate = searchParams?.get("endDate");
    const queryCategory = searchParams?.get("category");
    const queryFuel = searchParams?.get("fuel");
    const queryTransmission = searchParams?.get("transmission");

    if (querySort === "price-asc" || querySort === "price-desc") {
      setSort(querySort);
    }

    if (queryStartDate) setStartDate(queryStartDate);
    if (queryEndDate) setEndDate(queryEndDate);
    if (queryCategory || queryFuel || queryTransmission) {
      setFilters({
        category: queryCategory ?? "",
        fuel: queryFuel ?? "",
        transmission: queryTransmission ?? "",
      });
    }

    if (queryStartDate && queryEndDate && toUtcDate(queryEndDate) >= toUtcDate(queryStartDate)) {
      setAppliedPeriod({ startDate: queryStartDate, endDate: queryEndDate });
      setTimeout(scrollToResults, 50);
    }

    hydratedFromQueryRef.current = true;
  }, [searchParams]);

  const updateUrl = (next: {
    sort?: SortOption;
    startDate?: string;
    endDate?: string;
    category?: string;
    fuel?: string;
    transmission?: string;
  }) => {
    const query = buildQuery(next);
    const path = query ? `/?${query}#${AVAILABLE_SECTION_ID}` : `/#${AVAILABLE_SECTION_ID}`;
    router.replace(path, { scroll: false });
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearchError(null);

    if (!startDate || !endDate) {
      setSearchError("Please select both start and end dates to search availability.");
      return;
    }

    if (toUtcDate(endDate) < toUtcDate(startDate)) {
      setSearchError("End date must be the same as or after start date.");
      return;
    }

    setAppliedPeriod({ startDate, endDate });
    updateUrl({ startDate, endDate });
    setTimeout(scrollToResults, 50);
  };

  const handleSortChange = (nextSort: SortOption) => {
    setSort(nextSort);
    updateUrl({ sort: nextSort });
  };

  const handleFilterChange = (field: keyof ActiveFilters, value: string) => {
    const nextFilters = { ...filters, [field]: value };
    setFilters(nextFilters);
    updateUrl(nextFilters);
  };

  const handleClearAllFilters = () => {
    const cleared = { category: "", fuel: "", transmission: "" };
    setFilters(cleared);
    updateUrl(cleared);
  };

  const handleRemoveChip = (field: keyof ActiveFilters) => {
    handleFilterChange(field, "");
  };

  const handleBook = (car: Car) => {
    if (!appliedPeriod) {
      return;
    }

    const bookingSearch = new URLSearchParams({
      startDate: appliedPeriod.startDate,
      endDate: appliedPeriod.endDate,
      returnTo: `/?${buildQuery({})}#${AVAILABLE_SECTION_ID}`,
    }).toString();
    const bookingPath = `/car/${car.id}?${bookingSearch}`;

    if (!user || !token) {
      const loginQuery = new URLSearchParams({
        message: "Please log in to book this car for your selected dates.",
        redirect: bookingPath,
      }).toString();

      router.push(`/login?${loginQuery}`);
      return;
    }

    router.push(bookingPath);
  };

  return (
    <div>
      <section className="bg-navy relative overflow-visible z-20">
        <div className="absolute inset-0 bg-gradient-to-b from-navy-dark/50 to-navy" />
        <div className="relative mx-auto max-w-7xl px-4 py-16 text-center sm:px-6 sm:py-24 lg:px-8">
          <h1 className="text-3xl font-extrabold text-white sm:text-4xl lg:text-5xl">
            Rent your next car here!
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-300">
            From economy city cars to luxury SUVs &mdash; we have the perfect option for your
            journey.
          </p>

          <form
            onSubmit={handleSearch}
            className="mx-auto mt-10 max-w-2xl rounded-xl border-2 border-amber-500 bg-white/5 p-6 backdrop-blur-sm sm:p-8"
          >
            <div className="mb-6 flex items-center justify-center gap-2 text-white">
              <CalendarDays className="h-6 w-6 text-amber-500" />
              <h2 className="text-xl font-bold">Book your car</h2>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <DatePicker
                label="From date"
                value={startDate}
                onChange={(value) => {
                  setStartDate(value);
                  if (endDate && value && toUtcDate(endDate) < toUtcDate(value)) {
                    setEndDate(value);
                  }
                }}
              />
              <DatePicker
                label="To date"
                value={endDate}
                min={startDate || undefined}
                onChange={setEndDate}
              />
            </div>

            {searchError && (
              <p className="mt-4 rounded-lg border border-amber-300 bg-amber-50 px-4 py-2 text-sm text-amber-900">
                {searchError}
              </p>
            )}

            <button
              type="submit"
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-red-700 px-6 py-3 font-semibold text-white transition-colors hover:bg-red-800"
            >
              <Search className="h-5 w-5" />
              Search Available Cars
            </button>
          </form>
        </div>
      </section>

      <section
        id={AVAILABLE_SECTION_ID}
        ref={resultsRef}
        tabIndex={-1}
        className="bg-white py-12 focus:outline-none"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">Available Cars Now</h2>
            <div className="mx-auto mt-2 h-1 w-16 rounded bg-amber-500" />
            <p className="mt-4 text-gray-600">
              {appliedPeriod
                ? `Showing cars for ${appliedPeriod.startDate} to ${appliedPeriod.endDate}.`
                : "Explore our wide selection of well-maintained vehicles"}
            </p>
          </div>

          {!loading && !error && (
            <div className="mb-6 space-y-4 rounded-xl border border-gray-200 bg-gradient-to-r from-gray-50 to-white p-4 shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <Filter className="h-4 w-4 text-amber-600" />
                  <span className="font-medium">Sort:</span>
                  <select
                    value={sort}
                    onChange={(e) => handleSortChange(e.target.value as SortOption)}
                    className="rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm focus:border-amber-500 focus:outline-none"
                  >
                    <option value="price-asc">Lowest price first</option>
                    <option value="price-desc">Highest price first</option>
                  </select>
                </div>

                <div className="flex items-center gap-3">
                  <p className="text-sm text-gray-600">
                    Showing{" "}
                    <span className="font-semibold text-amber-600">{filteredAndSortedCars.length} cars</span>
                    {rentalDays && <span> for {rentalDays} day(s)</span>}
                  </p>
                  {hasActiveFilters && (
                    <button
                      type="button"
                      onClick={handleClearAllFilters}
                      className="rounded-full border border-gray-300 bg-white px-3 py-1 text-xs font-medium text-gray-700 transition hover:border-amber-400 hover:text-amber-700"
                    >
                      Clear all
                    </button>
                  )}
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                <label className="relative block">
                  <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Category
                  </span>
                  <select
                    value={filters.category}
                    onChange={(e) => handleFilterChange("category", e.target.value)}
                    className="w-full appearance-none rounded-xl border border-gray-300 bg-white px-4 py-2.5 pr-10 text-sm text-gray-800 shadow-sm transition focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-100"
                  >
                    <option value="">All categories</option>
                    {availableCategories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-3 top-[34px] h-4 w-4 text-gray-500" />
                </label>

                <label className="relative block">
                  <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Fuel
                  </span>
                  <select
                    value={filters.fuel}
                    onChange={(e) => handleFilterChange("fuel", e.target.value)}
                    className="w-full appearance-none rounded-xl border border-gray-300 bg-white px-4 py-2.5 pr-10 text-sm text-gray-800 shadow-sm transition focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-100"
                  >
                    <option value="">All fuel types</option>
                    {availableFuels.map((fuel) => (
                      <option key={fuel} value={fuel}>
                        {fuel}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-3 top-[34px] h-4 w-4 text-gray-500" />
                </label>

                <label className="relative block">
                  <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Transmission
                  </span>
                  <select
                    value={filters.transmission}
                    onChange={(e) => handleFilterChange("transmission", e.target.value)}
                    className="w-full appearance-none rounded-xl border border-gray-300 bg-white px-4 py-2.5 pr-10 text-sm text-gray-800 shadow-sm transition focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-100"
                  >
                    <option value="">All transmissions</option>
                    {availableTransmissions.map((transmission) => (
                      <option key={transmission} value={transmission}>
                        {transmission}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-3 top-[34px] h-4 w-4 text-gray-500" />
                </label>
              </div>

              {(hasActiveFilters || appliedPeriod) && (
                <div className="flex flex-wrap gap-2">
                  {appliedPeriod && (
                    <span className="inline-flex items-center rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-medium text-amber-800">
                      Dates: {appliedPeriod.startDate} - {appliedPeriod.endDate}
                    </span>
                  )}
                  {filters.category && (
                    <button
                      type="button"
                      onClick={() => handleRemoveChip("category")}
                      className="inline-flex items-center gap-1 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-medium text-blue-800 transition hover:bg-blue-100"
                    >
                      Category: {filters.category}
                      <X className="h-3 w-3" />
                    </button>
                  )}
                  {filters.fuel && (
                    <button
                      type="button"
                      onClick={() => handleRemoveChip("fuel")}
                      className="inline-flex items-center gap-1 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-800 transition hover:bg-emerald-100"
                    >
                      Fuel: {filters.fuel}
                      <X className="h-3 w-3" />
                    </button>
                  )}
                  {filters.transmission && (
                    <button
                      type="button"
                      onClick={() => handleRemoveChip("transmission")}
                      className="inline-flex items-center gap-1 rounded-full border border-violet-200 bg-violet-50 px-3 py-1 text-xs font-medium text-violet-800 transition hover:bg-violet-100"
                    >
                      Transmission: {filters.transmission}
                      <X className="h-3 w-3" />
                    </button>
                  )}
                </div>
              )}
            </div>
          )}

          {loading && (
            <div className="flex items-center justify-center py-16">
              <p className="text-gray-500">Loading cars...</p>
            </div>
          )}

          {error && (
            <div className="rounded-lg bg-red-50 p-6 text-center">
              <p className="text-red-600">{error}</p>
            </div>
          )}

          {!loading && !error && filteredAndSortedCars.length === 0 && (
            <div className="rounded-lg bg-gray-50 p-6 text-center">
              <p className="text-gray-500">
                {appliedPeriod
                  ? "No cars available for the selected dates."
                  : "No cars available at the moment."}
              </p>
            </div>
          )}

          {!loading && !error && filteredAndSortedCars.length > 0 && (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredAndSortedCars.map((car) => (
                <CarCard
                  key={car.id}
                  car={car}
                  categoryName={car.categoryName}
                  rentalDays={rentalDays ?? undefined}
                  onBook={appliedPeriod ? () => handleBook(car) : undefined}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;
