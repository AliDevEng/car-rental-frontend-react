"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { CalendarDays, Search, Filter } from "lucide-react";
import CarCard from "@/components/features/CarCard";
import { useCars } from "@/hooks/useCars";

type SortOption = "price-asc" | "price-desc";

const Home = () => {
  const router = useRouter();
  const { cars, loading, error } = useCars();
  const [sort, setSort] = useState<SortOption>("price-asc");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const sortedCars = useMemo(() => {
    const safeCars = Array.isArray(cars) ? cars : [];
    return [...safeCars].sort((a, b) =>
      sort === "price-asc" ? a.price - b.price : b.price - a.price,
    );
  }, [cars, sort]);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push("/cars");
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-navy relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-navy-dark/50 to-navy" />
        <div className="relative mx-auto max-w-7xl px-4 py-16 text-center sm:px-6 sm:py-24 lg:px-8">
          <h1 className="text-3xl font-extrabold text-white sm:text-4xl lg:text-5xl">
            Rent your next car here!
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-300">
            From economy city cars to luxury SUVs &mdash; we have the perfect option for your
            journey.
          </p>

          {/* Booking Form */}
          <form
            onSubmit={handleSearch}
            className="mx-auto mt-10 max-w-2xl rounded-xl border-2 border-amber-500 bg-white/5 p-6 backdrop-blur-sm sm:p-8"
          >
            <div className="mb-6 flex items-center justify-center gap-2 text-white">
              <CalendarDays className="h-6 w-6 text-amber-500" />
              <h2 className="text-xl font-bold">Book your car</h2>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="text-left">
                <label className="mb-1 flex items-center gap-1 text-sm font-medium text-gray-300">
                  <CalendarDays className="h-4 w-4" /> From date
                </label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full rounded-lg border-2 border-navy-light bg-white px-4 py-3 text-gray-900 focus:border-amber-500 focus:outline-none"
                />
              </div>
              <div className="text-left">
                <label className="mb-1 flex items-center gap-1 text-sm font-medium text-gray-300">
                  <CalendarDays className="h-4 w-4" /> To date
                </label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full rounded-lg border-2 border-navy-light bg-white px-4 py-3 text-gray-900 focus:border-amber-500 focus:outline-none"
                />
              </div>
            </div>

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

      {/* Available Cars Section */}
      <section className="bg-white py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">Available Cars Now</h2>
            <div className="mx-auto mt-2 h-1 w-16 rounded bg-amber-500" />
            <p className="mt-4 text-gray-600">
              Explore our wide selection of well-maintained vehicles
            </p>
          </div>

          {/* Sort bar */}
          {!loading && !error && sortedCars.length > 0 && (
            <div className="mb-6 flex flex-wrap items-center justify-between gap-4 rounded-lg border border-gray-200 bg-gray-50 px-4 py-3">
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <Filter className="h-4 w-4 text-amber-600" />
                <span className="font-medium">Sort:</span>
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value as SortOption)}
                  className="rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm focus:border-amber-500 focus:outline-none"
                >
                  <option value="price-asc">Lowest price first</option>
                  <option value="price-desc">Highest price first</option>
                </select>
              </div>
              <p className="text-sm text-gray-600">
                Showing{" "}
                <span className="font-semibold text-amber-600">{sortedCars.length} cars</span>
              </p>
            </div>
          )}

          {/* Loading state */}
          {loading && (
            <div className="flex items-center justify-center py-16">
              <p className="text-gray-500">Loading cars...</p>
            </div>
          )}

          {/* Error state */}
          {error && (
            <div className="rounded-lg bg-red-50 p-6 text-center">
              <p className="text-red-600">{error}</p>
            </div>
          )}

          {/* Empty state */}
          {!loading && !error && sortedCars.length === 0 && (
            <div className="rounded-lg bg-gray-50 p-6 text-center">
              <p className="text-gray-500">No cars available at the moment.</p>
            </div>
          )}

          {/* Car grid */}
          {!loading && !error && sortedCars.length > 0 && (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {sortedCars.map((car) => (
                <CarCard key={car.id} car={car} categoryName={car.categoryName} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;
