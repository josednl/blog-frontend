import apiClient from '@/services/api/apiClient';
import { LoginCredentials, RegisterData } from '@/types/auth';

export const authAPI = {
  login: (credentials: LoginCredentials) => apiClient.post('/auth/login', credentials),
  register: (data: RegisterData) => apiClient.post('/users', data),
  getMe: () => apiClient.get('/auth/me'),
  logout: () => apiClient.post('/auth/logout'),
};
