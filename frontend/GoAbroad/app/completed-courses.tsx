import React, { useState } from "react";
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
import { router } from "expo-router";

interface CompletedCourse {
  id: string;
  title: string;
  category: string;
  lessons: number;
  year: string;
  price: number;
  image: string;
  completionDate: string;
  progress: number;
}

export default function CompletedCoursesScreen() {
  const [activeTab, setActiveTab] = useState<'ongoing' | 'completed'>('completed');

  const completedCourses: CompletedCourse[] = [
    {
      id: "1",
      title: "IELTS Preparation Masterclass",
      category: "English Test",
      lessons: 231,
      year: "2025",
      price: 199,
      image: "https://picsum.photos/300/200?random=5",
      completionDate: "Completed",
      progress: 100
    },
    {
      id: "2",
      title: "University Application Essays",
      category: "Writing",
      lessons: 178,
      year: "2025",
      price: 199,
      image: "https://picsum.photos/300/200?random=6",
      completionDate: "Completed",
      progress: 100
    },
    {
      id: "3",
      title: "Study Abroad Planning Guide",
      category: "Planning",
      lessons: 95,
      year: "2024",
      price: 149,
      image: "https://picsum.photos/300/200?random=7",
      completionDate: "Completed",
      progress: 100
    }
  ];

  const ongoingCourses: CompletedCourse[] = [
    {
      id: "4",
      title: "UI UX Design",
      category: "Design",
      lessons: 22,
      year: "2025",
      price: 199,
      image: "https://picsum.photos/300/200?random=8",
      completionDate: "In Progress",
      progress: 75
    }
  ];

  const displayCourses = activeTab === 'completed' ? completedCourses : ongoingCourses;

  const handleCoursePress = (courseId: string) => {
    if (activeTab === 'completed') {
      router.push("/course-completion");
    } else {
      router.push("/course-playlist");
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="#2C3E50" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>My Courses</Text>
          <TouchableOpacity>
            <Ionicons name="search-outline" size={24} color="#2C3E50" />
          </TouchableOpacity>
        </View>

        {/* Tab Filter */}
        <View style={styles.tabContainer}>
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'ongoing' && styles.activeTab]}
            onPress={() => setActiveTab('ongoing')}
          >
            <Text style={[styles.tabText, activeTab === 'ongoing' && styles.activeTabText]}>
              Ongoing
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'completed' && styles.activeTab]}
            onPress={() => setActiveTab('completed')}
          >
            <Text style={[styles.tabText, activeTab === 'completed' && styles.activeTabText]}>
              Completed
            </Text>
          </TouchableOpacity>
        </View>

        {/* Courses List */}
        <View style={styles.coursesContainer}>
          {displayCourses.map((course) => (
            <TouchableOpacity 
              key={course.id}
              style={styles.courseCard}
              onPress={() => handleCoursePress(course.id)}
            >
              {/* Course Image */}
              <View style={styles.courseImageContainer}>
                <Image source={{ uri: course.image }} style={styles.courseImage} />
                <View style={styles.completionBadge}>
                  <Text style={styles.completionBadgeText}>
                    {course.completionDate}
                  </Text>
                </View>
              </View>

              {/* Course Info */}
              <View style={styles.courseInfo}>
                <Text style={styles.courseTitle}>{course.title}</Text>
                <Text style={styles.courseCategory}>{course.category}</Text>
                
                <View style={styles.courseStats}>
                  <View style={styles.statItem}>
                    <Ionicons name="book-outline" size={16} color="#7F8C8D" />
                    <Text style={styles.statText}>{course.lessons} Lessons</Text>
                  </View>
                  <View style={styles.statItem}>
                    <Ionicons name="calendar-outline" size={16} color="#7F8C8D" />
                    <Text style={styles.statText}>{course.year}</Text>
                  </View>
                </View>

                {/* Progress Bar for Ongoing Courses */}
                {activeTab === 'ongoing' && (
                  <View style={styles.progressContainer}>
                    <View style={styles.progressBar}>
                      <View 
                        style={[
                          styles.progressFill, 
                          { width: `${course.progress}%` }
                        ]} 
                      />
                    </View>
                    <Text style={styles.progressText}>{course.progress}% Complete</Text>
                  </View>
                )}
              </View>

              {/* Course Price */}
              <View style={styles.coursePrice}>
                <Text style={styles.priceText}>₹{course.price}</Text>
                <TouchableOpacity style={styles.moreButton}>
                  <Ionicons name="ellipsis-horizontal" size={20} color="#7F8C8D" />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Empty State */}
        {displayCourses.length === 0 && (
          <View style={styles.emptyState}>
            <Ionicons 
              name={activeTab === 'completed' ? "checkmark-circle-outline" : "play-circle-outline"} 
              size={64} 
              color="#BDC3C7" 
            />
            <Text style={styles.emptyStateTitle}>
              No {activeTab} courses found
            </Text>
            <Text style={styles.emptyStateSubtitle}>
              {activeTab === 'completed' 
                ? "Complete some courses to see them here" 
                : "Start a new course to see it here"
              }
            </Text>
          </View>
        )}
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNavigation}>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="home-outline" size={24} color="#7F8C8D" />
          <Text style={styles.navLabel}>Home</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="search-outline" size={24} color="#7F8C8D" />
          <Text style={styles.navLabel}>Search</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={[styles.navItem, styles.activeNavItem]}>
          <Ionicons name="book-outline" size={24} color="#0D5543" />
          <Text style={[styles.navLabel, styles.activeNavLabel]}>My Course</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="person-outline" size={24} color="#7F8C8D" />
          <Text style={styles.navLabel}>Profile</Text>
        </TouchableOpacity>
      </View>
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
    fontSize: 24,
    fontWeight: "bold",
    color: "#2C3E50",
  },
  tabContainer: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    marginTop: 8,
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
  coursesContainer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  courseCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    marginBottom: 16,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  courseImageContainer: {
    position: "relative",
    height: 120,
  },
  courseImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  completionBadge: {
    position: "absolute",
    top: 12,
    right: 12,
    backgroundColor: "#27AE60",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  completionBadgeText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  courseInfo: {
    padding: 16,
  },
  courseTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2C3E50",
    marginBottom: 4,
  },
  courseCategory: {
    fontSize: 14,
    color: "#7F8C8D",
    marginBottom: 12,
  },
  courseStats: {
    flexDirection: "row",
    gap: 16,
    marginBottom: 12,
  },
  statItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  statText: {
    fontSize: 14,
    color: "#7F8C8D",
  },
  progressContainer: {
    marginTop: 8,
  },
  progressBar: {
    height: 6,
    backgroundColor: "#F1F2F6",
    borderRadius: 3,
    marginBottom: 6,
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#0D5543",
    borderRadius: 3,
  },
  progressText: {
    fontSize: 12,
    color: "#0D5543",
    fontWeight: "600",
  },
  coursePrice: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  priceText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#0D5543",
  },
  moreButton: {
    padding: 8,
  },
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 60,
    paddingHorizontal: 40,
  },
  emptyStateTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#2C3E50",
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateSubtitle: {
    fontSize: 14,
    color: "#7F8C8D",
    textAlign: "center",
    lineHeight: 20,
  },
  bottomNavigation: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderTopColor: "#E5E5E5",
  },
  navItem: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 8,
  },
  activeNavItem: {
    // Active state styling
  },
  navLabel: {
    fontSize: 12,
    fontWeight: "500",
    color: "#7F8C8D",
    marginTop: 4,
  },
  activeNavLabel: {
    color: "#0D5543",
  },
});
