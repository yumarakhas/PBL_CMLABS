import api from '../api';

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
  data.append("_method", "PUT");
  return api.post(`/employee/${id}`, data,{
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
export const deleteEmployee = async (id: number) => {
  return await api.delete(`/employee/${id}`);
};