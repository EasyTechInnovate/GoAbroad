// Course API Service
// This service handles all course-related API calls

import apiClient, { API_ENDPOINTS, ApiResponse, PaginatedResponse } from './apiClient';
import { 
  Course,
  CourseDetail,
  CourseSearchRequest,
  CourseSearchResponse,
  EnrollCourseRequest,
  EnrollCourseResponse,
  CourseReviewRequest,
  CourseReviewResponse,
  BookmarkCourseRequest,
  BookmarkCourseResponse,
  CompleteLessonRequest,
  CompleteLessonResponse,
  CourseProgress,
  CourseAnalytics
} from '@/models/Course';

export class CourseService {
  // Get all courses
  static async getCourses(page: number = 1, limit: number = 10): Promise<PaginatedResponse<Course>> {
    try {
      const response = await apiClient.get(API_ENDPOINTS.COURSES.LIST, {
        params: { page, limit }
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Search courses
  static async searchCourses(searchParams: CourseSearchRequest): Promise<ApiResponse<CourseSearchResponse>> {
    try {
      const response = await apiClient.get(API_ENDPOINTS.COURSES.LIST, {
        params: searchParams
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Get course details
  static async getCourseDetail(courseId: string): Promise<ApiResponse<CourseDetail>> {
    try {
      const response = await apiClient.get(API_ENDPOINTS.COURSES.DETAIL.replace(':id', courseId));
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Enroll in course
  static async enrollCourse(enrollmentData: EnrollCourseRequest): Promise<ApiResponse<EnrollCourseResponse>> {
    try {
      const response = await apiClient.post(
        API_ENDPOINTS.COURSES.ENROLL.replace(':id', enrollmentData.courseId),
        enrollmentData
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Get course progress
  static async getCourseProgress(courseId: string): Promise<ApiResponse<CourseProgress>> {
    try {
      const response = await apiClient.get(API_ENDPOINTS.COURSES.PROGRESS.replace(':id', courseId));
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Get course lessons
  static async getCourseLessons(courseId: string): Promise<ApiResponse<any[]>> {
    try {
      const response = await apiClient.get(API_ENDPOINTS.COURSES.LESSONS.replace(':id', courseId));
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Complete lesson
  static async completeLesson(completionData: CompleteLessonRequest): Promise<ApiResponse<CompleteLessonResponse>> {
    try {
      const response = await apiClient.post(
        API_ENDPOINTS.COURSES.COMPLETE_LESSON
          .replace(':id', completionData.courseId)
          .replace(':lessonId', completionData.lessonId),
        completionData
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Submit course review
  static async submitReview(reviewData: CourseReviewRequest): Promise<ApiResponse<CourseReviewResponse>> {
    try {
      const response = await apiClient.post(
        API_ENDPOINTS.COURSES.REVIEW.replace(':id', reviewData.courseId),
        reviewData
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Bookmark/unbookmark course
  static async bookmarkCourse(bookmarkData: BookmarkCourseRequest): Promise<ApiResponse<BookmarkCourseResponse>> {
    try {
      const response = await apiClient.post(
        API_ENDPOINTS.COURSES.BOOKMARK.replace(':id', bookmarkData.courseId),
        bookmarkData
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Get course analytics (for instructors)
  static async getCourseAnalytics(courseId: string): Promise<ApiResponse<CourseAnalytics>> {
    try {
      const response = await apiClient.get(`/courses/${courseId}/analytics`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Get user's enrolled courses
  static async getEnrolledCourses(): Promise<ApiResponse<Course[]>> {
    try {
      const response = await apiClient.get('/courses/enrolled');
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Get user's completed courses
  static async getCompletedCourses(): Promise<ApiResponse<Course[]>> {
    try {
      const response = await apiClient.get('/courses/completed');
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Get user's bookmarked courses
  static async getBookmarkedCourses(): Promise<ApiResponse<Course[]>> {
    try {
      const response = await apiClient.get('/courses/bookmarked');
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Get course categories
  static async getCategories(): Promise<ApiResponse<any[]>> {
    try {
      const response = await apiClient.get('/courses/categories');
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Get featured courses
  static async getFeaturedCourses(): Promise<ApiResponse<Course[]>> {
    try {
      const response = await apiClient.get('/courses/featured');
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Get trending courses
  static async getTrendingCourses(): Promise<ApiResponse<Course[]>> {
    try {
      const response = await apiClient.get('/courses/trending');
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Get recommended courses
  static async getRecommendedCourses(): Promise<ApiResponse<Course[]>> {
    try {
      const response = await apiClient.get('/courses/recommended');
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

export default CourseService;
