import api from "./api";
import type {
  RegisterPayload,
  LoginPayload,
  AuthResponse,
  RegisterResult,
  AuthenticatedUserResponse,
} from "../types/Auth";
import type { User } from "../types/User";

interface ApiAuthUser {
  id: number;
  email: string;
  firstName?: string;
  lastName?: string;
  role?: string;
}

interface ApiAuthResponse {
  token?: string;
  user?: ApiAuthUser;
  userId?: number;
  id?: number;
  email?: string;
  role?: string;
  firstName?: string;
  lastName?: string;
  first_name?: string;
  last_name?: string;
}

const normalizeRole = (role?: string): User["role"] =>
  role?.toLowerCase() === "admin" ? "admin" : "customer";

const normalizeUser = (user: ApiAuthUser): User => ({
  id: user.id,
  email: user.email,
  firstName: user.firstName ?? "",
  lastName: user.lastName ?? "",
  role: normalizeRole(user.role),
});

const mapAuthResponse = (
  data: ApiAuthResponse,
  fallback?: { email?: string; firstName?: string; lastName?: string },
): AuthResponse => {
  if (!data.token) {
    throw new Error("Authentication token missing in response");
  }

  if (data.user) {
    return {
      token: data.token,
      user: normalizeUser(data.user),
    };
  }

  const id = data.userId ?? data.id ?? 0;
  const email = data.email ?? fallback?.email ?? "";
  const firstName = data.firstName ?? data.first_name ?? fallback?.firstName ?? "";
  const lastName = data.lastName ?? data.last_name ?? fallback?.lastName ?? "";

  return {
    token: data.token,
    user: {
      id,
      email,
      firstName,
      lastName,
      role: normalizeRole(data.role),
    },
  };
};

const mapAuthenticatedUser = (data: AuthenticatedUserResponse): User => ({
  id: data.id,
  email: data.email,
  firstName: data.firstName ?? "",
  lastName: data.lastName ?? "",
  role: normalizeRole(data.role),
});

export const authService = {
  async register(payload: RegisterPayload): Promise<RegisterResult> {
    const res = await api.post<ApiAuthResponse>("/customers/register", payload);

    if (res.data.token) {
      const authenticated = mapAuthResponse(res.data, {
        email: payload.email,
        firstName: payload.firstName,
        lastName: payload.lastName,
      });

      return {
        token: authenticated.token,
        user: authenticated.user,
        requiresLogin: false,
      };
    }

    return {
      token: null,
      user: null,
      requiresLogin: true,
    };
  },

  async login(payload: LoginPayload, isAdmin = false): Promise<AuthResponse> {
    const url = isAdmin ? "/auth/admin/login" : "/auth/login";
    const res = await api.post<ApiAuthResponse>(url, payload);
    const authResponse = mapAuthResponse(res.data, { email: payload.email });

    const meResponse = await api.get<AuthenticatedUserResponse>("/auth/me", {
      headers: {
        Authorization: `Bearer ${authResponse.token}`,
      },
    });

    return {
      token: authResponse.token,
      user: mapAuthenticatedUser(meResponse.data),
    };
  },

  logout() {
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }
  },
};
