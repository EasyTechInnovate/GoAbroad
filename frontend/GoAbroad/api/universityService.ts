// University API Service
// This service handles all university-related API calls

import apiClient, { API_ENDPOINTS, ApiResponse, PaginatedResponse } from './apiClient';
import { 
  University,
  UniversityDetailResponse,
  UniversitySearchRequest,
  UniversitySearchResponse,
  BookmarkUniversityRequest,
  BookmarkUniversityResponse,
  SubmitApplicationRequest,
  SubmitApplicationResponse,
  UniversityApplication,
  UniversityComparison,
  UniversityAnalytics
} from '@/models/University';

export class UniversityService {
  // Get all universities
  static async getUniversities(page: number = 1, limit: number = 10): Promise<PaginatedResponse<University>> {
    try {
      const response = await apiClient.get(API_ENDPOINTS.UNIVERSITIES.LIST, {
        params: { page, limit }
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Search universities
  static async searchUniversities(searchParams: UniversitySearchRequest): Promise<ApiResponse<UniversitySearchResponse>> {
    try {
      const response = await apiClient.get(API_ENDPOINTS.UNIVERSITIES.SEARCH, {
        params: searchParams
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Get university details
  static async getUniversityDetail(universityId: string): Promise<ApiResponse<UniversityDetailResponse>> {
    try {
      const response = await apiClient.get(API_ENDPOINTS.UNIVERSITIES.DETAIL.replace(':id', universityId));
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Bookmark/unbookmark university
  static async bookmarkUniversity(bookmarkData: BookmarkUniversityRequest): Promise<ApiResponse<BookmarkUniversityResponse>> {
    try {
      const response = await apiClient.post(
        API_ENDPOINTS.UNIVERSITIES.DETAIL.replace(':id', bookmarkData.universityId) + '/bookmark',
        bookmarkData
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Submit university application
  static async submitApplication(applicationData: SubmitApplicationRequest): Promise<ApiResponse<SubmitApplicationResponse>> {
    try {
      const response = await apiClient.post(API_ENDPOINTS.UNIVERSITIES.APPLICATIONS, applicationData);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Get user's applications
  static async getUserApplications(): Promise<ApiResponse<UniversityApplication[]>> {
    try {
      const response = await apiClient.get(API_ENDPOINTS.UNIVERSITIES.APPLICATIONS);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Get application details
  static async getApplicationDetail(applicationId: string): Promise<ApiResponse<UniversityApplication>> {
    try {
      const response = await apiClient.get(`${API_ENDPOINTS.UNIVERSITIES.APPLICATIONS}/${applicationId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Update application
  static async updateApplication(applicationId: string, data: Partial<SubmitApplicationRequest>): Promise<ApiResponse<UniversityApplication>> {
    try {
      const response = await apiClient.put(`${API_ENDPOINTS.UNIVERSITIES.APPLICATIONS}/${applicationId}`, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Get university requirements
  static async getUniversityRequirements(universityId: string): Promise<ApiResponse<any>> {
    try {
      const response = await apiClient.get(API_ENDPOINTS.UNIVERSITIES.REQUIREMENTS.replace(':id', universityId));
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Compare universities
  static async compareUniversities(universityIds: string[]): Promise<ApiResponse<UniversityComparison>> {
    try {
      const response = await apiClient.post('/universities/compare', { universityIds });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Get university analytics
  static async getUniversityAnalytics(universityId: string): Promise<ApiResponse<UniversityAnalytics>> {
    try {
      const response = await apiClient.get(`/universities/${universityId}/analytics`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Get user's bookmarked universities
  static async getBookmarkedUniversities(): Promise<ApiResponse<University[]>> {
    try {
      const response = await apiClient.get('/universities/bookmarked');
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Get featured universities
  static async getFeaturedUniversities(): Promise<ApiResponse<University[]>> {
    try {
      const response = await apiClient.get('/universities/featured');
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Get top universities
  static async getTopUniversities(limit: number = 10): Promise<ApiResponse<University[]>> {
    try {
      const response = await apiClient.get('/universities/top', {
        params: { limit }
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Get universities by country
  static async getUniversitiesByCountry(country: string): Promise<ApiResponse<University[]>> {
    try {
      const response = await apiClient.get('/universities/by-country', {
        params: { country }
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Get universities by program
  static async getUniversitiesByProgram(program: string): Promise<ApiResponse<University[]>> {
    try {
      const response = await apiClient.get('/universities/by-program', {
        params: { program }
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Get scholarship information
  static async getScholarships(universityId?: string): Promise<ApiResponse<any[]>> {
    try {
      const response = await apiClient.get('/universities/scholarships', {
        params: universityId ? { universityId } : {}
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Get application deadlines
  static async getApplicationDeadlines(universityId?: string): Promise<ApiResponse<any[]>> {
    try {
      const response = await apiClient.get('/universities/deadlines', {
        params: universityId ? { universityId } : {}
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

export default UniversityService;
