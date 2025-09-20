// Authentication API Service
// This service handles all authentication-related API calls

import apiClient, { API_ENDPOINTS, ApiResponse } from './apiClient';
import { 
  LoginRequest, 
  LoginResponse, 
  RegisterRequest, 
  RegisterResponse,
  ForgotPasswordRequest,
  ResetPasswordRequest,
  VerifyOTPRequest,
  UpdateProfileRequest,
  ChangePasswordRequest,
  UploadAvatarResponse,
  User,
  UserProfile
} from '@/models/User';

export class AuthService {
  // Login user
  static async login(credentials: LoginRequest): Promise<ApiResponse<LoginResponse>> {
    try {
      const response = await apiClient.post(API_ENDPOINTS.AUTH.LOGIN, credentials);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Register new user
  static async register(userData: RegisterRequest): Promise<ApiResponse<RegisterResponse>> {
    try {
      const response = await apiClient.post(API_ENDPOINTS.AUTH.REGISTER, userData);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Logout user
  static async logout(): Promise<ApiResponse<{ message: string }>> {
    try {
      const response = await apiClient.post(API_ENDPOINTS.AUTH.LOGOUT);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Refresh access token
  static async refreshToken(): Promise<ApiResponse<{ token: string; expiresIn: number }>> {
    try {
      const response = await apiClient.post(API_ENDPOINTS.AUTH.REFRESH_TOKEN);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Forgot password
  static async forgotPassword(data: ForgotPasswordRequest): Promise<ApiResponse<{ message: string }>> {
    try {
      const response = await apiClient.post(API_ENDPOINTS.AUTH.FORGOT_PASSWORD, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Reset password
  static async resetPassword(data: ResetPasswordRequest): Promise<ApiResponse<{ message: string }>> {
    try {
      const response = await apiClient.post(API_ENDPOINTS.AUTH.RESET_PASSWORD, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Verify OTP
  static async verifyOTP(data: VerifyOTPRequest): Promise<ApiResponse<{ message: string; verified: boolean }>> {
    try {
      const response = await apiClient.post(API_ENDPOINTS.AUTH.VERIFY_OTP, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Get user profile
  static async getProfile(): Promise<ApiResponse<UserProfile>> {
    try {
      const response = await apiClient.get(API_ENDPOINTS.USER.PROFILE);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Update user profile
  static async updateProfile(data: UpdateProfileRequest): Promise<ApiResponse<UserProfile>> {
    try {
      const response = await apiClient.put(API_ENDPOINTS.USER.UPDATE_PROFILE, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Upload avatar
  static async uploadAvatar(file: FormData): Promise<ApiResponse<UploadAvatarResponse>> {
    try {
      const response = await apiClient.post(API_ENDPOINTS.USER.UPLOAD_AVATAR, file, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Change password
  static async changePassword(data: ChangePasswordRequest): Promise<ApiResponse<{ message: string }>> {
    try {
      const response = await apiClient.post(API_ENDPOINTS.USER.CHANGE_PASSWORD, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Delete account
  static async deleteAccount(): Promise<ApiResponse<{ message: string }>> {
    try {
      const response = await apiClient.delete(API_ENDPOINTS.USER.DELETE_ACCOUNT);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

export default AuthService;
