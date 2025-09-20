// API Configuration and Base Setup
// This file contains the base API configuration for the GoAbroad app

import axios from 'axios';

// Base API Configuration
const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL || 'https://api.goabroad.com/v1';

// Create axios instance with default config
export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
apiClient.interceptors.request.use(
  (config) => {
    // Add auth token to requests
    // const token = AsyncStorage.getItem('authToken');
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle common errors
    if (error.response?.status === 401) {
      // Handle unauthorized access
      // AsyncStorage.removeItem('authToken');
      // router.replace('/auth');
    }
    return Promise.reject(error);
  }
);

// API Endpoints Configuration
export const API_ENDPOINTS = {
  // Authentication
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    REFRESH_TOKEN: '/auth/refresh',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',
    VERIFY_OTP: '/auth/verify-otp',
  },

  // User Management
  USER: {
    PROFILE: '/user/profile',
    UPDATE_PROFILE: '/user/profile',
    UPLOAD_AVATAR: '/user/avatar',
    CHANGE_PASSWORD: '/user/change-password',
    DELETE_ACCOUNT: '/user/delete',
  },

  // Courses
  COURSES: {
    LIST: '/courses',
    DETAIL: '/courses/:id',
    ENROLL: '/courses/:id/enroll',
    PROGRESS: '/courses/:id/progress',
    LESSONS: '/courses/:id/lessons',
    COMPLETE_LESSON: '/courses/:id/lessons/:lessonId/complete',
    REVIEW: '/courses/:id/review',
    BOOKMARK: '/courses/:id/bookmark',
  },

  // Universities
  UNIVERSITIES: {
    LIST: '/universities',
    DETAIL: '/universities/:id',
    SEARCH: '/universities/search',
    APPLICATIONS: '/universities/applications',
    REQUIREMENTS: '/universities/:id/requirements',
  },

  // News & Blogs
  NEWS: {
    LIST: '/news',
    DETAIL: '/news/:id',
    BOOKMARK: '/news/:id/bookmark',
    CATEGORIES: '/news/categories',
  },

  BLOGS: {
    LIST: '/blogs',
    DETAIL: '/blogs/:id',
    BOOKMARK: '/blogs/:id/bookmark',
    CATEGORIES: '/blogs/categories',
  },

  // Social Features
  SOCIAL: {
    SEARCH_USERS: '/social/users/search',
    USER_PROFILE: '/social/users/:id',
    FOLLOW_USER: '/social/users/:id/follow',
    UNFOLLOW_USER: '/social/users/:id/unfollow',
    FOLLOWERS: '/social/users/:id/followers',
    FOLLOWING: '/social/users/:id/following',
    MAKE_FRIENDS: '/social/make-friends',
  },

  // Notifications
  NOTIFICATIONS: {
    LIST: '/notifications',
    MARK_READ: '/notifications/:id/read',
    MARK_ALL_READ: '/notifications/read-all',
    DELETE: '/notifications/:id',
    CLEAR_ALL: '/notifications/clear-all',
    SETTINGS: '/notifications/settings',
  },

  // Wishlist
  WISHLIST: {
    LIST: '/wishlist',
    ADD: '/wishlist/add',
    REMOVE: '/wishlist/remove',
    CLEAR: '/wishlist/clear',
  },

  // Reviews
  REVIEWS: {
    LIST: '/reviews',
    CREATE: '/reviews',
    UPDATE: '/reviews/:id',
    DELETE: '/reviews/:id',
    COURSE_REVIEWS: '/courses/:id/reviews',
  },

  // Settings
  SETTINGS: {
    LANGUAGE: '/settings/language',
    NOTIFICATIONS: '/settings/notifications',
    PRIVACY: '/settings/privacy',
    THEME: '/settings/theme',
  },

  // Analytics & Tracking
  ANALYTICS: {
    COURSE_PROGRESS: '/analytics/course-progress',
    USER_ACTIVITY: '/analytics/user-activity',
    SEARCH_HISTORY: '/analytics/search-history',
  },
};

// API Response Types
export interface ApiResponse<T = any> {
  success: boolean;
  data: T;
  message?: string;
  errors?: string[];
}

export interface PaginatedResponse<T = any> {
  success: boolean;
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
  message?: string;
}

// Error Types
export interface ApiError {
  message: string;
  status: number;
  errors?: string[];
}

// Utility Functions
export const handleApiError = (error: any): ApiError => {
  if (error.response) {
    return {
      message: error.response.data?.message || 'An error occurred',
      status: error.response.status,
      errors: error.response.data?.errors,
    };
  } else if (error.request) {
    return {
      message: 'Network error. Please check your connection.',
      status: 0,
    };
  } else {
    return {
      message: error.message || 'An unexpected error occurred',
      status: 0,
    };
  }
};

// Export default API client
export default apiClient;