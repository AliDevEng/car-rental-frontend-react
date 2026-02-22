import type { Car } from "./Car";

export interface Category {
  id: number;
  name: string;
  cars: Car[];
}
