import api from "./api";
import type { Car, CarFilters, PaginatedResponse } from "@/types/Car";

export const carsService = {
  getAll: async (filters?: CarFilters): Promise<Car[]> => {
    const response = await api.get<PaginatedResponse<Car> | Car[]>("/cars", { params: filters });

    // Support both response shapes: `{ items: [...] }` and plain `[...]`
    if (Array.isArray(response.data)) {
      return response.data;
    }

    if (Array.isArray(response.data.items)) {
      return response.data.items;
    }

    throw new Error(
      "Unexpected cars response from API. Check NEXT_PUBLIC_API_BASE_URL and backend response shape.",
    );
  },

  getById: async (id: number): Promise<Car> => {
    const response = await api.get<Car>(`/cars/${id}`);
    return response.data;
  },
};
