// Wishlist Models for GoAbroad App
// These models define the data structures for wishlist-related features

export interface WishlistItem {
  id: string;
  userId: string;
  itemId: string;
  itemType: 'course' | 'university' | 'news' | 'blog';
  item: WishlistCourse | WishlistUniversity | WishlistNews | WishlistBlog;
  addedAt: string;
  notes?: string;
  priority?: 'low' | 'medium' | 'high';
  tags?: string[];
}

export interface WishlistCourse {
  id: string;
  title: string;
  category: string;
  instructor: string;
  students: number;
  rating: number;
  reviewCount: number;
  price: number;
  duration: string;
  level: string;
  image: string;
  isEnrolled: boolean;
  isCompleted: boolean;
  progress?: number;
}

export interface WishlistUniversity {
  id: string;
  name: string;
  country: string;
  city: string;
  logo: string;
  ranking?: number;
  acceptanceRate?: number;
  tuitionFees: number;
  currency: string;
  programs: string[];
  isApplied: boolean;
}

export interface WishlistNews {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  image: string;
  publishedAt: string;
  readTime: string;
  views: number;
  likes: number;
}

export interface WishlistBlog {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  image: string;
  publishedAt: string;
  readTime: string;
  views: number;
  likes: number;
  tags: string[];
}

export interface WishlistStats {
  totalItems: number;
  byType: {
    courses: number;
    universities: number;
    news: number;
    blogs: number;
  };
  totalValue: number;
  currency: string;
  recentlyAdded: WishlistItem[];
}

// API Request/Response Types
export interface WishlistListRequest {
  itemType?: 'course' | 'university' | 'news' | 'blog';
  page?: number;
  limit?: number;
  sortBy?: 'added_at' | 'priority' | 'price' | 'rating';
  sortOrder?: 'asc' | 'desc';
}

export interface WishlistListResponse {
  items: WishlistItem[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
  stats: WishlistStats;
}

export interface AddToWishlistRequest {
  itemId: string;
  itemType: 'course' | 'university' | 'news' | 'blog';
  notes?: string;
  priority?: 'low' | 'medium' | 'high';
  tags?: string[];
}

export interface AddToWishlistResponse {
  item: WishlistItem;
  message: string;
}

export interface RemoveFromWishlistRequest {
  itemId: string;
  itemType: 'course' | 'university' | 'news' | 'blog';
}

export interface RemoveFromWishlistResponse {
  message: string;
}

export interface UpdateWishlistItemRequest {
  itemId: string;
  itemType: 'course' | 'university' | 'news' | 'blog';
  notes?: string;
  priority?: 'low' | 'medium' | 'high';
  tags?: string[];
}

export interface UpdateWishlistItemResponse {
  item: WishlistItem;
  message: string;
}

export interface ClearWishlistRequest {
  itemType?: 'course' | 'university' | 'news' | 'blog';
}

export interface ClearWishlistResponse {
  message: string;
  removedCount: number;
}

export interface WishlistAnalytics {
  totalUsers: number;
  totalItems: number;
  popularItems: {
    itemId: string;
    itemType: string;
    itemName: string;
    wishlistCount: number;
  }[];
  conversionRate: number;
  byType: {
    [key: string]: {
      total: number;
      conversions: number;
      conversionRate: number;
    };
  };
}
