import { apiService } from './api.services';

export const getSubtasks = async (page = 1, limit = 10) => {
  try {
    const response = await apiService.get(`/v1/admin/subtasks?page=${page}&limit=${limit}`);
    return {
      success: true,
      data: response.data || []
    };
  } catch (error) {
    console.error('Error fetching subtasks:', error);
    throw error;
  }
};

export const getSubtaskById = async (subtaskId) => {
  try {
    const response = await apiService.get(`/v1/admin/subtasks/${subtaskId}`);
    return {
      success: true,
      data: response.data
    };
  } catch (error) {
    console.error('Error fetching subtask:', error);
    throw error;
  }
};

export const createSubtask = async (subtaskData) => {
  try {
    const response = await apiService.post('/v1/admin/subtasks', {
      title: subtaskData.title,
      description: subtaskData.description,
      logo: subtaskData.logo,
      priority: subtaskData.priority,
      questionnaireIds: subtaskData.questionnaireIds || []
    });
    return {
      success: true,
      data: response.data
    };
  } catch (error) {
    console.error('Error creating subtask:', error);
    throw error;
  }
};

export const updateSubtask = async (subtaskId, subtaskData) => {
  try {
    const response = await apiService.put(`/v1/admin/subtasks/${subtaskId}`, {
      title: subtaskData.title,
      description: subtaskData.description,
      logo: subtaskData.logo,
      priority: subtaskData.priority,
      questionnaireIds: subtaskData.questionnaireIds || []
    });
    return {
      success: true,
      data: response.data
    };
  } catch (error) {
    console.error('Error updating subtask:', error);
    throw error;
  }
};

export const deleteSubtask = async (subtaskId) => {
  try {
    const response = await apiService.delete(`/v1/admin/subtasks/${subtaskId}`);
    return {
      success: true,
      data: response.data
    };
  } catch (error) {
    console.error('Error deleting subtask:', error);
    throw error;
  }
};

export const updateQuestionnaireAssignmentStatus = async (assignmentData) => {
  try {
    const response = await apiService.put('/v1/admin/subtask-questionnaire-assignments/update-status', {
      assignmentId: assignmentData.assignmentId,
      status: assignmentData.status
    });
    return {
      success: true,
      data: response.data
    };
  } catch (error) {
    console.error('Error updating questionnaire assignment status:', error);
    throw error;
  }
};
