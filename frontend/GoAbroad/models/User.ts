// User Models for GoAbroad App
// These models define the data structures for user-related features

export interface User {
  id: string;
  name: string;
  email: string;
  username: string;
  profileImage?: string;
  phoneNumber?: string;
  dateOfBirth?: string;
  gender?: 'male' | 'female' | 'other';
  country?: string;
  city?: string;
  bio?: string;
  isVerified: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface UserProfile extends User {
  followers: number;
  following: number;
  coursesEnrolled: number;
  coursesCompleted: number;
  achievements: number;
  targetUniversities: string[];
  enrolledCourses: EnrolledCourse[];
  recentActivity: UserActivity[];
  socialLinks?: {
    linkedin?: string;
    twitter?: string;
    instagram?: string;
    github?: string;
  };
}

export interface EnrolledCourse {
  id: string;
  courseId: string;
  courseName: string;
  progress: number;
  completedLessons: number;
  totalLessons: number;
  enrolledAt: string;
  lastAccessedAt: string;
  isCompleted: boolean;
  certificateUrl?: string;
}

export interface UserActivity {
  id: string;
  type: 'course_enrolled' | 'course_completed' | 'lesson_completed' | 'review_posted' | 'user_followed' | 'bookmark_added';
  title: string;
  description: string;
  timestamp: string;
  metadata?: {
    courseId?: string;
    courseName?: string;
    userId?: string;
    userName?: string;
    rating?: number;
  };
}

export interface UserStats {
  totalCourses: number;
  completedCourses: number;
  ongoingCourses: number;
  totalStudyHours: number;
  certificatesEarned: number;
  reviewsWritten: number;
  bookmarksCount: number;
  friendsCount: number;
}

// API Request/Response Types
export interface LoginRequest {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface LoginResponse {
  user: User;
  token: string;
  refreshToken: string;
  expiresIn: number;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  phoneNumber?: string;
  country?: string;
  agreeToTerms: boolean;
}

export interface RegisterResponse {
  user: User;
  token: string;
  refreshToken: string;
  expiresIn: number;
  verificationRequired: boolean;
}

export interface UpdateProfileRequest {
  name?: string;
  bio?: string;
  phoneNumber?: string;
  country?: string;
  city?: string;
  dateOfBirth?: string;
  gender?: 'male' | 'female' | 'other';
  socialLinks?: {
    linkedin?: string;
    twitter?: string;
    instagram?: string;
    github?: string;
  };
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ResetPasswordRequest {
  token: string;
  password: string;
  confirmPassword: string;
}

export interface VerifyOTPRequest {
  email: string;
  otp: string;
}

export interface UploadAvatarResponse {
  avatarUrl: string;
  message: string;
}

// Social Features
export interface FollowUserRequest {
  userId: string;
}

export interface FollowUserResponse {
  isFollowing: boolean;
  followersCount: number;
  message: string;
}

export interface UserSearchRequest {
  query: string;
  university?: string;
  course?: string;
  country?: string;
  page?: number;
  limit?: number;
}

export interface UserSearchResponse {
  users: UserProfile[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

export interface MakeFriendsRequest {
  university: string;
  course?: string;
  interests?: string[];
  page?: number;
  limit?: number;
}

export interface MakeFriendsResponse {
  users: UserProfile[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
  university: string;
}
