// News Models for GoAbroad App
// These models define the data structures for news-related features

export interface News {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  subcategory?: string;
  image: string;
  images?: string[];
  author: string;
  authorId: string;
  authorImage?: string;
  publishedAt: string;
  readTime: string;
  views: number;
  likes: number;
  shares: number;
  comments: number;
  tags: string[];
  isBookmarked: boolean;
  isLiked: boolean;
  isPublished: boolean;
  featured: boolean;
  trending: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface NewsDetail extends News {
  relatedNews: News[];
  comments: NewsComment[];
  author: NewsAuthor;
}

export interface NewsAuthor {
  id: string;
  name: string;
  bio: string;
  image: string;
  title: string;
  socialLinks?: {
    twitter?: string;
    linkedin?: string;
    website?: string;
  };
}

export interface NewsComment {
  id: string;
  userId: string;
  userName: string;
  userImage?: string;
  comment: string;
  likes: number;
  replies: NewsComment[];
  isLiked: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface NewsCategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
  color?: string;
  icon?: string;
  newsCount: number;
}

// API Request/Response Types
export interface NewsSearchRequest {
  query?: string;
  category?: string;
  author?: string;
  tags?: string[];
  dateRange?: {
    start: string;
    end: string;
  };
  featured?: boolean;
  trending?: boolean;
  sortBy?: 'relevance' | 'date' | 'views' | 'likes';
  sortOrder?: 'asc' | 'desc';
  page?: number;
  limit?: number;
}

export interface NewsSearchResponse {
  news: News[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
  categories: NewsCategory[];
  trendingTags: string[];
}

export interface BookmarkNewsRequest {
  newsId: string;
  isBookmarked: boolean;
}

export interface BookmarkNewsResponse {
  isBookmarked: boolean;
  message: string;
}

export interface LikeNewsRequest {
  newsId: string;
  isLiked: boolean;
}

export interface LikeNewsResponse {
  isLiked: boolean;
  likesCount: number;
  message: string;
}

export interface NewsCommentRequest {
  newsId: string;
  comment: string;
  parentId?: string;
}

export interface NewsCommentResponse {
  comment: NewsComment;
  message: string;
}

export interface NewsAnalytics {
  newsId: string;
  totalViews: number;
  totalLikes: number;
  totalShares: number;
  totalComments: number;
  readTime: number;
  bounceRate: number;
  sourceTraffic: {
    direct: number;
    social: number;
    search: number;
    referral: number;
  };
}