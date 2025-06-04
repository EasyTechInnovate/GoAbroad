import { apiService } from './api.services';

export const createTask = async (data) => {
  return await apiService.post('/admin/tasks', data);
};

export const getTasks = async (params = {}) => {
  return await apiService.get('/admin/tasks', { params });
};

export const getTaskById = async (taskId) => {
  return await apiService.get(`/admin/tasks/${taskId}`);
};

export const updateTask = async (taskId, data) => {
  return await apiService.put(`/admin/tasks/${taskId}`, data);
};

export const deleteTask = async (taskId) => {
  return await apiService.delete(`/admin/tasks/${taskId}`);
};

// Task-Student Assignment
export const addStudentsToTask = async (taskId, data) => {
  return await apiService.post(`/admin/tasks/${taskId}/students/add`, data);
};

export const removeStudentFromTask = async (taskId, data) => {
  return await apiService.post(`/admin/tasks/${taskId}/students/remove`, data);
};

export const updateStudentTaskAssignment = async (data) => {
  return await apiService.put('/admin/student-task-assignments/update', data);
};

// Task-Subtask Assignment
export const addSubtasksToTask = async (taskId, data) => {
  return await apiService.post(`/admin/tasks/${taskId}/subtasks/add`, data);
};

export const removeSubtaskFromTask = async (taskId, data) => {
  return await apiService.post(`/admin/tasks/${taskId}/subtasks/remove`, data);
};

export const updateTaskSubtaskAssignment = async (data) => {
  return await apiService.put('/admin/task-subtask-assignments/update', data);
};
