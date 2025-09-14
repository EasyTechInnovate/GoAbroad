import { UserProfile } from "../models/UserProfile";

export const getUserProfile = async (): Promise<UserProfile> => {
  // Later replace with: await fetch("https://yourapi.com/user/profile").then(res => res.json())
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: "1",
        name: "Mukul Parmar",
        email: "mukulparmar470@gmail.com",
        avatar: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
        followers: 6300,
        following: 2500,
      });
    }, 1000); // simulate network delay
  });
};
