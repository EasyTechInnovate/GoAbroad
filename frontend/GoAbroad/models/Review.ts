// Review Models for GoAbroad App
// These models define the data structures for review-related features

export interface Review {
  id: string;
  userId: string;
  userName: string;
  userImage?: string;
  itemId: string;
  itemType: 'course' | 'university' | 'news' | 'blog';
  itemName: string;
  rating: number;
  title?: string;
  comment: string;
  pros?: string[];
  cons?: string[];
  helpfulCount: number;
  isHelpful?: boolean;
  isVerified: boolean;
  isEdited: boolean;
  editedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CourseReview extends Review {
  itemType: 'course';
  courseId: string;
  courseName: string;
  instructorResponse?: InstructorResponse;
  helpfulVotes: HelpfulVote[];
}

export interface UniversityReview extends Review {
  itemType: 'university';
  universityId: string;
  universityName: string;
  program: string;
  graduationYear?: number;
  pros: string[];
  cons: string[];
  helpfulVotes: HelpfulVote[];
}

export interface NewsReview extends Review {
  itemType: 'news';
  newsId: string;
  newsTitle: string;
  helpfulVotes: HelpfulVote[];
}

export interface BlogReview extends Review {
  itemType: 'blog';
  blogId: string;
  blogTitle: string;
  helpfulVotes: HelpfulVote[];
}

export interface InstructorResponse {
  id: string;
  instructorId: string;
  instructorName: string;
  instructorImage?: string;
  response: string;
  createdAt: string;
}

export interface HelpfulVote {
  id: string;
  userId: string;
  userName: string;
  isHelpful: boolean;
  createdAt: string;
}

export interface ReviewStats {
  totalReviews: number;
  averageRating: number;
  ratingDistribution: {
    1: number;
    2: number;
    3: number;
    4: number;
    5: number;
  };
  helpfulReviews: number;
  verifiedReviews: number;
  recentReviews: Review[];
}

// API Request/Response Types
export interface ReviewListRequest {
  itemId: string;
  itemType: 'course' | 'university' | 'news' | 'blog';
  rating?: number;
  sortBy?: 'recent' | 'helpful' | 'rating' | 'verified';
  sortOrder?: 'asc' | 'desc';
  page?: number;
  limit?: number;
}

export interface ReviewListResponse {
  reviews: Review[];
  stats: ReviewStats;
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

export interface CreateReviewRequest {
  itemId: string;
  itemType: 'course' | 'university' | 'news' | 'blog';
  rating: number;
  title?: string;
  comment: string;
  pros?: string[];
  cons?: string[];
}

export interface CreateReviewResponse {
  review: Review;
  message: string;
}

export interface UpdateReviewRequest {
  reviewId: string;
  rating?: number;
  title?: string;
  comment?: string;
  pros?: string[];
  cons?: string[];
}

export interface UpdateReviewResponse {
  review: Review;
  message: string;
}

export interface DeleteReviewRequest {
  reviewId: string;
}

export interface DeleteReviewResponse {
  message: string;
}

export interface VoteHelpfulRequest {
  reviewId: string;
  isHelpful: boolean;
}

export interface VoteHelpfulResponse {
  helpfulCount: number;
  isHelpful: boolean;
  message: string;
}

export interface ReportReviewRequest {
  reviewId: string;
  reason: 'inappropriate' | 'spam' | 'fake' | 'offensive' | 'other';
  description?: string;
}

export interface ReportReviewResponse {
  message: string;
}

export interface ReviewAnalytics {
  totalReviews: number;
  averageRating: number;
  ratingTrends: {
    month: string;
    averageRating: number;
    reviewCount: number;
  }[];
  helpfulRate: number;
  responseRate: number;
  topReviewers: {
    userId: string;
    userName: string;
    reviewCount: number;
    averageRating: number;
  }[];
}
