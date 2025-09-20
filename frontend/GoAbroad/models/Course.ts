// Course Models for GoAbroad App
// These models define the data structures for course-related features

export interface Course {
  id: string;
  title: string;
  description: string;
  shortDescription?: string;
  category: string;
  subcategory?: string;
  instructor: string;
  instructorId: string;
  instructorImage?: string;
  students: number;
  rating: number;
  reviewCount: number;
  price: number;
  originalPrice?: number;
  duration: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  language: string;
  image: string;
  thumbnail?: string;
  videoPreview?: string;
  isBookmarked: boolean;
  isEnrolled: boolean;
  isCompleted: boolean;
  progress?: number;
  tags: string[];
  requirements: string[];
  whatYouWillLearn: string[];
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  status: 'draft' | 'published' | 'archived';
}

export interface CourseDetail extends Course {
  lessons: Lesson[];
  reviews: CourseReview[];
  instructor: CourseInstructor;
  curriculum: CourseCurriculum[];
  faqs: CourseFAQ[];
  relatedCourses: Course[];
  completionCertificate: boolean;
  lifetimeAccess: boolean;
  mobileAccess: boolean;
  assignments: boolean;
  certificateOfCompletion: boolean;
}

export interface Lesson {
  id: string;
  courseId: string;
  title: string;
  description?: string;
  duration: string;
  videoUrl?: string;
  videoId?: string;
  thumbnail?: string;
  isPreview: boolean;
  isCompleted: boolean;
  isLocked: boolean;
  order: number;
  resources?: LessonResource[];
  quiz?: LessonQuiz;
  createdAt: string;
}

export interface LessonResource {
  id: string;
  title: string;
  type: 'pdf' | 'doc' | 'ppt' | 'zip' | 'link';
  url: string;
  size?: number;
  downloadCount?: number;
}

export interface LessonQuiz {
  id: string;
  title: string;
  questions: QuizQuestion[];
  passingScore: number;
  timeLimit?: number;
  attempts: number;
  maxAttempts: number;
}

export interface QuizQuestion {
  id: string;
  question: string;
  type: 'multiple_choice' | 'true_false' | 'fill_blank';
  options?: string[];
  correctAnswer: string | string[];
  explanation?: string;
  points: number;
}

export interface CourseInstructor {
  id: string;
  name: string;
  title: string;
  bio: string;
  image: string;
  rating: number;
  studentsCount: number;
  coursesCount: number;
  experience: string;
  specializations: string[];
  socialLinks?: {
    linkedin?: string;
    twitter?: string;
    website?: string;
  };
}

export interface CourseCurriculum {
  id: string;
  title: string;
  description?: string;
  lessons: Lesson[];
  duration: string;
  order: number;
}

export interface CourseFAQ {
  id: string;
  question: string;
  answer: string;
  order: number;
}

export interface CourseReview {
  id: string;
  userId: string;
  userName: string;
  userImage?: string;
  rating: number;
  title?: string;
  comment: string;
  isVerified: boolean;
  helpfulCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface CourseProgress {
  courseId: string;
  userId: string;
  progress: number;
  completedLessons: number;
  totalLessons: number;
  timeSpent: number;
  lastAccessedAt: string;
  enrolledAt: string;
  completedAt?: string;
  certificateUrl?: string;
}

export interface CourseEnrollment {
  id: string;
  courseId: string;
  userId: string;
  enrolledAt: string;
  paymentId?: string;
  amount: number;
  status: 'active' | 'completed' | 'cancelled' | 'expired';
  expiresAt?: string;
}

// API Request/Response Types
export interface CourseSearchRequest {
  query?: string;
  category?: string;
  level?: string;
  priceRange?: {
    min: number;
    max: number;
  };
  rating?: number;
  duration?: string;
  instructor?: string;
  tags?: string[];
  sortBy?: 'relevance' | 'rating' | 'price' | 'newest' | 'popular';
  sortOrder?: 'asc' | 'desc';
  page?: number;
  limit?: number;
}

export interface CourseSearchResponse {
  courses: Course[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
  filters: {
    categories: string[];
    levels: string[];
    priceRanges: { min: number; max: number }[];
    instructors: string[];
    tags: string[];
  };
}

export interface EnrollCourseRequest {
  courseId: string;
  paymentMethod?: string;
  couponCode?: string;
}

export interface EnrollCourseResponse {
  enrollment: CourseEnrollment;
  paymentUrl?: string;
  message: string;
}

export interface CourseReviewRequest {
  courseId: string;
  rating: number;
  title?: string;
  comment: string;
}

export interface CourseReviewResponse {
  review: CourseReview;
  message: string;
}

export interface BookmarkCourseRequest {
  courseId: string;
  isBookmarked: boolean;
}

export interface BookmarkCourseResponse {
  isBookmarked: boolean;
  message: string;
}

export interface CompleteLessonRequest {
  courseId: string;
  lessonId: string;
  timeSpent?: number;
}

export interface CompleteLessonResponse {
  progress: CourseProgress;
  nextLesson?: Lesson;
  isCourseCompleted: boolean;
  certificateUrl?: string;
  message: string;
}

export interface CourseAnalytics {
  courseId: string;
  totalEnrollments: number;
  completionRate: number;
  averageRating: number;
  totalReviews: number;
  revenue: number;
  popularLessons: string[];
  studentFeedback: {
    positive: number;
    negative: number;
    suggestions: string[];
  };
}