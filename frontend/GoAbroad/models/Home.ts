// src/models/Home.ts
import { Course } from "./Course";
import { News } from "./News";
import { Blog } from "./Blog";

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

export interface HomeResponse {
  user: User;
  carousel: CarouselItem[];
  courses: Course[];
  news: News[];
  blogs: Blog[];
}
