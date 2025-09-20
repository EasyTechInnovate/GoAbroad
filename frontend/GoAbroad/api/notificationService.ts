// Notification API Service
// This service handles all notification-related API calls

import apiClient, { API_ENDPOINTS, ApiResponse, PaginatedResponse } from './apiClient';
import { 
  Notification,
  NotificationSettings,
  NotificationStats,
  NotificationListRequest,
  NotificationListResponse,
  MarkNotificationReadRequest,
  MarkNotificationReadResponse,
  MarkAllNotificationsReadResponse,
  DeleteNotificationRequest,
  DeleteNotificationResponse,
  ClearAllNotificationsResponse,
  UpdateNotificationSettingsRequest,
  UpdateNotificationSettingsResponse,
  SendNotificationRequest,
  SendNotificationResponse,
  NotificationAnalytics
} from '@/models/Notification';

export class NotificationService {
  // Get notifications
  static async getNotifications(params: NotificationListRequest): Promise<ApiResponse<NotificationListResponse>> {
    try {
      const response = await apiClient.get(API_ENDPOINTS.NOTIFICATIONS.LIST, {
        params
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Mark notification as read
  static async markNotificationRead(data: MarkNotificationReadRequest): Promise<ApiResponse<MarkNotificationReadResponse>> {
    try {
      const response = await apiClient.post(
        API_ENDPOINTS.NOTIFICATIONS.MARK_READ.replace(':id', data.notificationId)
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Mark all notifications as read
  static async markAllNotificationsRead(): Promise<ApiResponse<MarkAllNotificationsReadResponse>> {
    try {
      const response = await apiClient.post(API_ENDPOINTS.NOTIFICATIONS.MARK_ALL_READ);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Delete notification
  static async deleteNotification(data: DeleteNotificationRequest): Promise<ApiResponse<DeleteNotificationResponse>> {
    try {
      const response = await apiClient.delete(
        API_ENDPOINTS.NOTIFICATIONS.DELETE.replace(':id', data.notificationId)
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Clear all notifications
  static async clearAllNotifications(): Promise<ApiResponse<ClearAllNotificationsResponse>> {
    try {
      const response = await apiClient.post(API_ENDPOINTS.NOTIFICATIONS.CLEAR_ALL);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Get notification settings
  static async getNotificationSettings(): Promise<ApiResponse<NotificationSettings>> {
    try {
      const response = await apiClient.get(API_ENDPOINTS.NOTIFICATIONS.SETTINGS);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Update notification settings
  static async updateNotificationSettings(data: UpdateNotificationSettingsRequest): Promise<ApiResponse<UpdateNotificationSettingsResponse>> {
    try {
      const response = await apiClient.put(API_ENDPOINTS.NOTIFICATIONS.SETTINGS, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Send notification (admin only)
  static async sendNotification(data: SendNotificationRequest): Promise<ApiResponse<SendNotificationResponse>> {
    try {
      const response = await apiClient.post('/notifications/send', data);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Get notification stats
  static async getNotificationStats(): Promise<ApiResponse<NotificationStats>> {
    try {
      const response = await apiClient.get('/notifications/stats');
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Get notification analytics
  static async getNotificationAnalytics(): Promise<ApiResponse<NotificationAnalytics>> {
    try {
      const response = await apiClient.get('/notifications/analytics');
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Subscribe to push notifications
  static async subscribeToPushNotifications(token: string): Promise<ApiResponse<{ message: string }>> {
    try {
      const response = await apiClient.post('/notifications/subscribe', { token });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Unsubscribe from push notifications
  static async unsubscribeFromPushNotifications(): Promise<ApiResponse<{ message: string }>> {
    try {
      const response = await apiClient.post('/notifications/unsubscribe');
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Get unread count
  static async getUnreadCount(): Promise<ApiResponse<{ count: number }>> {
    try {
      const response = await apiClient.get('/notifications/unread-count');
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Get notification preferences
  static async getNotificationPreferences(): Promise<ApiResponse<any>> {
    try {
      const response = await apiClient.get('/notifications/preferences');
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Update notification preferences
  static async updateNotificationPreferences(preferences: any): Promise<ApiResponse<{ message: string }>> {
    try {
      const response = await apiClient.put('/notifications/preferences', preferences);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

export default NotificationService;
