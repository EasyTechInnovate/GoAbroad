import React, { useState, useEffect } from "react";
import { 
  ScrollView, 
  StyleSheet, 
  View, 
  Text, 
  TouchableOpacity, 
  Image 
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";

// API Integration Comments for Make Friends Page
// TODO: Import API services when backend is ready
// import SocialService from '@/api/socialService';
// import { UserProfile, MakeFriendsRequest, MakeFriendsResponse } from '@/models/User';

interface UserProfile {
  id: string;
  name: string;
  username: string;
  profileImage: string;
  isFollowing: boolean;
  university: string;
  course?: string;
}

export default function MakeFriendsScreen() {
  const { university: selectedUniversity } = useLocalSearchParams();
  
  // Mock data - replace with API calls
  const mockUsers: UserProfile[] = [
    {
      id: "1",
      name: "Krish Mathur",
      username: "@kmathur",
      profileImage: "https://picsum.photos/100/100?random=19",
      isFollowing: false,
      university: "Massachusetts Institute of Technology",
      course: "Computer Science"
    },
    {
      id: "2",
      name: "Sarah Johnson",
      username: "@sarahj",
      profileImage: "https://picsum.photos/100/100?random=20",
      isFollowing: false,
      university: "Massachusetts Institute of Technology",
      course: "Engineering"
    },
    {
      id: "3",
      name: "Alex Chen",
      username: "@alexc",
      profileImage: "https://picsum.photos/100/100?random=21",
      isFollowing: true,
      university: "Massachusetts Institute of Technology",
      course: "Business"
    },
    {
      id: "4",
      name: "Emily Davis",
      username: "@emilyd",
      profileImage: "https://picsum.photos/100/100?random=22",
      isFollowing: false,
      university: "Massachusetts Institute of Technology",
      course: "Medicine"
    },
    {
      id: "5",
      name: "Michael Brown",
      username: "@michaelb",
      profileImage: "https://picsum.photos/100/100?random=23",
      isFollowing: false,
      university: "Massachusetts Institute of Technology",
      course: "Architecture"
    },
    {
      id: "6",
      name: "Lisa Wilson",
      username: "@lisaw",
      profileImage: "https://picsum.photos/100/100?random=24",
      isFollowing: true,
      university: "Massachusetts Institute of Technology",
      course: "Design"
    }
  ];

  const [users, setUsers] = useState<UserProfile[]>(mockUsers);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  // API Integration Comments for Make Friends Page
  // TODO: Replace with actual API calls when backend is ready
  // useEffect(() => {
  //   loadUsers();
  // }, [selectedUniversity]);

  // const loadUsers = async () => {
  //   try {
  //     setLoading(true);
  //     const response = await SocialService.makeFriends({
  //       university: selectedUniversity as string,
  //       page: page,
  //       limit: 20
  //     });
  //     
  //     if (response.success) {
  //       if (page === 1) {
  //         setUsers(response.data.users);
  //       } else {
  //         setUsers(prev => [...prev, ...response.data.users]);
  //       }
  //       setHasMore(response.data.hasMore);
  //     }
  //   } catch (error) {
  //     console.error('Error loading users:', error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const handleFollowToggle = async (userId: string) => {
    // API Integration Comments for Make Friends Page
    // TODO: Implement follow/unfollow API call when backend is ready
    // try {
    //   const user = users.find(u => u.id === userId);
    //   if (user) {
    //     const response = user.isFollowing 
    //       ? await SocialService.unfollowUser(userId)
    //       : await SocialService.followUser({ userId });
    //     
    //     if (response.success) {
    //       setUsers(prev => 
    //         prev.map(u => 
    //           u.id === userId 
    //             ? { ...u, isFollowing: !u.isFollowing }
    //             : u
    //         )
    //       );
    //     }
    //   }
    // } catch (error) {
    //   console.error('Error toggling follow:', error);
    // }

    // Mock implementation - replace with API call
    setUsers(prev => 
      prev.map(user => 
        user.id === userId 
          ? { ...user, isFollowing: !user.isFollowing }
          : user
      )
    );
  };

  const handleProfilePress = (user: UserProfile) => {
    router.push({
      pathname: "/student-profile",
      params: { 
        userId: user.id,
        name: user.name,
        username: user.username,
        university: user.university
      }
    });
  };

  const handleLoadMore = () => {
    // Simulate loading more users
    console.log("Loading more users...");
  };

  return (
    <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Users List */}
        <View style={styles.usersContainer}>
          {users.map((user) => (
            <TouchableOpacity 
              key={user.id}
              style={styles.userCard}
              onPress={() => handleProfilePress(user)}
            >
              <View style={styles.userInfo}>
                <Image source={{ uri: user.profileImage }} style={styles.profileImage} />
                <View style={styles.userDetails}>
                  <Text style={styles.userName}>{user.name}</Text>
                  <Text style={styles.userUsername}>{user.username}</Text>
                  {user.course && (
                    <Text style={styles.userCourse}>{user.course}</Text>
                  )}
                </View>
              </View>
              
              <TouchableOpacity 
                style={[
                  styles.followButton,
                  user.isFollowing && styles.followingButton
                ]}
                onPress={() => handleFollowToggle(user.id)}
              >
                <Text style={[
                  styles.followButtonText,
                  user.isFollowing && styles.followingButtonText
                ]}>
                  {user.isFollowing ? "Following" : "Follow"}
                </Text>
              </TouchableOpacity>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
  usersContainer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  userCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 16,
  },
  userDetails: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#2C3E50",
    marginBottom: 2,
  },
  userUsername: {
    fontSize: 14,
    color: "#7F8C8D",
    marginBottom: 2,
  },
  userCourse: {
    fontSize: 12,
    color: "#0D5543",
    fontWeight: "500",
  },
  followButton: {
    backgroundColor: "#0D5543",
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
  },
  followingButton: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#0D5543",
  },
  followButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  followingButtonText: {
    color: "#0D5543",
  },
});
