import React, { useState } from "react";
import { 
  ScrollView, 
  StyleSheet, 
  View, 
  Text, 
  TouchableOpacity, 
  Image, 
  Dimensions 
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

const { width } = Dimensions.get('window');

interface Lesson {
  id: string;
  title: string;
  duration: string;
  isCompleted: boolean;
}

interface Review {
  id: string;
  userName: string;
  rating: number;
  date: string;
  comment: string;
}

export default function CourseDetailScreen() {
  const [activeTab, setActiveTab] = useState<'playlist' | 'review'>('playlist');
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);

  const courseData = {
    id: "1",
    title: "User Interface Design",
    category: "UI UX",
    image: "https://picsum.photos/400/200?random=1",
    students: 2700,
    rating: 4.9,
    reviewCount: 27,
    price: 30.00,
    description: "Learn the fundamentals of user interface design and create stunning, user-friendly interfaces. This comprehensive course covers everything from basic design principles to advanced prototyping techniques.",
    courseType: "Online",
    globalRank: "10th",
    avgExpense: "$45,910 p.a.",
    playlistCount: 30,
    reviewCount: 35
  };

  const lessons: Lesson[] = [
    { id: "1", title: "Introduction", duration: "05:30", isCompleted: true },
    { id: "2", title: "What is UI Design", duration: "10:00", isCompleted: true },
    { id: "3", title: "Set up Figma account", duration: "08:45", isCompleted: true },
    { id: "4", title: "Using Figma Plugins", duration: "12:30", isCompleted: true },
    { id: "5", title: "Working with Figma Layer", duration: "15:20", isCompleted: false },
    { id: "6", title: "Why Create User flow", duration: "09:15", isCompleted: false },
  ];

  const reviews: Review[] = [
    {
      id: "1",
      userName: "Luke Alexander",
      rating: 5,
      date: "6 June, 2022",
      comment: "Excellent course! The instructor explains everything clearly and the practical exercises are very helpful."
    },
    {
      id: "2",
      userName: "Jenny Wilson",
      rating: 5,
      date: "3 June, 2022",
      comment: "Great content and well-structured. I learned a lot about UI design principles."
    },
    {
      id: "3",
      userName: "Mike Johnson",
      rating: 4,
      date: "1 June, 2022",
      comment: "Good course overall, but could use more advanced topics."
    }
  ];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Ionicons
        key={index}
        name={index < rating ? "star" : "star-outline"}
        size={16}
        color="#F39C12"
      />
    ));
  };

  return (
    <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="#2C3E50" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Course Details</Text>
          <TouchableOpacity onPress={() => setIsBookmarked(!isBookmarked)}>
            <Ionicons 
              name={isBookmarked ? "heart" : "heart-outline"} 
              size={24} 
              color={isBookmarked ? "#E74C3C" : "#2C3E50"} 
            />
          </TouchableOpacity>
        </View>

        {/* Course Banner */}
        <View style={styles.bannerContainer}>
          <Image source={{ uri: courseData.image }} style={styles.bannerImage} />
          <View style={styles.bannerOverlay}>
            <Text style={styles.categoryText}>{courseData.category}</Text>
          </View>
        </View>

        {/* Course Info */}
        <View style={styles.courseInfo}>
          <Text style={styles.courseTitle}>{courseData.title}</Text>
          
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Ionicons name="people-outline" size={16} color="#7F8C8D" />
              <Text style={styles.statText}>{courseData.students.toLocaleString()} Students</Text>
            </View>
            <View style={styles.statItem}>
              <View style={styles.ratingContainer}>
                {renderStars(Math.floor(courseData.rating))}
              </View>
              <Text style={styles.statText}>{courseData.rating} ({courseData.reviewCount} Reviews)</Text>
            </View>
          </View>
        </View>

        {/* About This Course */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About This Course</Text>
          <Text style={styles.description}>
            {showFullDescription 
              ? courseData.description 
              : courseData.description.substring(0, 100) + "..."
            }
          </Text>
          <TouchableOpacity onPress={() => setShowFullDescription(!showFullDescription)}>
            <Text style={styles.readMoreText}>
              {showFullDescription ? "Read Less" : "Read More..."}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Course Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Course Information</Text>
          <View style={styles.infoContainer}>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Course Type:</Text>
              <Text style={styles.infoValue}>{courseData.courseType}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Global Rank:</Text>
              <Text style={styles.infoValue}>{courseData.globalRank}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Avg. Living Expense:</Text>
              <Text style={styles.infoValue}>{courseData.avgExpense}</Text>
            </View>
          </View>
        </View>

        {/* Tabs */}
        <View style={styles.tabContainer}>
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'playlist' && styles.activeTab]}
            onPress={() => setActiveTab('playlist')}
          >
            <Text style={[styles.tabText, activeTab === 'playlist' && styles.activeTabText]}>
              Playlist ({courseData.playlistCount})
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'review' && styles.activeTab]}
            onPress={() => setActiveTab('review')}
          >
            <Text style={[styles.tabText, activeTab === 'review' && styles.activeTabText]}>
              Review ({courseData.reviewCount})
            </Text>
          </TouchableOpacity>
        </View>

        {/* Tab Content */}
        {activeTab === 'playlist' ? (
          <View style={styles.playlistContainer}>
            <Text style={styles.playlistTitle}>Lesson 1-22</Text>
            {lessons.map((lesson) => (
              <View key={lesson.id} style={styles.lessonItem}>
                <View style={styles.lessonInfo}>
                  <Ionicons 
                    name={lesson.isCompleted ? "checkmark-circle" : "play-circle-outline"} 
                    size={24} 
                    color={lesson.isCompleted ? "#27AE60" : "#0D5543"} 
                  />
                  <View style={styles.lessonDetails}>
                    <Text style={styles.lessonTitle}>{lesson.title}</Text>
                    <Text style={styles.lessonDuration}>{lesson.duration}</Text>
                  </View>
                </View>
                <TouchableOpacity>
                  <Ionicons name="play-outline" size={20} color="#0D5543" />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        ) : (
          <View style={styles.reviewsContainer}>
            <Text style={styles.reviewsTitle}>Reviews ({courseData.reviewCount})</Text>
            {reviews.map((review) => (
              <View key={review.id} style={styles.reviewItem}>
                <View style={styles.reviewHeader}>
                  <Text style={styles.reviewerName}>{review.userName}</Text>
                  <View style={styles.reviewRating}>
                    {renderStars(review.rating)}
                  </View>
                </View>
                <Text style={styles.reviewDate}>{review.date}</Text>
                <Text style={styles.reviewComment}>{review.comment}</Text>
              </View>
            ))}
          </View>
        )}

        {/* Bottom Spacing */}
        <View style={styles.bottomSpacing} />
      </ScrollView>

      {/* Enroll Button */}
      <View style={styles.enrollContainer}>
        <TouchableOpacity 
          style={styles.enrollButton}
          onPress={() => router.push("/course-playlist")}
        >
          <Text style={styles.enrollButtonText}>${courseData.price.toFixed(2)} Enroll Course</Text>
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
    fontSize: 18,
    fontWeight: "bold",
    color: "#2C3E50",
  },
  bannerContainer: {
    position: "relative",
    height: 200,
  },
  bannerImage: {
    width: width,
    height: 200,
    resizeMode: "cover",
  },
  bannerOverlay: {
    position: "absolute",
    top: 16,
    left: 20,
    backgroundColor: "rgba(0,0,0,0.6)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  categoryText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
  },
  courseInfo: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  courseTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2C3E50",
    marginBottom: 12,
  },
  statsContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },
  statItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  statText: {
    fontSize: 14,
    color: "#7F8C8D",
    fontWeight: "500",
  },
  ratingContainer: {
    flexDirection: "row",
    gap: 2,
  },
  section: {
    backgroundColor: "#FFFFFF",
    marginTop: 8,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2C3E50",
    marginBottom: 12,
  },
  description: {
    fontSize: 14,
    color: "#7F8C8D",
    lineHeight: 20,
    marginBottom: 8,
  },
  readMoreText: {
    fontSize: 14,
    color: "#0D5543",
    fontWeight: "600",
  },
  infoContainer: {
    gap: 12,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  infoLabel: {
    fontSize: 14,
    color: "#7F8C8D",
    fontWeight: "500",
  },
  infoValue: {
    fontSize: 14,
    color: "#2C3E50",
    fontWeight: "600",
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
  playlistContainer: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  playlistTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#2C3E50",
    marginBottom: 16,
  },
  lessonItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F1F2F6",
  },
  lessonInfo: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    gap: 12,
  },
  lessonDetails: {
    flex: 1,
  },
  lessonTitle: {
    fontSize: 14,
    fontWeight: "500",
    color: "#2C3E50",
    marginBottom: 4,
  },
  lessonDuration: {
    fontSize: 12,
    color: "#7F8C8D",
  },
  reviewsContainer: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  reviewsTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#2C3E50",
    marginBottom: 16,
  },
  reviewItem: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F1F2F6",
  },
  reviewHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  reviewerName: {
    fontSize: 14,
    fontWeight: "600",
    color: "#2C3E50",
  },
  reviewRating: {
    flexDirection: "row",
    gap: 2,
  },
  reviewDate: {
    fontSize: 12,
    color: "#7F8C8D",
    marginBottom: 8,
  },
  reviewComment: {
    fontSize: 14,
    color: "#7F8C8D",
    lineHeight: 20,
  },
  bottomSpacing: {
    height: 100,
  },
  enrollContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: "#E5E5E5",
  },
  enrollButton: {
    backgroundColor: "#0D5543",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  enrollButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
});
