// Blog Models for GoAbroad App
// These models define the data structures for blog-related features

export interface Blog {
  id: string;
  title: string;
  description: string;
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

export interface BlogDetail extends Blog {
  relatedBlogs: Blog[];
  comments: BlogComment[];
  author: BlogAuthor;
}

export interface BlogAuthor {
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

export interface BlogComment {
  id: string;
  userId: string;
  userName: string;
  userImage?: string;
  comment: string;
  likes: number;
  replies: BlogComment[];
  isLiked: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface BlogCategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
  color?: string;
  icon?: string;
  blogCount: number;
}

// API Request/Response Types
export interface BlogSearchRequest {
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

export interface BlogSearchResponse {
  blogs: Blog[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
  categories: BlogCategory[];
  trendingTags: string[];
}

export interface BookmarkBlogRequest {
  blogId: string;
  isBookmarked: boolean;
}

export interface BookmarkBlogResponse {
  isBookmarked: boolean;
  message: string;
}

export interface LikeBlogRequest {
  blogId: string;
  isLiked: boolean;
}

export interface LikeBlogResponse {
  isLiked: boolean;
  likesCount: number;
  message: string;
}

export interface BlogCommentRequest {
  blogId: string;
  comment: string;
  parentId?: string;
}

export interface BlogCommentResponse {
  comment: BlogComment;
  message: string;
}

export interface BlogAnalytics {
  blogId: string;
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