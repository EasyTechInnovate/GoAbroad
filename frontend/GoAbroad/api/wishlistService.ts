// Wishlist API Service
// This service handles all wishlist-related API calls

import apiClient, { API_ENDPOINTS, ApiResponse, PaginatedResponse } from './apiClient';
import { 
  WishlistItem,
  WishlistStats,
  WishlistListRequest,
  WishlistListResponse,
  AddToWishlistRequest,
  AddToWishlistResponse,
  RemoveFromWishlistRequest,
  RemoveFromWishlistResponse,
  UpdateWishlistItemRequest,
  UpdateWishlistItemResponse,
  ClearWishlistRequest,
  ClearWishlistResponse,
  WishlistAnalytics
} from '@/models/Wishlist';

export class WishlistService {
  // Get wishlist items
  static async getWishlistItems(params: WishlistListRequest): Promise<ApiResponse<WishlistListResponse>> {
    try {
      const response = await apiClient.get('/wishlist', {
        params
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Add item to wishlist
  static async addToWishlist(data: AddToWishlistRequest): Promise<ApiResponse<AddToWishlistResponse>> {
    try {
      const response = await apiClient.post('/wishlist/add', data);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Remove item from wishlist
  static async removeFromWishlist(data: RemoveFromWishlistRequest): Promise<ApiResponse<RemoveFromWishlistResponse>> {
    try {
      const response = await apiClient.delete('/wishlist/remove', {
        data
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Update wishlist item
  static async updateWishlistItem(data: UpdateWishlistItemRequest): Promise<ApiResponse<UpdateWishlistItemResponse>> {
    try {
      const response = await apiClient.put('/wishlist/update', data);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Clear wishlist
  static async clearWishlist(data?: ClearWishlistRequest): Promise<ApiResponse<ClearWishlistResponse>> {
    try {
      const response = await apiClient.post('/wishlist/clear', data || {});
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Get wishlist stats
  static async getWishlistStats(): Promise<ApiResponse<WishlistStats>> {
    try {
      const response = await apiClient.get('/wishlist/stats');
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Check if item is in wishlist
  static async checkWishlistStatus(itemId: string, itemType: string): Promise<ApiResponse<{ isInWishlist: boolean }>> {
    try {
      const response = await apiClient.get('/wishlist/check', {
        params: { itemId, itemType }
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Get wishlist by type
  static async getWishlistByType(itemType: string, page: number = 1, limit: number = 20): Promise<PaginatedResponse<WishlistItem>> {
    try {
      const response = await apiClient.get('/wishlist/by-type', {
        params: { itemType, page, limit }
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Get recently added items
  static async getRecentlyAddedItems(limit: number = 10): Promise<ApiResponse<WishlistItem[]>> {
    try {
      const response = await apiClient.get('/wishlist/recently-added', {
        params: { limit }
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Get wishlist analytics
  static async getWishlistAnalytics(): Promise<ApiResponse<WishlistAnalytics>> {
    try {
      const response = await apiClient.get('/wishlist/analytics');
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Export wishlist
  static async exportWishlist(format: 'pdf' | 'csv' | 'json' = 'pdf'): Promise<ApiResponse<{ downloadUrl: string }>> {
    try {
      const response = await apiClient.post('/wishlist/export', { format });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Share wishlist
  static async shareWishlist(shareData: { email?: string; message?: string }): Promise<ApiResponse<{ shareUrl: string }>> {
    try {
      const response = await apiClient.post('/wishlist/share', shareData);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Get public wishlist
  static async getPublicWishlist(userId: string): Promise<ApiResponse<WishlistItem[]>> {
    try {
      const response = await apiClient.get(`/wishlist/public/${userId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Make wishlist public/private
  static async updateWishlistVisibility(isPublic: boolean): Promise<ApiResponse<{ message: string }>> {
    try {
      const response = await apiClient.put('/wishlist/visibility', { isPublic });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Get wishlist recommendations
  static async getWishlistRecommendations(): Promise<ApiResponse<any[]>> {
    try {
      const response = await apiClient.get('/wishlist/recommendations');
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Bulk add to wishlist
  static async bulkAddToWishlist(items: AddToWishlistRequest[]): Promise<ApiResponse<{ added: number; failed: number }>> {
    try {
      const response = await apiClient.post('/wishlist/bulk-add', { items });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Bulk remove from wishlist
  static async bulkRemoveFromWishlist(items: RemoveFromWishlistRequest[]): Promise<ApiResponse<{ removed: number; failed: number }>> {
    try {
      const response = await apiClient.post('/wishlist/bulk-remove', { items });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

export default WishlistService;
