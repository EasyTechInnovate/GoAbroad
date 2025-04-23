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
