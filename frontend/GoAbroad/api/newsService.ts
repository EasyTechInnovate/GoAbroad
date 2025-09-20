// News API Service
// This service handles all news-related API calls

import apiClient, { API_ENDPOINTS, ApiResponse, PaginatedResponse } from './apiClient';
import { 
  News,
  NewsDetail,
  NewsSearchRequest,
  NewsSearchResponse,
  BookmarkNewsRequest,
  BookmarkNewsResponse,
  LikeNewsRequest,
  LikeNewsResponse,
  NewsCommentRequest,
  NewsCommentResponse,
  NewsAnalytics
} from '@/models/News';

export class NewsService {
  // Get all news
  static async getNews(page: number = 1, limit: number = 10): Promise<PaginatedResponse<News>> {
    try {
      const response = await apiClient.get(API_ENDPOINTS.NEWS.LIST, {
        params: { page, limit }
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Search news
  static async searchNews(searchParams: NewsSearchRequest): Promise<ApiResponse<NewsSearchResponse>> {
    try {
      const response = await apiClient.get(API_ENDPOINTS.NEWS.LIST, {
        params: searchParams
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Get news details
  static async getNewsDetail(newsId: string): Promise<ApiResponse<NewsDetail>> {
    try {
      const response = await apiClient.get(API_ENDPOINTS.NEWS.DETAIL.replace(':id', newsId));
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Bookmark/unbookmark news
  static async bookmarkNews(bookmarkData: BookmarkNewsRequest): Promise<ApiResponse<BookmarkNewsResponse>> {
    try {
      const response = await apiClient.post(
        API_ENDPOINTS.NEWS.BOOKMARK.replace(':id', bookmarkData.newsId),
        bookmarkData
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Like/unlike news
  static async likeNews(likeData: LikeNewsRequest): Promise<ApiResponse<LikeNewsResponse>> {
    try {
      const response = await apiClient.post(`/news/${likeData.newsId}/like`, likeData);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Add comment to news
  static async addComment(commentData: NewsCommentRequest): Promise<ApiResponse<NewsCommentResponse>> {
    try {
      const response = await apiClient.post(`/news/${commentData.newsId}/comments`, commentData);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Get news comments
  static async getNewsComments(newsId: string, page: number = 1, limit: number = 20): Promise<PaginatedResponse<any>> {
    try {
      const response = await apiClient.get(`/news/${newsId}/comments`, {
        params: { page, limit }
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Get news categories
  static async getNewsCategories(): Promise<ApiResponse<any[]>> {
    try {
      const response = await apiClient.get(API_ENDPOINTS.NEWS.CATEGORIES);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Get featured news
  static async getFeaturedNews(): Promise<ApiResponse<News[]>> {
    try {
      const response = await apiClient.get('/news/featured');
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Get trending news
  static async getTrendingNews(): Promise<ApiResponse<News[]>> {
    try {
      const response = await apiClient.get('/news/trending');
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Get news by category
  static async getNewsByCategory(category: string, page: number = 1, limit: number = 10): Promise<PaginatedResponse<News>> {
    try {
      const response = await apiClient.get('/news/by-category', {
        params: { category, page, limit }
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Get news by author
  static async getNewsByAuthor(authorId: string, page: number = 1, limit: number = 10): Promise<PaginatedResponse<News>> {
    try {
      const response = await apiClient.get('/news/by-author', {
        params: { authorId, page, limit }
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Get user's bookmarked news
  static async getBookmarkedNews(): Promise<ApiResponse<News[]>> {
    try {
      const response = await apiClient.get('/news/bookmarked');
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Get news analytics
  static async getNewsAnalytics(newsId: string): Promise<ApiResponse<NewsAnalytics>> {
    try {
      const response = await apiClient.get(`/news/${newsId}/analytics`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Share news
  static async shareNews(newsId: string, platform: string): Promise<ApiResponse<{ message: string; shareUrl: string }>> {
    try {
      const response = await apiClient.post(`/news/${newsId}/share`, { platform });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Get related news
  static async getRelatedNews(newsId: string): Promise<ApiResponse<News[]>> {
    try {
      const response = await apiClient.get(`/news/${newsId}/related`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

export default NewsService;
