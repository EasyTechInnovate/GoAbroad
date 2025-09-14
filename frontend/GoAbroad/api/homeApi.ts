// src/api/homeApi.ts
import { HomeResponse } from "@/models/Home";

export const fetchHomeData = async (): Promise<HomeResponse> => {
  return {
    user: {
      id: "1",
      name: "John Doe",
      profilePic: "https://randomuser.me/api/portraits/men/1.jpg",
    },
    carousel: [
      { id: "1", title: "Personalized Counseling", image: "https://picsum.photos/400/200" },
      { id: "2", title: "Study Abroad", image: "https://picsum.photos/400/201" },
    ],
    courses: [
      { id: "1", title: "IELTS Preparation", students: 2500, price: 199 },
      { id: "2", title: "University Application", students: 1200, price: 99 },
    ],
    news: [
      { id: "1", title: "Top Universities 2025", image: "https://picsum.photos/300/200" },
      { id: "2", title: "New Visa Policies", image: "https://picsum.photos/301/200" },
    ],
    blogs: [
      { id: "1", title: "10 Tips for Writing SOP", excerpt: "Learn how to write SOP easily." },
      { id: "2", title: "Student Life in UK", excerpt: "A complete student guide." },
    ],
  };
};
