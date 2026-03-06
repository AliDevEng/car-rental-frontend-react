"use client";

import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import CarList from "@/components/features/CarList";
import FilterSidebar from "@/components/features/FilterSidebar";
import { useCars } from "@/hooks/useCars";
import { useCategories } from "@/hooks/useCategories";
import type { CarFilters } from "@/types/Car";

const Cars = () => {
  const searchParams = useSearchParams();
  const categoryParam = searchParams?.get("category") ?? null;

  const [filters, setFilters] = useState<CarFilters>({});
  const { cars, loading, error } = useCars();
  const { categories } = useCategories();

  useEffect(() => {
    if (categoryParam) {
      setFilters((prev) => ({ ...prev, categoryId: Number(categoryParam) }));
    }
  }, [categoryParam]);

  const filteredCars = useMemo(() => {
    return cars.filter((car) => {
      if (filters.categoryId && car.categoryId !== filters.categoryId) return false;
      if (filters.fuel && car.fuel !== filters.fuel) return false;
      if (filters.transmission && car.transmission !== filters.transmission) return false;
      if (filters.maxPrice !== undefined && car.price > filters.maxPrice) return false;
      return true;
    });
  }, [cars, filters]);

  return (
    <div className="page-container space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Available Cars Now</h2>

      <div className="flex flex-col gap-6 lg:flex-row">
        <div className="w-full lg:w-72 lg:shrink-0">
          <FilterSidebar filters={filters} onFilterChange={setFilters} categories={categories} />
        </div>
        <div className="flex-1">
          <CarList cars={filteredCars} loading={loading} error={error} />
        </div>
      </div>
    </div>
  );
};

export default Cars;
