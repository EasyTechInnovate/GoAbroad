import { UserProfile } from "@/models/UserProfile";

export const fetchUserProfile = async (): Promise<UserProfile> => {
  return {
    id: "1",
    name: "John Doe",
    email: "john.doe@example.com",
    avatar: "https://randomuser.me/api/portraits/men/1.jpg",
    followers: 1250,
    following: 340,
  };
};