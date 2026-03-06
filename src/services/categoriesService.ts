import api from "./api";
import type { Category } from "@/types/Category";

export const categoriesService = {
  getAll: async (): Promise<Category[]> => {
    const response = await api.get<Category[]>("/categories");
    return response.data;
  },

  getById: async (id: number): Promise<Category> => {
    const response = await api.get<Category>(`/categories/${id}`);
    return response.data;
  },
};
