// Blog API Service
// This service handles all blog-related API calls

import apiClient, { API_ENDPOINTS, ApiResponse, PaginatedResponse } from './apiClient';
import { 
  Blog,
  BlogDetail,
  BlogSearchRequest,
  BlogSearchResponse,
  BookmarkBlogRequest,
  BookmarkBlogResponse,
  LikeBlogRequest,
  LikeBlogResponse,
  BlogCommentRequest,
  BlogCommentResponse,
  BlogAnalytics
} from '@/models/Blog';

export class BlogService {
  // Get all blogs
  static async getBlogs(page: number = 1, limit: number = 10): Promise<PaginatedResponse<Blog>> {
    try {
      const response = await apiClient.get(API_ENDPOINTS.BLOGS.LIST, {
        params: { page, limit }
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Search blogs
  static async searchBlogs(searchParams: BlogSearchRequest): Promise<ApiResponse<BlogSearchResponse>> {
    try {
      const response = await apiClient.get(API_ENDPOINTS.BLOGS.LIST, {
        params: searchParams
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Get blog details
  static async getBlogDetail(blogId: string): Promise<ApiResponse<BlogDetail>> {
    try {
      const response = await apiClient.get(API_ENDPOINTS.BLOGS.DETAIL.replace(':id', blogId));
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Bookmark/unbookmark blog
  static async bookmarkBlog(bookmarkData: BookmarkBlogRequest): Promise<ApiResponse<BookmarkBlogResponse>> {
    try {
      const response = await apiClient.post(
        API_ENDPOINTS.BLOGS.BOOKMARK.replace(':id', bookmarkData.blogId),
        bookmarkData
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Like/unlike blog
  static async likeBlog(likeData: LikeBlogRequest): Promise<ApiResponse<LikeBlogResponse>> {
    try {
      const response = await apiClient.post(`/blogs/${likeData.blogId}/like`, likeData);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Add comment to blog
  static async addComment(commentData: BlogCommentRequest): Promise<ApiResponse<BlogCommentResponse>> {
    try {
      const response = await apiClient.post(`/blogs/${commentData.blogId}/comments`, commentData);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Get blog comments
  static async getBlogComments(blogId: string, page: number = 1, limit: number = 20): Promise<PaginatedResponse<any>> {
    try {
      const response = await apiClient.get(`/blogs/${blogId}/comments`, {
        params: { page, limit }
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Get blog categories
  static async getBlogCategories(): Promise<ApiResponse<any[]>> {
    try {
      const response = await apiClient.get(API_ENDPOINTS.BLOGS.CATEGORIES);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Get featured blogs
  static async getFeaturedBlogs(): Promise<ApiResponse<Blog[]>> {
    try {
      const response = await apiClient.get('/blogs/featured');
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Get trending blogs
  static async getTrendingBlogs(): Promise<ApiResponse<Blog[]>> {
    try {
      const response = await apiClient.get('/blogs/trending');
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Get blogs by category
  static async getBlogsByCategory(category: string, page: number = 1, limit: number = 10): Promise<PaginatedResponse<Blog>> {
    try {
      const response = await apiClient.get('/blogs/by-category', {
        params: { category, page, limit }
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Get blogs by author
  static async getBlogsByAuthor(authorId: string, page: number = 1, limit: number = 10): Promise<PaginatedResponse<Blog>> {
    try {
      const response = await apiClient.get('/blogs/by-author', {
        params: { authorId, page, limit }
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Get blogs by tag
  static async getBlogsByTag(tag: string, page: number = 1, limit: number = 10): Promise<PaginatedResponse<Blog>> {
    try {
      const response = await apiClient.get('/blogs/by-tag', {
        params: { tag, page, limit }
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Get user's bookmarked blogs
  static async getBookmarkedBlogs(): Promise<ApiResponse<Blog[]>> {
    try {
      const response = await apiClient.get('/blogs/bookmarked');
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Get blog analytics
  static async getBlogAnalytics(blogId: string): Promise<ApiResponse<BlogAnalytics>> {
    try {
      const response = await apiClient.get(`/blogs/${blogId}/analytics`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Share blog
  static async shareBlog(blogId: string, platform: string): Promise<ApiResponse<{ message: string; shareUrl: string }>> {
    try {
      const response = await apiClient.post(`/blogs/${blogId}/share`, { platform });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Get related blogs
  static async getRelatedBlogs(blogId: string): Promise<ApiResponse<Blog[]>> {
    try {
      const response = await apiClient.get(`/blogs/${blogId}/related`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Get popular tags
  static async getPopularTags(): Promise<ApiResponse<any[]>> {
    try {
      const response = await apiClient.get('/blogs/popular-tags');
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Get popular authors
  static async getPopularAuthors(): Promise<ApiResponse<any[]>> {
    try {
      const response = await apiClient.get('/blogs/popular-authors');
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

export default BlogService;
