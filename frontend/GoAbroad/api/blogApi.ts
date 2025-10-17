import { Blog } from "@/models/Blog";

// Mock blog data
const mockBlogs: Blog[] = [
  {
    id: "1",
    title: "10 Tips for Writing a Standout Statement of Purpose",
    description: "Learn how to craft a compelling Statement of Purpose that will make your application stand out from thousands of others. Expert tips from counselors.",
    content: "A Statement of Purpose (SOP) is one of the most important documents in your graduate school application. It's your chance to tell your story, explain your motivations, and demonstrate why you're a perfect fit for the program. Here are 10 expert tips to help you write a standout SOP...",
    category: "Application Tips",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=200&fit=crop",
    author: "Dr. Sarah Johnson",
    authorId: "author1",
    publishedAt: "3 days ago",
    readTime: "5 min read",
    views: 1250,
    likes: 89,
    shares: 23,
    comments: 15,
    tags: ["SOP", "Application", "Graduate School", "Writing"],
    isBookmarked: false,
    isLiked: false,
    isPublished: true,
    featured: true,
    trending: true,
    createdAt: "2024-01-15T10:00:00Z",
    updatedAt: "2024-01-15T10:00:00Z",
  },
  {
    id: "2",
    title: "IELTS Preparation: Complete Guide for International Students",
    description: "Everything you need to know about IELTS preparation, from understanding the test format to effective study strategies and practice resources.",
    content: "The International English Language Testing System (IELTS) is a crucial requirement for international students. This comprehensive guide covers all aspects of IELTS preparation...",
    category: "IELTS",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=200&fit=crop",
    author: "Prof. Michael Chen",
    authorId: "author2",
    publishedAt: "1 week ago",
    readTime: "8 min read",
    views: 2100,
    likes: 156,
    shares: 45,
    comments: 28,
    tags: ["IELTS", "English", "Test Preparation", "Study Tips"],
    isBookmarked: true,
    isLiked: true,
    isPublished: true,
    featured: false,
    trending: true,
    createdAt: "2024-01-08T14:30:00Z",
    updatedAt: "2024-01-08T14:30:00Z",
  },
  {
    id: "3",
    title: "Scholarship Opportunities for 2024: Complete List",
    description: "Discover the latest scholarship opportunities available for international students in 2024. Updated list with application deadlines and requirements.",
    content: "Finding the right scholarship can significantly reduce the financial burden of studying abroad. Here's a comprehensive list of scholarship opportunities for 2024...",
    category: "Scholarships",
    image: "https://images.unsplash.com/photo-1523240798131-2b2b3b3b3b3b?w=400&h=200&fit=crop",
    author: "Dr. Emily Rodriguez",
    authorId: "author3",
    publishedAt: "2 weeks ago",
    readTime: "6 min read",
    views: 3200,
    likes: 234,
    shares: 67,
    comments: 42,
    tags: ["Scholarships", "Funding", "Financial Aid", "2024"],
    isBookmarked: false,
    isLiked: false,
    isPublished: true,
    featured: true,
    trending: false,
    createdAt: "2024-01-01T09:15:00Z",
    updatedAt: "2024-01-01T09:15:00Z",
  },
];

export const fetchBlogData = async (): Promise<Blog[]> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  return mockBlogs;
};

export const fetchBlogById = async (id: string): Promise<Blog | undefined> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockBlogs.find(blog => blog.id === id);
};

export const searchBlogs = async (query: string): Promise<Blog[]> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 800));
  return mockBlogs.filter(blog => 
    blog.title.toLowerCase().includes(query.toLowerCase()) ||
    blog.description.toLowerCase().includes(query.toLowerCase()) ||
    blog.category.toLowerCase().includes(query.toLowerCase())
  );
};