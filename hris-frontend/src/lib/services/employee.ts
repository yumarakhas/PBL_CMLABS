// src/lib/services/employee.ts
import api from '../api';
import Cookies from 'js-cookie';

/** Get token from cookies and ensure it exists */
const getAuthToken = () => {
  const token = Cookies.get('token');
  if (!token) {
    throw new Error('Authentication token not found. Please login.');
  }
  return token;
};

/** Fetch all employees (for admin/user view) */
export const getEmployees = () => {
  const token = getAuthToken();
  return api.get('/user/employees', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

/** Fetch single employee by ID */
export const getEmployee = (id: number) => {
  const token = getAuthToken();
  return api.get(`/user/employees/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getEmployeeById = (id: string | number) => {
  return getEmployee(Number(id));
};

/** ✅ CREATE: Add new employee into database (admin scope) */
export const createEmployee = (data: FormData | object) => {
  const token = getAuthToken();

  // Determine content type: FormData or JSON
  const isFormData = data instanceof FormData;
  const headers: any = {
    Authorization: `Bearer ${token}`,
    ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
  };

  return api.post("/admin/store", data, {
    headers,
  });
};

/** ✅ UPDATE: Update employee info (supports FormData) */
export const updateEmployee = (id: string | number, data: FormData | object) => {
  const token = getAuthToken();

  const formData = data instanceof FormData ? data : new FormData();
  if (!(data instanceof FormData)) {
    // Convert object to FormData
    Object.entries(data).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        formData.append(key, value as string);
      }
    });
  }

  formData.append('_method', 'PUT'); // Laravel-style method spoofing

  return api.post(`/user/employees/${id}`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

/** ✅ DELETE: Remove employee from database */
export const deleteEmployee = async (id: number) => {
  const token = getAuthToken();
  return await api.delete(`/user/employees/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

/** ✅ DELETE: Remove specific achievement of an employee */
export const removeAchievement = async (id: number) => {
  const token = getAuthToken();
  return await api.delete(`/user/employees/achievements/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
