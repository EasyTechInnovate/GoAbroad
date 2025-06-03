import { apiService } from './api.services';

export const createSubtask = async (data) => {
  return await apiService.post('/admin/subtasks', data);
};

export const updateSubtask = async (subtaskId, data) => {
  return await apiService.put(`/admin/subtasks/${subtaskId}`, data);
};

export const deleteSubtask = async (subtaskId) => {
  return await apiService.delete(`/admin/subtasks/${subtaskId}`);
};

export const getSubtasks = async (params = {}) => {
  return await apiService.get('/admin/subtasks', { params });
};

export const getSubtaskById = async (subtaskId) => {
  return await apiService.get(`/admin/subtasks/${subtaskId}`);
};

export const updateSubtaskQuestionnaireStatus = async (data) => {
  return await apiService.put('/admin/subtask-questionnaire-assignments/update-status', data);
};
