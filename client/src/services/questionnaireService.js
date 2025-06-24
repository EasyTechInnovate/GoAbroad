import { apiService } from './api.services';

export const createQuestionnaire = async (data) => {
  return await apiService.post('/admin/questionnaires', data);
};

export const updateQuestionnaire = async (questionnaireId, data) => {
  return await apiService.put(`/admin/questionnaires/${questionnaireId}`, data);
};

export const deleteQuestionnaire = async (questionnaireId) => {
  return await apiService.delete(`/admin/questionnaires/${questionnaireId}`);
};

export const getQuestionnaires = async () => {
  return await apiService.get('/admin/questionnaires');
};

export const getQuestionnaireById = async (questionnaireId) => {
  return await apiService.get(`/admin/questionnaires/${questionnaireId}`);
};

export const addQuestion = async (questionnaireId, data) => {
  return await apiService.post(`/admin/questionnaires/${questionnaireId}/questions`, data);
};

export const removeQuestion = async (questionnaireId, data) => {
  return await apiService.delete(`/admin/questionnaires/${questionnaireId}/questions`, { data });
};

export const getSubtaskQuestionnaires = async (taskId, subtaskId) => {
  try {
    const response = await apiService.get(
      `/student/tasks/${taskId}/subtasks/${subtaskId}/questionnaires`
    );
    return response;
  } catch (error) {
    console.error('Error fetching questionnaires:', error);
    throw error;
  }
};

export const getQuestionnaireQuestions = async (taskId, subtaskId, questionnaireId) => {
  try {
    const response = await apiService.get(
      `/student/tasks/${taskId}/subtasks/${subtaskId}/questionnaires/${questionnaireId}`
    );
    return response;
  } catch (error) {
    console.error('Error fetching questionnaire questions:', error);
    throw error;
  }
};

export const submitQuestionnaireResponses = async (data) => {
  try {
    const response = await apiService.post(
      '/student/tasks/subtasks/questionnaires/question/responses',
      data
    );
    return response;
  } catch (error) {
    console.error('Error submitting questionnaire responses:', error);
    throw error;
  }
};
