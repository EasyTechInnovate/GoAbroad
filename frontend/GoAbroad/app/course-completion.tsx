import React from "react";
import { 
  StyleSheet, 
  View, 
  Text, 
  TouchableOpacity, 
  ScrollView 
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

export default function CourseCompletionScreen() {
  const courseData = {
    title: "UI UX Design",
    completionDate: "Today",
    totalLessons: 22,
    completedLessons: 22,
    totalDuration: "2 hrs 30 mins",
  };

  const suggestedCourses = [
    {
      id: "1",
      title: "Why Create User Flow",
      category: "UX Design",
      duration: "1 hr 15 mins",
      students: 1200,
      rating: 4.8,
      price: 149,
      image: "https://picsum.photos/300/200?random=3"
    },
    {
      id: "2", 
      title: "Advanced Figma Techniques",
      category: "UI Design",
      duration: "2 hrs 45 mins",
      students: 800,
      rating: 4.9,
      price: 199,
      image: "https://picsum.photos/300/200?random=4"
    }
  ];

  const handleWriteReview = () => {
    router.push("/write-review");
  };

  const handleBackToHome = () => {
    router.replace("/(tabs)/tab1");
  };

  const handleCoursePress = (courseId: string) => {
    router.push("/course-detail");
  };

  return (
    <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="#2C3E50" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{courseData.title}</Text>
          <TouchableOpacity>
            <Ionicons name="certificate-outline" size={24} color="#2C3E50" />
          </TouchableOpacity>
        </View>

        {/* Tabs */}
        <View style={styles.tabContainer}>
          <TouchableOpacity style={styles.tab}>
            <Text style={styles.tabText}>Play List</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.tab, styles.activeTab]}>
            <Text style={[styles.tabText, styles.activeTabText]}>Certificates</Text>
          </TouchableOpacity>
        </View>

        {/* Completion Content */}
        <View style={styles.completionContainer}>
          {/* Success Icon */}
          <View style={styles.successIcon}>
            <Ionicons name="checkmark-circle" size={80} color="#27AE60" />
          </View>

          {/* Completion Message */}
          <Text style={styles.completionTitle}>Course Completed!</Text>
          <Text style={styles.completionMessage}>
            Hooray! You've been a brave for your course.
          </Text>

          {/* Course Stats */}
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{courseData.completedLessons}</Text>
              <Text style={styles.statLabel}>Lessons</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{courseData.totalDuration}</Text>
              <Text style={styles.statLabel}>Duration</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{courseData.completionDate}</Text>
              <Text style={styles.statLabel}>Completed</Text>
            </View>
          </View>

          {/* Action Buttons */}
          <View style={styles.actionButtons}>
            <TouchableOpacity 
              style={styles.reviewButton}
              onPress={handleWriteReview}
            >
              <Text style={styles.reviewButtonText}>Write a Review</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.backButton}
              onPress={handleBackToHome}
            >
              <Text style={styles.backButtonText}>← Back to Home</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Suggested Courses */}
        <View style={styles.suggestedContainer}>
          <Text style={styles.suggestedTitle}>Continue Learning</Text>
          <Text style={styles.suggestedSubtitle}>
            Recommended courses for you
          </Text>

          {suggestedCourses.map((course) => (
            <TouchableOpacity 
              key={course.id}
              style={styles.courseCard}
              onPress={() => handleCoursePress(course.id)}
            >
              <View style={styles.courseImageContainer}>
                <Text style={styles.courseImagePlaceholder}>📚</Text>
              </View>
              
              <View style={styles.courseInfo}>
                <Text style={styles.courseTitle}>{course.title}</Text>
                <Text style={styles.courseCategory}>{course.category}</Text>
                
                <View style={styles.courseStats}>
                  <View style={styles.courseStatItem}>
                    <Ionicons name="time-outline" size={12} color="#7F8C8D" />
                    <Text style={styles.courseStatText}>{course.duration}</Text>
                  </View>
                  <View style={styles.courseStatItem}>
                    <Ionicons name="people-outline" size={12} color="#7F8C8D" />
                    <Text style={styles.courseStatText}>{course.students.toLocaleString()}</Text>
                  </View>
                  <View style={styles.courseStatItem}>
                    <Ionicons name="star" size={12} color="#F39C12" />
                    <Text style={styles.courseStatText}>{course.rating}</Text>
                  </View>
                </View>
              </View>

              <View style={styles.coursePrice}>
                <Text style={styles.priceText}>₹{course.price}</Text>
              </View>
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
  tabContainer: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 20,
    paddingVertical: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  activeTab: {
    backgroundColor: "#0D5543",
  },
  tabText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#7F8C8D",
  },
  activeTabText: {
    color: "#FFFFFF",
  },
  completionContainer: {
    backgroundColor: "#FFFFFF",
    marginTop: 8,
    paddingHorizontal: 20,
    paddingVertical: 40,
    alignItems: "center",
  },
  successIcon: {
    marginBottom: 24,
  },
  completionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2C3E50",
    marginBottom: 12,
    textAlign: "center",
  },
  completionMessage: {
    fontSize: 16,
    color: "#7F8C8D",
    textAlign: "center",
    marginBottom: 32,
    lineHeight: 24,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginBottom: 32,
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
    fontWeight: "500",
  },
  actionButtons: {
    width: "100%",
    gap: 16,
  },
  reviewButton: {
    backgroundColor: "#0D5543",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  reviewButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  backButton: {
    paddingVertical: 16,
    alignItems: "center",
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#0D5543",
  },
  suggestedContainer: {
    backgroundColor: "#FFFFFF",
    marginTop: 8,
    paddingHorizontal: 20,
    paddingVertical: 24,
  },
  suggestedTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#2C3E50",
    marginBottom: 8,
  },
  suggestedSubtitle: {
    fontSize: 14,
    color: "#7F8C8D",
    marginBottom: 20,
  },
  courseCard: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F1F2F6",
  },
  courseImageContainer: {
    width: 60,
    height: 60,
    borderRadius: 8,
    backgroundColor: "#F1F2F6",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  courseImagePlaceholder: {
    fontSize: 24,
  },
  courseInfo: {
    flex: 1,
  },
  courseTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#2C3E50",
    marginBottom: 4,
  },
  courseCategory: {
    fontSize: 14,
    color: "#7F8C8D",
    marginBottom: 8,
  },
  courseStats: {
    flexDirection: "row",
    gap: 16,
  },
  courseStatItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  courseStatText: {
    fontSize: 12,
    color: "#7F8C8D",
  },
  coursePrice: {
    marginLeft: 16,
  },
  priceText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#0D5543",
  },
});
