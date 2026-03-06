import api from "./api";
import type { Car, CarFilters, PaginatedResponse } from "@/types/Car";

export const carsService = {
  getAll: async (filters?: CarFilters): Promise<Car[]> => {
    const response = await api.get<PaginatedResponse<Car>>("/cars", { params: filters });
    return response.data.items;
  },

  getById: async (id: number): Promise<Car> => {
    const response = await api.get<Car>(`/cars/${id}`);
    return response.data;
  },
};
