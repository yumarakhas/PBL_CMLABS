// lib/api.ts
import axios from 'axios';
import Cookies from 'js-cookie';

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
export const loginAdmin = async (email: string, password: string) => {
  const res = await fetch('http://localhost:8000/api/admin/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    throw await res.json();
  }

  const data = await res.json();

  // Simpan token di cookie
  Cookies.set('token', data.token, { expires: 1 }); // expires 1 day
  return data;
};

// lib/api.ts
export async function logoutAdmin(token: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/logout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error("Logout failed");
  }

  return res.json();
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
