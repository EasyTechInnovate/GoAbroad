import { apiService } from './api.services';

export const createTask = async (data) => {
  return await apiService.post('/v1/admin/tasks', data);
};

export const getTasks = async (params = {}) => {
  return await apiService.get('/v1/admin/tasks', { params });
};

export const getTaskById = async (taskId) => {
  return await apiService.get(`/v1/admin/tasks/${taskId}`);
};

export const updateTask = async (taskId, data) => {
  return await apiService.put(`/v1/admin/tasks/${taskId}`, data);
};

export const deleteTask = async (taskId) => {
  return await apiService.delete(`/v1/admin/tasks/${taskId}`);
};

// Task-Student Assignment
export const addStudentsToTask = async (taskId, data) => {
  return await apiService.post(`/v1/admin/tasks/${taskId}/students/add`, data);
};

export const removeStudentFromTask = async (taskId, data) => {
  return await apiService.post(`/v1/admin/tasks/${taskId}/students/remove`, data);
};

export const updateStudentTaskAssignment = async (data) => {
  return await apiService.put('/v1/admin/student-task-assignments/update', data);
};

// Task-Subtask Assignment
export const addSubtasksToTask = async (taskId, data) => {
  return await apiService.post(`/v1/admin/tasks/${taskId}/subtasks/add`, data);
};

export const removeSubtaskFromTask = async (taskId, data) => {
  return await apiService.post(`/v1/admin/tasks/${taskId}/subtasks/remove`, data);
};

export const updateTaskSubtaskAssignment = async (data) => {
  return await apiService.put('/v1/admin/task-subtask-assignments/update', data);
};

// Create a subtask with a questionnaire and add it to the task
export const addQuestionnaireToTask = async (taskId, questionnaireId) => {
  // 1. Create a subtask for the questionnaire
  const subtaskResponse = await apiService.post('/v1/admin/subtasks', {
    title: 'Questionnaire',
    description: 'Complete the questionnaire',
    priority: 'MEDIUM',
    questionnaireIds: [questionnaireId],
  });

  // 2. Add the subtask to the task
  await addSubtasksToTask(taskId, {
    subtaskIds: [subtaskResponse.data.subtask._id],
  });

  return subtaskResponse;
};
