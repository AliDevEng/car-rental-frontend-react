"use client";

import { useState, useEffect, useCallback } from "react";
import type { Car, CarFilters } from "@/types/Car";
import { carsService } from "@/services/carsService";

interface UseCarsReturn {
  cars: Car[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export const useCars = (filters?: CarFilters): UseCarsReturn => {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const categoryId = filters?.categoryId;
  const fuel = filters?.fuel;
  const transmission = filters?.transmission;
  const minPrice = filters?.minPrice;
  const maxPrice = filters?.maxPrice;
  const startDate = filters?.startDate;
  const endDate = filters?.endDate;

  useEffect(() => {
    let cancelled = false;

    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const activeFilters: CarFilters = {};
        if (categoryId !== undefined) activeFilters.categoryId = categoryId;
        if (fuel) activeFilters.fuel = fuel;
        if (transmission) activeFilters.transmission = transmission;
        if (minPrice !== undefined) activeFilters.minPrice = minPrice;
        if (maxPrice !== undefined) activeFilters.maxPrice = maxPrice;
        if (startDate) activeFilters.startDate = startDate;
        if (endDate) activeFilters.endDate = endDate;

        const hasFilters = Object.keys(activeFilters).length > 0;
        const data = await carsService.getAll(hasFilters ? activeFilters : undefined);
        if (!cancelled) setCars(data);
      } catch (err: unknown) {
        if (!cancelled) {
          const message = err instanceof Error ? err.message : "Failed to load cars";
          setError(message);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchData();
    return () => {
      cancelled = true;
    };
  }, [categoryId, fuel, transmission, minPrice, maxPrice, startDate, endDate, refreshKey]);

  const refetch = useCallback(() => setRefreshKey((k) => k + 1), []);

  return { cars, loading, error, refetch };
};
