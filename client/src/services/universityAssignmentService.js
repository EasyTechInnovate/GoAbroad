import { apiService } from './api.services';

// University Assignment APIs
export const assignUniversity = async (data) => {
  return await apiService.post('/admin/student-university-assignments', data);
};

export const getUniversityAssignments = async (params = {}) => {
  return await apiService.get('/admin/student-university-assignments', { params });
};

export const updateUniversityAssignment = async (assignmentId, data) => {
  return await apiService.put(`/admin/student-university-assignments/${assignmentId}`, data);
};

export const deleteUniversityAssignment = async (assignmentId) => {
  return await apiService.delete(`/admin/student-university-assignments/${assignmentId}`);
};

export const getUniversityAssignmentById = async (assignmentId) => {
  return await apiService.get(`/admin/student-university-assignments/${assignmentId}`);
};
