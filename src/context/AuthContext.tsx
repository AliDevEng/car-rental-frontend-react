"use client";

import { createContext, useState, useEffect, useCallback } from "react";
import type { AxiosError } from "axios";
import { authService } from "../services/authService";
import type { User } from "../types/User";
import type { RegisterPayload, LoginPayload, AuthError } from "../types/Auth";

interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: AuthError | null;
  login: (payload: LoginPayload, isAdmin?: boolean) => Promise<void>;
  register: (payload: RegisterPayload) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

const mapAxiosError = (err: unknown, fallbackMessage: string): AuthError => {
  const error = err as AxiosError<{ message?: string; errors?: Record<string, string[]> }>;

  return {
    status: error.response?.status ?? 500,
    message: error.response?.data?.message ?? fallbackMessage,
    errors: error.response?.data?.errors,
  };
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<AuthError | null>(null);

  // Load from localStorage on mount
  useEffect(() => {
    const storedToken = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    const storedUser = typeof window !== "undefined" ? localStorage.getItem("user") : null;
    if (storedToken && storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser) as User;
        setToken(storedToken);
        setUser(parsedUser);
      } catch {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      }
    }
  }, []);

  useEffect(() => {
    const onAuthLogout = () => {
      setToken(null);
      setUser(null);
      setError(null);
    };

    window.addEventListener("auth:logout", onAuthLogout);
    return () => window.removeEventListener("auth:logout", onAuthLogout);
  }, []);

  const login = useCallback(async (payload: LoginPayload, isAdmin = false) => {
    setLoading(true);
    setError(null);
    try {
      const res = await authService.login(payload, isAdmin);
      setToken(res.token);
      setUser(res.user);
      if (typeof window !== "undefined") {
        localStorage.setItem("token", res.token);
        localStorage.setItem("user", JSON.stringify(res.user));
      }
    } catch (err: unknown) {
      setError(mapAxiosError(err, "Login failed"));
      setToken(null);
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const register = useCallback(async (payload: RegisterPayload) => {
    setLoading(true);
    setError(null);
    try {
      const res = await authService.register(payload);
      setToken(res.token);
      setUser(res.user);
      if (typeof window !== "undefined") {
        localStorage.setItem("token", res.token);
        localStorage.setItem("user", JSON.stringify(res.user));
      }
    } catch (err: unknown) {
      setError(mapAxiosError(err, "Registration failed"));
      setToken(null);
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUser(null);
    setError(null);
    authService.logout();
  }, []);

  return (
    <AuthContext.Provider value={{ user, token, loading, error, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
