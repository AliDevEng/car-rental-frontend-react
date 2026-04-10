// Auth-related types for Car Rental frontend

import type { User } from "./User";

export interface RegisterPayload {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
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

export interface AuthenticatedUserResponse extends User {
  phone?: string | null;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface RegisterResult {
  token: string | null;
  user: User | null;
  requiresLogin: boolean;
}

export interface AuthError {
  status: number;
  message: string;
  errors?: Record<string, string | string[]>;
}
