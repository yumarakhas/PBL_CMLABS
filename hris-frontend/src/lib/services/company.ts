import api from '../api';

export interface CompanyFormData {
  name: string;
  email: string;
  head_office_phone: string;
  head_office_phone_backup?: string;
  head_office_address: string;
  description?: string;
}

export async function createCompany(data: CompanyFormData) {
  try {
    const response = await api.post('/companies', data);
    return response.data;
  } catch (error: any) {
    // Kirimkan error response ke frontend untuk penanganan
    if (error.response) {
      throw error.response.data;
    }
    throw new Error('An unexpected error occurred.');
  }
}
