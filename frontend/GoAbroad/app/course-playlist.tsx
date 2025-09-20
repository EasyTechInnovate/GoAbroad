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

interface Lesson {
  id: string;
  number: number;
  title: string;
  duration: string;
  isCompleted: boolean;
  isLocked: boolean;
}

export default function CoursePlaylistScreen() {
  const [activeTab, setActiveTab] = useState<'playlist' | 'certificates'>('playlist');

  const courseData = {
    title: "UI UX Design",
    totalLessons: 22,
    totalDuration: "2 hrs 30 mins",
    progress: 18, // 18 out of 22 lessons completed
  };

  const lessons: Lesson[] = [
    { id: "1", number: 1, title: "Introduction", duration: "05:30", isCompleted: true, isLocked: false },
    { id: "2", number: 2, title: "What is Ui Design", duration: "10:00", isCompleted: true, isLocked: false },
    { id: "3", number: 3, title: "Set up Figma account", duration: "08:45", isCompleted: true, isLocked: false },
    { id: "4", number: 4, title: "Using Figma Plugine", duration: "12:30", isCompleted: false, isLocked: false },
    { id: "5", number: 5, title: "Working with Figma Layer", duration: "15:20", isCompleted: false, isLocked: false },
    { id: "6", number: 6, title: "Why Create User Flow", duration: "09:15", isCompleted: false, isLocked: false },
    { id: "7", number: 7, title: "Design Principles", duration: "11:45", isCompleted: false, isLocked: true },
    { id: "8", number: 8, title: "Color Theory", duration: "13:20", isCompleted: false, isLocked: true },
  ];

  const handleLessonPress = (lesson: Lesson) => {
    if (lesson.isLocked) return;
    
    if (lesson.isCompleted) {
      // Navigate to video player for completed lessons
      router.push("/video-player");
    } else {
      // Navigate to video player for current lesson
      router.push("/video-player");
    }
  };

  const getLessonIcon = (lesson: Lesson) => {
    if (lesson.isLocked) {
      return <Ionicons name="lock-closed" size={20} color="#BDC3C7" />;
    } else if (lesson.isCompleted) {
      return <Ionicons name="checkmark-circle" size={20} color="#27AE60" />;
    } else {
      return <Ionicons name="play-circle-outline" size={20} color="#0D5543" />;
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
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

      {/* Course Progress */}
      <View style={styles.progressContainer}>
        <Text style={styles.progressText}>Lesson 1-{courseData.totalLessons}</Text>
        <Text style={styles.durationText}>{courseData.totalDuration}</Text>
      </View>

      {/* Tabs */}
      <View style={styles.tabContainer}>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'playlist' && styles.activeTab]}
          onPress={() => setActiveTab('playlist')}
        >
          <Text style={[styles.tabText, activeTab === 'playlist' && styles.activeTabText]}>
            Play List
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'certificates' && styles.activeTab]}
          onPress={() => setActiveTab('certificates')}
        >
          <Text style={[styles.tabText, activeTab === 'certificates' && styles.activeTabText]}>
            Certificates
          </Text>
        </TouchableOpacity>
      </View>

      {/* Content */}
      {activeTab === 'playlist' ? (
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {lessons.map((lesson) => (
            <TouchableOpacity 
              key={lesson.id} 
              style={[
                styles.lessonItem,
                lesson.isLocked && styles.lockedLesson
              ]}
              onPress={() => handleLessonPress(lesson)}
              disabled={lesson.isLocked}
            >
              <View style={styles.lessonNumber}>
                <Text style={[
                  styles.lessonNumberText,
                  lesson.isLocked && styles.lockedText
                ]}>
                  {lesson.number}
                </Text>
              </View>
              
              <View style={styles.lessonContent}>
                <Text style={[
                  styles.lessonTitle,
                  lesson.isLocked && styles.lockedText
                ]}>
                  {lesson.title}
                </Text>
                <Text style={[
                  styles.lessonDuration,
                  lesson.isLocked && styles.lockedText
                ]}>
                  {lesson.duration}
                </Text>
              </View>

              <View style={styles.lessonIcon}>
                {getLessonIcon(lesson)}
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      ) : (
        <View style={styles.certificatesContainer}>
          <View style={styles.certificatePlaceholder}>
            <Ionicons name="certificate-outline" size={64} color="#BDC3C7" />
            <Text style={styles.certificateTitle}>No Certificates Yet</Text>
            <Text style={styles.certificateSubtitle}>
              Complete the course to earn your certificate
            </Text>
          </View>
        </View>
      )}

      {/* Bottom Button */}
      <View style={styles.bottomContainer}>
        <TouchableOpacity 
          style={styles.confirmButton}
          onPress={() => router.push("/course-completion")}
        >
          <Text style={styles.confirmButtonText}>Confirm</Text>
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
  progressContainer: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5E5",
  },
  progressText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#2C3E50",
    marginBottom: 4,
  },
  durationText: {
    fontSize: 14,
    color: "#7F8C8D",
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
  content: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  lessonItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F1F2F6",
  },
  lockedLesson: {
    opacity: 0.6,
  },
  lessonNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#F1F2F6",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  lessonNumberText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#2C3E50",
  },
  lessonContent: {
    flex: 1,
  },
  lessonTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: "#2C3E50",
    marginBottom: 4,
  },
  lessonDuration: {
    fontSize: 14,
    color: "#7F8C8D",
  },
  lessonIcon: {
    marginLeft: 16,
  },
  lockedText: {
    color: "#BDC3C7",
  },
  certificatesContainer: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
  },
  certificatePlaceholder: {
    alignItems: "center",
    paddingHorizontal: 40,
  },
  certificateTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#2C3E50",
    marginTop: 16,
    marginBottom: 8,
  },
  certificateSubtitle: {
    fontSize: 14,
    color: "#7F8C8D",
    textAlign: "center",
    lineHeight: 20,
  },
  bottomContainer: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: "#E5E5E5",
  },
  confirmButton: {
    backgroundColor: "#0D5543",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  confirmButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
});
