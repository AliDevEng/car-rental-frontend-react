"use client";

import { useState, useEffect, useCallback } from "react";
import type { Category } from "@/types/Category";
import { categoriesService } from "@/services/categoriesService";

interface UseCategoriesReturn {
  categories: Category[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export const useCategories = (): UseCategoriesReturn => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCategories = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await categoriesService.getAll();
      setCategories(data);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Failed to load categories";
      setError(message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  return { categories, loading, error, refetch: fetchCategories };
};
