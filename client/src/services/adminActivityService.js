import { servicesAxiosInstance } from './config';

export const getAdminStudentActivities = async (page = 1, limit = 5) => {
  try {
    const response = await servicesAxiosInstance.get('/admin/student-activities', {
      params: { page, limit }
    });
    return response.data;
  } catch (err) {
    throw err.response?.data || err;
  }
};
