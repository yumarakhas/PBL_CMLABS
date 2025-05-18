import api from '../api';
import axios from 'axios';

export const getEmployees = () => api.get('/employee');
export const getEmployee = (id: number) => api.get(`/employee/${id}`);
export const createEmployee = (data: FormData) => {
  return api.post("/employee", data); 
};
export const updateEmployee = (id: number, data: any) => api.put(`/employee/${id}`, data);
export const deleteEmployee = async (id: number) => {
  return await axios.delete(`/employee/${id}`);
};

