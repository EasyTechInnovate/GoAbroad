import { apiService } from './api.services';

export const createQuestionnaire = async (data) => {
  return await apiService.post('/v1/admin/questionnaires', data);
};

export const updateQuestionnaire = async (questionnaireId, data) => {
  return await apiService.put(`/v1/admin/questionnaires/${questionnaireId}`, data);
};

export const deleteQuestionnaire = async (questionnaireId) => {
  return await apiService.delete(`/v1/admin/questionnaires/${questionnaireId}`);
};

export const getQuestionnaires = async () => {
  return await apiService.get('/v1/admin/questionnaires');
};

export const getQuestionnaireById = async (questionnaireId) => {
  return await apiService.get(`/v1/admin/questionnaires/${questionnaireId}`);
};

export const addQuestion = async (questionnaireId, data) => {
  return await apiService.post(`/v1/admin/questionnaires/${questionnaireId}/questions`, data);
};

export const removeQuestion = async (questionnaireId, data) => {
  return await apiService.delete(`/v1/admin/questionnaires/${questionnaireId}/questions`, { data });
};
