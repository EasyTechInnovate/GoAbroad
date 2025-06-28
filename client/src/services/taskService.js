import { apiService } from './api.services';

export const createTask = async (data) => {
  return await apiService.post('/admin/tasks', data);
};

export const getTasks = async (studentId) => {
  if (!studentId) {
    throw new Error('Student ID is required');
  }
  return await apiService.get(`/admin/task/${studentId}`);
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

// Create a subtask with a questionnaire and add it to the task
export const addQuestionnaireToTask = async (taskId, questionnaireId) => {
  // 1. Create a subtask for the questionnaire
  const subtaskResponse = await apiService.post('/admin/subtasks', {
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

export const getStudentTasks = async ({ sortOrder = 'desc', page = 1, limit = 10 } = {}) => {
  return await apiService.get('/student/tasks', {
    params: { sortOrder, page, limit },
  });
};
