import { servicesAxiosInstance } from './config';

export const apiService = {
  get: async (endpoint) => {
    const response = await servicesAxiosInstance.get(endpoint);
    return response.data;
  },
  
  post: async (endpoint, data) => {
    const response = await servicesAxiosInstance.post(endpoint, data);
    return response.data;
  },
  
  put: async (endpoint, data) => {
    const response = await servicesAxiosInstance.put(endpoint, data);
    return response.data;
  },
  
  delete: async (endpoint) => {
    const response = await servicesAxiosInstance.delete(endpoint);
    return response.data;
  }
};

export const getServerStatus = async () => {
  return apiService.get('/v1/self');
};

export const getServerHealth = async () => {
  return apiService.get('/v1/health');
};

export const registerUser = async (userData) => {
  return apiService.post('/v1/auth/signup', userData);
};

export const loginUser = async (userData) => {
  return apiService.post('/v1/auth/login', userData);
};

export const getUserProfile = async () => {
  return apiService.get('/v1/student/self');
};

export const updateUserProfile = async (profileData) => {
  return apiService.put('/v1/student/profile', profileData);
};

export const uploadFile = async (formData) => {
  return apiService.post('/v1/upload-file', formData);
};

export const adminLogin = async (data) => {
  return apiService.post('/v1/admin/auth/login', data);
};

export const updatePassword = async (passwordData) => {
  return apiService.post('/v1/admin/auth/update-password', passwordData);
};

export const getCurrentUser = async () => {
  return apiService.get('/v1/admin/self');
};

export const updateProfile = async (profileData) => {
  return apiService.put('/v1/admin/profile', profileData);
};
