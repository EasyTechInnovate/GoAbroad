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
