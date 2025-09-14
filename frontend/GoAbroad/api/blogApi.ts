import { Blog } from "../models/Blog";

export const getBlogs = async (): Promise<Blog[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: "1",
          title: "10 Tips for Writing a Student Success Blog",
          description:
            "Learn the best practices to create engaging and informative blog posts for students...",
          author: "Mukul Parmar",
          timeAgo: "2 hours ago",
          image:
            "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=60",
          likes: 12,
          comments: 4,
        },
        {
          id: "2",
          title: "5 Study Hacks That Actually Work",
          description:
            "Discover practical and effective study hacks to improve focus and retention...",
          author: "Riya Sharma",
          timeAgo: "5 hours ago",
          image:
            "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&q=60",
          likes: 34,
          comments: 10,
        },
      ]);
    }, 1000); // simulate network delay
  });
};
