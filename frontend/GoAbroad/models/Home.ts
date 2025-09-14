// src/models/Home.ts
export interface User {
  id: string;
  name: string;
  profilePic: string;
}

export interface CarouselItem {
  id: string;
  title: string;
  image: string;
}

export interface Course {
  id: string;
  title: string;
  students: number;
  price: number;
}

export interface News {
  id: string;
  title: string;
  image: string;
}

export interface Blog {
  id: string;
  title: string;
  excerpt: string;
}

export interface HomeResponse {
  user: User;
  carousel: CarouselItem[];
  courses: Course[];
  news: News[];
  blogs: Blog[];
}
