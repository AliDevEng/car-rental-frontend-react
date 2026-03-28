export interface Car {
  id: number;
  categoryId: number;
  categoryName: string;
  brand: string;
  model: string;
  year: number;
  regNr: string;
  fuel: string;
  transmission: string;
  seats: number;
  price: number;
  status: string;
  description?: string;
  createdAt: string;
}

export interface CarFilters {
  categoryId?: number;
  fuel?: string;
  transmission?: string;
  minPrice?: number;
  maxPrice?: number;
  startDate?: string;
  endDate?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  totalCount?: number;
  page?: number;
  pageSize?: number;
}
