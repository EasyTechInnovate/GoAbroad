import { servicesAxiosInstance } from './config';

export const uploadFile = async (formData) => {
  const response = await servicesAxiosInstance.post('/v1/upload-file', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  
  return response.data;
};
