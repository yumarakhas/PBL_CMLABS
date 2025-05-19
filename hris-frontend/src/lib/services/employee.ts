import api from '../api';
import axios from 'axios';

export const getEmployees = () => api.get('/employee');
export const getEmployee = (id: number) => api.get(`/employee/${id}`);
export const getEmployeeById = (id: string | number) => {
  return api.get(`/employee/${id}`);
};
export const createEmployee = (data: FormData) => {
  return api.post("/employee", data,{
   headers: {
      "Content-Type": "multipart/form-data",
    }, 
  }); 
};
export const updateEmployee = (id: string | number, data: FormData) => {
  return api.put(`/employee/${id}`, data,{
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
export const deleteEmployee = async (id: number) => {
  return await api.delete(`/employee/${id}`);
};
