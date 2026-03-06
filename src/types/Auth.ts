// Auth-related types for Car Rental frontend

import type { User } from "./User";

export interface RegisterPayload {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface AuthError {
  status: number;
  message: string;
  errors?: Record<string, string[]>;
}
