import { servicesAxiosInstance } from './config';

export const apiService = {
  get: async (endpoint) => {
    const response = await servicesAxiosInstance.get(endpoint);
    return response.data;
  },
  
  post: async (endpoint, data) => {
    const response = await servicesAxiosInstance.post(endpoint, data);
    return response.data;
  },
  
  put: async (endpoint, data) => {
    const response = await servicesAxiosInstance.put(endpoint, data);
    return response.data;
  },
  
  delete: async (endpoint) => {
    const response = await servicesAxiosInstance.delete(endpoint);
    return response.data;
  }
};

export const getServerStatus = async () => {
  return apiService.get('/v1/self');
};

export const getServerHealth = async () => {
  return apiService.get('/v1/health');
};

export const registerUser = async (userData) => {
  return apiService.post('/v1/auth/signup', userData);
};

export const loginUser = async (userData) => {
  return apiService.post('/v1/auth/login', userData);
};

export const getUserProfile = async () => {
  return apiService.get('/v1/student/self');
};

export const updateUserProfile = async (profileData) => {
  return apiService.put('/v1/student/profile', profileData);
};

export const uploadFile = async (formData) => {
  return apiService.post('/v1/upload-file', formData);
};

export const adminLogin = async (data) => {
  return apiService.post('/v1/admin/auth/login', data);
};

export const updatePassword = async (passwordData) => {
  return apiService.post('/v1/admin/auth/update-password', passwordData);
};

export const getCurrentUser = async () => {
  return apiService.get('/v1/admin/self');
};

export const updateProfile = async (profileData) => {
  return apiService.put('/v1/admin/profile', profileData);
};

export const getCategories = async () => {
  try {
    const response = await apiService.get('/v1/categories');
    return {
      success: true,
      data: response.data || []
    };
  } catch (error) {
    console.error('Error fetching categories:', error);
    return {
      success: false,
      error: error.response?.data?.message || 'Failed to fetch categories'
    };
  }
};

export const createCategory = async (categoryData) => {
  try {
    const response = await apiService.post('/v1/admin/categories', categoryData);
    return {
      success: true,
      data: response.data
    };
  } catch (error) {
    console.error('Error creating category:', error);
    return {
      success: false,
      error: error.response?.data?.message || 'Failed to create category'
    };
  }
};

export const updateCategory = async (id, data) => {
  try {
    const response = await apiService.put(`/v1/admin/categories/${id}`, data);
    return {
      success: true,
      data: response.data
    };
  } catch (error) {
    console.error('Error updating category:', error);
    return {
      success: false,
      error: error.response?.data?.message || 'Failed to update category'
    };
  }
};

export const deleteCategory = async (id) => {
  try {
    const response = await apiService.delete(`/v1/admin/categories/${id}`);
    return {
      success: true,
      data: response.data
    };
  } catch (error) {
    console.error('Error deleting category:', error);
    return {
      success: false,
      error: error.response?.data?.message || 'Failed to delete category'
    };
  }
};

export const getFaqs = async (categoryId = null) => {
  try {
    const url = categoryId ? `/v1/faqs?categoryId=${categoryId}` : '/v1/faqs';
    const response = await apiService.get(url);
    return {
      success: true,
      data: response.data || []
    };
  } catch (error) {
    console.error('Error fetching FAQs:', error);
    return {
      success: false,
      error: error.response?.data?.message || 'Failed to fetch FAQs'
    };
  }
};

export const createFaq = async (faqData) => {
  try {
    const response = await apiService.post('/v1/admin/faqs', faqData);
    return {
      success: true,
      data: response.data
    };
  } catch (error) {
    console.error('Error creating FAQ:', error);
    return {
      success: false,
      error: error.response?.data?.message || 'Failed to create FAQ'
    };
  }
};

export const updateFaq = async (id, data) => {
  try {
    const response = await apiService.put(`/v1/admin/faqs/${id}`, data);
    return {
      success: true,
      data: response.data
    };
  } catch (error) {
    console.error('Error updating FAQ:', error);
    return {
      success: false,
      error: error.response?.data?.message || 'Failed to update FAQ'
    };
  }
};

export const deleteFaq = async (id) => {
  try {
    const response = await apiService.delete(`/v1/admin/faqs/${id}`);
    return {
      success: true,
      data: response.data
    };
  } catch (error) {
    console.error('Error deleting FAQ:', error);
    return {
      success: false, 
      error: error.response?.data?.message || 'Failed to delete FAQ'
    };
  }
};
