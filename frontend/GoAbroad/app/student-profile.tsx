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

// API Integration Comments for Student Profile Page
// TODO: Import API services when backend is ready
// import SocialService from '@/api/socialService';
// import CourseService from '@/api/courseService';
// import { UserProfile, FollowUserRequest } from '@/models/User';
// import { Course } from '@/models/Course';

export default function StudentProfileScreen() {
  const { userId, name, username, university } = useLocalSearchParams();
  const [isFollowing, setIsFollowing] = useState(true);
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState<any>(null);

  // API Integration Comments for Student Profile Page
  // TODO: Replace with actual API calls when backend is ready
  // useEffect(() => {
  //   if (userId) {
  //     loadUserProfile(userId as string);
  //   }
  // }, [userId]);

  // const loadUserProfile = async (userId: string) => {
  //   try {
  //     setLoading(true);
  //     const response = await SocialService.getUserProfile(userId);
  //     if (response.success) {
  //       setUserData(response.data);
  //       setIsFollowing(response.data.isFollowing || false);
  //     }
  //   } catch (error) {
  //     console.error('Error loading user profile:', error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // Mock data - replace with API data
  const mockUserData = {
    name: name as string || "Krish Mathur",
    username: username as string || "@kmathur",
    email: "mukulparmar470@gmail.com",
    followers: 6300,
    following: 2500,
    profileImage: "https://picsum.photos/200/200?random=25",
    university: university as string || "Massachusetts Institute of Technology"
  };

  const targetUniversities = [
    "MIT College",
    "MIT College", 
    "MIT College",
    "MIT College"
  ];

  const enrolledCourses = [
    "Essay Writing 101"
  ];

  const handleFollowToggle = async () => {
    // API Integration Comments for Student Profile Page
    // TODO: Implement follow/unfollow API call when backend is ready
    // try {
    //   const response = isFollowing 
    //     ? await SocialService.unfollowUser(userId as string)
    //     : await SocialService.followUser({ userId: userId as string });
    //   
    //   if (response.success) {
    //     setIsFollowing(!isFollowing);
    //     // Update followers count if available
    //     if (userData) {
    //       setUserData(prev => ({
    //         ...prev,
    //         followers: prev.followers + (isFollowing ? -1 : 1)
    //       }));
    //     }
    //   }
    // } catch (error) {
    //   console.error('Error toggling follow:', error);
    // }

    // Mock implementation - replace with API call
    setIsFollowing(!isFollowing);
  };

  const handleMessage = () => {
    console.log("Opening chat with", userData.name);
  };

  const handleUniversityPress = (university: string) => {
    router.push({
      pathname: "/university-search",
      params: { query: university }
    });
  };

  const handleCoursePress = (course: string) => {
    router.push("/course-detail");
  };

  return (
    <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <Image source={{ uri: mockUserData.profileImage }} style={styles.profileImage} />
          
          <Text style={styles.userName}>{mockUserData.name}</Text>
          <Text style={styles.userEmail}>{mockUserData.email}</Text>
          
          {/* Stats */}
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{mockUserData.followers.toLocaleString()}</Text>
              <Text style={styles.statLabel}>Followers</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{mockUserData.following.toLocaleString()}</Text>
              <Text style={styles.statLabel}>Following</Text>
            </View>
          </View>

          {/* Action Buttons */}
          <View style={styles.actionButtons}>
            <TouchableOpacity 
              style={[
                styles.actionButton,
                isFollowing ? styles.followingButton : styles.followButton
              ]}
              onPress={handleFollowToggle}
            >
              <Text style={[
                styles.actionButtonText,
                isFollowing ? styles.followingButtonText : styles.followButtonText
              ]}>
                {isFollowing ? "Following" : "Follow"}
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.messageButton} onPress={handleMessage}>
              <Text style={styles.messageButtonText}>Message</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Target Universities Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Target Universities</Text>
          <View style={styles.universitiesContainer}>
            {targetUniversities.map((university, index) => (
              <TouchableOpacity 
                key={index}
                style={styles.universityTag}
                onPress={() => handleUniversityPress(university)}
              >
                <Text style={styles.universityTagText}>{university}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Courses Enrolled Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Courses Enrolled</Text>
          <View style={styles.coursesContainer}>
            {enrolledCourses.map((course, index) => (
              <TouchableOpacity 
                key={index}
                style={styles.courseItem}
                onPress={() => handleCoursePress(course)}
              >
                <View style={styles.courseIcon}>
                  <Ionicons name="book" size={20} color="#0D5543" />
                </View>
                <Text style={styles.courseName}>{course}</Text>
                <Ionicons name="chevron-forward" size={16} color="#7F8C8D" />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Additional Info */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About</Text>
          <View style={styles.aboutContainer}>
            <View style={styles.aboutItem}>
              <Ionicons name="school-outline" size={20} color="#0D5543" />
              <Text style={styles.aboutText}>Studying at {userData.university}</Text>
            </View>
            <View style={styles.aboutItem}>
              <Ionicons name="location-outline" size={20} color="#0D5543" />
              <Text style={styles.aboutText}>Cambridge, Massachusetts</Text>
            </View>
            <View style={styles.aboutItem}>
              <Ionicons name="calendar-outline" size={20} color="#0D5543" />
              <Text style={styles.aboutText}>Joined September 2024</Text>
            </View>
          </View>
        </View>

        {/* Recent Activity */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          <View style={styles.activityContainer}>
            <View style={styles.activityItem}>
              <Ionicons name="bookmark" size={16} color="#F39C12" />
              <Text style={styles.activityText}>Bookmarked "IELTS Preparation Course"</Text>
              <Text style={styles.activityTime}>2 hours ago</Text>
            </View>
            <View style={styles.activityItem}>
              <Ionicons name="people" size={16} color="#3498DB" />
              <Text style={styles.activityText}>Started following Sarah Johnson</Text>
              <Text style={styles.activityTime}>1 day ago</Text>
            </View>
            <View style={styles.activityItem}>
              <Ionicons name="star" size={16} color="#E74C3C" />
              <Text style={styles.activityText}>Rated "Essay Writing 101" 5 stars</Text>
              <Text style={styles.activityTime}>3 days ago</Text>
            </View>
          </View>
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
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: "#FFFFFF",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2C3E50",
  },
  profileHeader: {
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    paddingVertical: 32,
    paddingHorizontal: 20,
    marginBottom: 8,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
  },
  userName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2C3E50",
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 16,
    color: "#7F8C8D",
    marginBottom: 20,
  },
  statsContainer: {
    flexDirection: "row",
    gap: 32,
    marginBottom: 24,
  },
  statItem: {
    alignItems: "center",
  },
  statNumber: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#0D5543",
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: "#7F8C8D",
  },
  actionButtons: {
    flexDirection: "row",
    gap: 12,
  },
  actionButton: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 20,
    minWidth: 100,
    alignItems: "center",
  },
  followButton: {
    backgroundColor: "#0D5543",
  },
  followingButton: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#0D5543",
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: "600",
  },
  followButtonText: {
    color: "#FFFFFF",
  },
  followingButtonText: {
    color: "#0D5543",
  },
  messageButton: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#0D5543",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 20,
    minWidth: 100,
    alignItems: "center",
  },
  messageButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#0D5543",
  },
  section: {
    backgroundColor: "#FFFFFF",
    marginBottom: 8,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2C3E50",
    marginBottom: 16,
  },
  universitiesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  universityTag: {
    backgroundColor: "#0D5543",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  universityTagText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  coursesContainer: {
    gap: 12,
  },
  courseItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F8F9FA",
    padding: 16,
    borderRadius: 12,
    gap: 12,
  },
  courseIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#EBF3FD",
    justifyContent: "center",
    alignItems: "center",
  },
  courseName: {
    flex: 1,
    fontSize: 16,
    fontWeight: "500",
    color: "#2C3E50",
  },
  aboutContainer: {
    gap: 12,
  },
  aboutItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  aboutText: {
    fontSize: 16,
    color: "#2C3E50",
  },
  activityContainer: {
    gap: 16,
  },
  activityItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  activityText: {
    flex: 1,
    fontSize: 14,
    color: "#2C3E50",
  },
  activityTime: {
    fontSize: 12,
    color: "#7F8C8D",
  },
});
