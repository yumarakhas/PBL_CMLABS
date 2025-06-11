// lib/api.ts
import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000/api",
  withCredentials: true,
});

// Add a request interceptor to include Authorization header if token exists
api.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("admin_auth_token");
      if (token) {
        config.headers = config.headers || {};
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Admin Login API
export const loginAdmin = async (identifier: string, password: string) => {
  const response = await api.post("/admin/login", { identifier, password });
  return response.data;
};

// Fetch admin data (optional)
export const getAdminUser = async (token: string) => {
  const response = await api.get("/admin/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export default api;
