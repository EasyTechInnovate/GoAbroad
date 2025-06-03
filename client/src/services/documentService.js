import { apiService } from './api.services';

export const createDocument = async (data) => {
  return await apiService.post('/admin/documents', data);
};

export const getDocuments = async (params = {}) => {
  return await apiService.get('/admin/documents', { params });
};

export const updateDocument = async (documentId, data) => {
  return await apiService.put(`/admin/documents/${documentId}`, data);
};

export const deleteDocument = async (documentId) => {
  return await apiService.delete(`/admin/documents/${documentId}`);
};

export const getDocumentById = async (documentId) => {
  return await apiService.get(`/admin/documents/${documentId}`);
};
