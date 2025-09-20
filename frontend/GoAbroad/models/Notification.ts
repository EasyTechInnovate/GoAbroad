// Notification Models for GoAbroad App
// These models define the data structures for notification-related features

export interface Notification {
  id: string;
  userId: string;
  type: 'enrollment' | 'course_update' | 'lesson_completed' | 'course_completed' | 
        'friend_request' | 'friend_accepted' | 'message' | 'offer' | 'announcement' | 
        'review_response' | 'application_update' | 'scholarship' | 'general';
  title: string;
  message: string;
  data?: {
    courseId?: string;
    courseName?: string;
    userId?: string;
    userName?: string;
    universityId?: string;
    universityName?: string;
    applicationId?: string;
    offerId?: string;
    scholarshipId?: string;
    [key: string]: any;
  };
  image?: string;
  icon?: string;
  isRead: boolean;
  isImportant: boolean;
  actionUrl?: string;
  actionText?: string;
  expiresAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface NotificationSettings {
  userId: string;
  email: {
    enabled: boolean;
    courseUpdates: boolean;
    friendRequests: boolean;
    offers: boolean;
    announcements: boolean;
  };
  push: {
    enabled: boolean;
    courseUpdates: boolean;
    friendRequests: boolean;
    offers: boolean;
    announcements: boolean;
    quietHours: {
      enabled: boolean;
      start: string;
      end: string;
    };
  };
  sms: {
    enabled: boolean;
    importantOnly: boolean;
  };
  createdAt: string;
  updatedAt: string;
}

export interface NotificationStats {
  total: number;
  unread: number;
  byType: {
    [key: string]: number;
  };
  recentActivity: {
    date: string;
    count: number;
  }[];
}

// API Request/Response Types
export interface NotificationListRequest {
  type?: string;
  isRead?: boolean;
  isImportant?: boolean;
  page?: number;
  limit?: number;
}

export interface NotificationListResponse {
  notifications: Notification[];
  total: number;
  unreadCount: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

export interface MarkNotificationReadRequest {
  notificationId: string;
}

export interface MarkNotificationReadResponse {
  message: string;
}

export interface MarkAllNotificationsReadResponse {
  message: string;
  markedCount: number;
}

export interface DeleteNotificationRequest {
  notificationId: string;
}

export interface DeleteNotificationResponse {
  message: string;
}

export interface ClearAllNotificationsResponse {
  message: string;
  deletedCount: number;
}

export interface UpdateNotificationSettingsRequest {
  email?: {
    enabled?: boolean;
    courseUpdates?: boolean;
    friendRequests?: boolean;
    offers?: boolean;
    announcements?: boolean;
  };
  push?: {
    enabled?: boolean;
    courseUpdates?: boolean;
    friendRequests?: boolean;
    offers?: boolean;
    announcements?: boolean;
    quietHours?: {
      enabled?: boolean;
      start?: string;
      end?: string;
    };
  };
  sms?: {
    enabled?: boolean;
    importantOnly?: boolean;
  };
}

export interface UpdateNotificationSettingsResponse {
  settings: NotificationSettings;
  message: string;
}

export interface SendNotificationRequest {
  userId: string;
  type: string;
  title: string;
  message: string;
  data?: any;
  image?: string;
  actionUrl?: string;
  actionText?: string;
  isImportant?: boolean;
}

export interface SendNotificationResponse {
  notification: Notification;
  message: string;
}

export interface NotificationAnalytics {
  totalSent: number;
  totalRead: number;
  readRate: number;
  clickRate: number;
  byType: {
    [key: string]: {
      sent: number;
      read: number;
      clicked: number;
    };
  };
  byTime: {
    hour: number;
    count: number;
  }[];
}
