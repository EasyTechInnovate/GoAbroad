import { servicesAxiosInstance } from './config';

export const getServerStatus = async () => {
  const response = await servicesAxiosInstance.get('/v1/self');
  return response.data;
};

export const getServerHealth = async () => {
  const response = await servicesAxiosInstance.get('/v1/health');
  return response.data;
};

export const registerUser = async (userData) => {
  const response = await servicesAxiosInstance.post('/v1/auth/signup', userData);
  return response.data;
};

export const loginUser = async (userData) => {
  const response = await servicesAxiosInstance.post('/v1/auth/login', userData);
  return response.data;
};

export const getUserProfile = async () => {
  const response = await servicesAxiosInstance.get('/v1/student/self');
  return response.data;
};

export const updateUserProfile = async (profileData) => {
  const response = await servicesAxiosInstance.put('/v1/student/profile', profileData);
  return response.data;
};

export const uploadFile = async (formData) => {
  const response = await servicesAxiosInstance.post('/v1/upload-file', formData);
  return response.data;
};

export const adminLogin = async (data) => {
  const response = await servicesAxiosInstance.post('/v1/admin/auth/login', data);
  return response.data;
};

export const updatePassword = async (passwordData) => {
  const response = await servicesAxiosInstance.post('/v1/admin/auth/update-password', passwordData);
  return response.data;
};

export const getCurrentUser = async () => {
  const response = await servicesAxiosInstance.get('/v1/admin/self');
  return response.data;
};

export const updateProfile = async (profileData) => {
  const response = await servicesAxiosInstance.put('/v1/admin/profile', profileData);
  return response.data;
};
