import axios from "axios";
import type { AxiosError, InternalAxiosRequestConfig } from "axios";

const DEFAULT_BASE_URLS = ["https://localhost:7174", "http://localhost:8080"];
const BASE_URL_STORAGE_KEY = "mrrent:active-api-base-url";

const normalizeBaseUrl = (value: string): string => value.trim().replace(/\/+$/, "");

const parseBaseUrls = (): string[] => {
  const configured =
    process.env.NEXT_PUBLIC_API_BASE_URLS
      ?.split(",")
      .map(normalizeBaseUrl)
      .filter(Boolean) ?? [];

  const single = process.env.NEXT_PUBLIC_API_BASE_URL
    ? [normalizeBaseUrl(process.env.NEXT_PUBLIC_API_BASE_URL)]
    : [];

  const combined = [...configured, ...single, ...DEFAULT_BASE_URLS].filter(Boolean);
  return [...new Set(combined)];
};

const baseUrls = parseBaseUrls();
let activeBaseUrl = baseUrls[0] ?? DEFAULT_BASE_URLS[0];

const getSavedBaseUrl = (): string | null => {
  if (typeof window === "undefined") {
    return null;
  }

  const value = localStorage.getItem(BASE_URL_STORAGE_KEY);
  return value ? normalizeBaseUrl(value) : null;
};

const setSavedBaseUrl = (url: string): void => {
  if (typeof window === "undefined") {
    return;
  }

  localStorage.setItem(BASE_URL_STORAGE_KEY, url);
};

const pickInitialBaseUrl = (): string => {
  const saved = getSavedBaseUrl();
  if (saved && baseUrls.includes(saved)) {
    return saved;
  }

  return activeBaseUrl;
};

const getNextBaseUrl = (current: string): string | null => {
  if (baseUrls.length < 2) {
    return null;
  }

  const currentIndex = baseUrls.indexOf(current);
  const nextIndex = currentIndex >= 0 ? currentIndex + 1 : 0;
  if (nextIndex >= baseUrls.length) {
    return null;
  }

  return baseUrls[nextIndex];
};

type RetryableConfig = InternalAxiosRequestConfig & {
  _hasRetriedBaseUrl?: boolean;
};

const api = axios.create({
  baseURL: pickInitialBaseUrl(),
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    config.baseURL = activeBaseUrl;

    if (typeof window === "undefined") {
      return config;
    }

    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

api.interceptors.response.use(
  (response) => {
    const usedBaseUrl = response.config.baseURL;
    if (usedBaseUrl && usedBaseUrl !== activeBaseUrl) {
      activeBaseUrl = usedBaseUrl;
    }

    setSavedBaseUrl(activeBaseUrl);
    return response;
  },
  async (error: AxiosError) => {
    const requestConfig = error.config as RetryableConfig | undefined;

    if (
      requestConfig &&
      !requestConfig._hasRetriedBaseUrl &&
      !error.response &&
      typeof window !== "undefined"
    ) {
      const currentUrl = normalizeBaseUrl(requestConfig.baseURL ?? activeBaseUrl);
      const nextBaseUrl = getNextBaseUrl(currentUrl);

      if (nextBaseUrl) {
        requestConfig._hasRetriedBaseUrl = true;
        requestConfig.baseURL = nextBaseUrl;
        activeBaseUrl = nextBaseUrl;
        setSavedBaseUrl(nextBaseUrl);
        return api(requestConfig);
      }
    }

    if (typeof window === "undefined") {
      return Promise.reject(error);
    }

    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.dispatchEvent(new Event("auth:logout"));
      if (window.location.pathname !== "/login") {
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  },
);

export default api;
