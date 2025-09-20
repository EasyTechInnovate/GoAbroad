// Social API Service
// This service handles all social features like Make Friends, Follow/Unfollow, etc.

import apiClient, { API_ENDPOINTS, ApiResponse, PaginatedResponse } from './apiClient';
import { 
  UserProfile,
  UserSearchRequest,
  UserSearchResponse,
  MakeFriendsRequest,
  MakeFriendsResponse,
  FollowUserRequest,
  FollowUserResponse
} from '@/models/User';

export class SocialService {
  // Search users
  static async searchUsers(searchParams: UserSearchRequest): Promise<ApiResponse<UserSearchResponse>> {
    try {
      const response = await apiClient.get(API_ENDPOINTS.SOCIAL.SEARCH_USERS, {
        params: searchParams
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Get user profile
  static async getUserProfile(userId: string): Promise<ApiResponse<UserProfile>> {
    try {
      const response = await apiClient.get(API_ENDPOINTS.SOCIAL.USER_PROFILE.replace(':id', userId));
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Follow user
  static async followUser(followData: FollowUserRequest): Promise<ApiResponse<FollowUserResponse>> {
    try {
      const response = await apiClient.post(
        API_ENDPOINTS.SOCIAL.FOLLOW_USER.replace(':id', followData.userId)
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Unfollow user
  static async unfollowUser(userId: string): Promise<ApiResponse<FollowUserResponse>> {
    try {
      const response = await apiClient.delete(API_ENDPOINTS.SOCIAL.UNFOLLOW_USER.replace(':id', userId));
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Get user followers
  static async getUserFollowers(userId: string, page: number = 1, limit: number = 20): Promise<PaginatedResponse<UserProfile>> {
    try {
      const response = await apiClient.get(API_ENDPOINTS.SOCIAL.FOLLOWERS.replace(':id', userId), {
        params: { page, limit }
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Get user following
  static async getUserFollowing(userId: string, page: number = 1, limit: number = 20): Promise<PaginatedResponse<UserProfile>> {
    try {
      const response = await apiClient.get(API_ENDPOINTS.SOCIAL.FOLLOWING.replace(':id', userId), {
        params: { page, limit }
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Make friends (find users with similar interests)
  static async makeFriends(makeFriendsData: MakeFriendsRequest): Promise<ApiResponse<MakeFriendsResponse>> {
    try {
      const response = await apiClient.post(API_ENDPOINTS.SOCIAL.MAKE_FRIENDS, makeFriendsData);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Get suggested friends
  static async getSuggestedFriends(): Promise<ApiResponse<UserProfile[]>> {
    try {
      const response = await apiClient.get('/social/suggested-friends');
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Get mutual friends
  static async getMutualFriends(userId: string): Promise<ApiResponse<UserProfile[]>> {
    try {
      const response = await apiClient.get(`/social/users/${userId}/mutual-friends`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Get friends by university
  static async getFriendsByUniversity(university: string): Promise<ApiResponse<UserProfile[]>> {
    try {
      const response = await apiClient.get('/social/friends/by-university', {
        params: { university }
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Get friends by course
  static async getFriendsByCourse(course: string): Promise<ApiResponse<UserProfile[]>> {
    try {
      const response = await apiClient.get('/social/friends/by-course', {
        params: { course }
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Get friends by country
  static async getFriendsByCountry(country: string): Promise<ApiResponse<UserProfile[]>> {
    try {
      const response = await apiClient.get('/social/friends/by-country', {
        params: { country }
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Block user
  static async blockUser(userId: string): Promise<ApiResponse<{ message: string }>> {
    try {
      const response = await apiClient.post(`/social/users/${userId}/block`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Unblock user
  static async unblockUser(userId: string): Promise<ApiResponse<{ message: string }>> {
    try {
      const response = await apiClient.delete(`/social/users/${userId}/block`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Report user
  static async reportUser(userId: string, reason: string, description?: string): Promise<ApiResponse<{ message: string }>> {
    try {
      const response = await apiClient.post(`/social/users/${userId}/report`, {
        reason,
        description
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Get user activity feed
  static async getUserActivityFeed(page: number = 1, limit: number = 20): Promise<PaginatedResponse<any>> {
    try {
      const response = await apiClient.get('/social/activity-feed', {
        params: { page, limit }
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Get user's social stats
  static async getUserSocialStats(userId: string): Promise<ApiResponse<any>> {
    try {
      const response = await apiClient.get(`/social/users/${userId}/stats`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Update user interests
  static async updateUserInterests(interests: string[]): Promise<ApiResponse<{ message: string }>> {
    try {
      const response = await apiClient.put('/social/user/interests', { interests });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Get user interests
  static async getUserInterests(): Promise<ApiResponse<string[]>> {
    try {
      const response = await apiClient.get('/social/user/interests');
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

export default SocialService;
