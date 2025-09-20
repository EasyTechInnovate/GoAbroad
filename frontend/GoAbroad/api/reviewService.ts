// Review API Service
// This service handles all review-related API calls

import apiClient, { API_ENDPOINTS, ApiResponse, PaginatedResponse } from './apiClient';
import { 
  Review,
  ReviewStats,
  ReviewListRequest,
  ReviewListResponse,
  CreateReviewRequest,
  CreateReviewResponse,
  UpdateReviewRequest,
  UpdateReviewResponse,
  DeleteReviewRequest,
  DeleteReviewResponse,
  VoteHelpfulRequest,
  VoteHelpfulResponse,
  ReportReviewRequest,
  ReportReviewResponse,
  ReviewAnalytics
} from '@/models/Review';

export class ReviewService {
  // Get reviews
  static async getReviews(params: ReviewListRequest): Promise<ApiResponse<ReviewListResponse>> {
    try {
      const response = await apiClient.get('/reviews', {
        params
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Create review
  static async createReview(data: CreateReviewRequest): Promise<ApiResponse<CreateReviewResponse>> {
    try {
      const response = await apiClient.post('/reviews', data);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Update review
  static async updateReview(data: UpdateReviewRequest): Promise<ApiResponse<UpdateReviewResponse>> {
    try {
      const response = await apiClient.put(`/reviews/${data.reviewId}`, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Delete review
  static async deleteReview(data: DeleteReviewRequest): Promise<ApiResponse<DeleteReviewResponse>> {
    try {
      const response = await apiClient.delete(`/reviews/${data.reviewId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Vote helpful
  static async voteHelpful(data: VoteHelpfulRequest): Promise<ApiResponse<VoteHelpfulResponse>> {
    try {
      const response = await apiClient.post(`/reviews/${data.reviewId}/vote`, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Report review
  static async reportReview(data: ReportReviewRequest): Promise<ApiResponse<ReportReviewResponse>> {
    try {
      const response = await apiClient.post(`/reviews/${data.reviewId}/report`, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Get course reviews
  static async getCourseReviews(courseId: string, page: number = 1, limit: number = 20): Promise<PaginatedResponse<Review>> {
    try {
      const response = await apiClient.get(`/courses/${courseId}/reviews`, {
        params: { page, limit }
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Get university reviews
  static async getUniversityReviews(universityId: string, page: number = 1, limit: number = 20): Promise<PaginatedResponse<Review>> {
    try {
      const response = await apiClient.get(`/universities/${universityId}/reviews`, {
        params: { page, limit }
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Get user reviews
  static async getUserReviews(userId: string, page: number = 1, limit: number = 20): Promise<PaginatedResponse<Review>> {
    try {
      const response = await apiClient.get(`/users/${userId}/reviews`, {
        params: { page, limit }
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Get review stats
  static async getReviewStats(itemId: string, itemType: string): Promise<ApiResponse<ReviewStats>> {
    try {
      const response = await apiClient.get('/reviews/stats', {
        params: { itemId, itemType }
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Get review analytics
  static async getReviewAnalytics(): Promise<ApiResponse<ReviewAnalytics>> {
    try {
      const response = await apiClient.get('/reviews/analytics');
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Get helpful reviews
  static async getHelpfulReviews(itemId: string, itemType: string, limit: number = 10): Promise<ApiResponse<Review[]>> {
    try {
      const response = await apiClient.get('/reviews/helpful', {
        params: { itemId, itemType, limit }
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Get verified reviews
  static async getVerifiedReviews(itemId: string, itemType: string, limit: number = 10): Promise<ApiResponse<Review[]>> {
    try {
      const response = await apiClient.get('/reviews/verified', {
        params: { itemId, itemType, limit }
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Get recent reviews
  static async getRecentReviews(itemId: string, itemType: string, limit: number = 10): Promise<ApiResponse<Review[]>> {
    try {
      const response = await apiClient.get('/reviews/recent', {
        params: { itemId, itemType, limit }
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Get review by ID
  static async getReviewById(reviewId: string): Promise<ApiResponse<Review>> {
    try {
      const response = await apiClient.get(`/reviews/${reviewId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Get review replies
  static async getReviewReplies(reviewId: string, page: number = 1, limit: number = 20): Promise<PaginatedResponse<Review>> {
    try {
      const response = await apiClient.get(`/reviews/${reviewId}/replies`, {
        params: { page, limit }
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Reply to review
  static async replyToReview(reviewId: string, reply: string): Promise<ApiResponse<Review>> {
    try {
      const response = await apiClient.post(`/reviews/${reviewId}/reply`, { reply });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Get review summary
  static async getReviewSummary(itemId: string, itemType: string): Promise<ApiResponse<any>> {
    try {
      const response = await apiClient.get('/reviews/summary', {
        params: { itemId, itemType }
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

export default ReviewService;
