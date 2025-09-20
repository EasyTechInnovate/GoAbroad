import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, TextInput, View, TouchableOpacity, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

import { fetchCoursesData } from "@/api/courseApi";
import { Course } from "@/models/Course";

import CourseCard from "@/components/CourseCard";

export default function CoursesScreen() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [search, setSearch] = useState("");
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
  const [activeTab, setActiveTab] = useState<'ongoing' | 'completed'>('ongoing');

  useEffect(() => {
    (async () => {
      const data = await fetchCoursesData();
      setCourses(data);
      setFilteredCourses(data);
    })();
  }, []);

  useEffect(() => {
    if (search.trim() === "") {
      setFilteredCourses(courses);
    } else {
      const filtered = courses.filter(course =>
        course.title.toLowerCase().includes(search.toLowerCase()) ||
        course.category.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredCourses(filtered);
    }
  }, [search, courses]);

  const ongoingCourses = filteredCourses.filter(course => !course.isBookmarked);
  const completedCourses = filteredCourses.filter(course => course.isBookmarked);

  const displayCourses = activeTab === 'ongoing' ? ongoingCourses : completedCourses;

  return (
    <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>My Courses</Text>
          <TouchableOpacity style={styles.filterButton}>
            <Ionicons name="filter-outline" size={24} color="#2C3E50" />
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Ionicons name="search-outline" size={20} color="#7F8C8D" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search courses..."
            value={search}
            onChangeText={setSearch}
            placeholderTextColor="#7F8C8D"
          />
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
            <CourseCard key={course.id} course={course} />
          ))}
        </View>

        {/* Empty State */}
        {displayCourses.length === 0 && (
          <View style={styles.emptyState}>
            <Ionicons name="book-outline" size={64} color="#BDC3C7" />
            <Text style={styles.emptyStateTitle}>
              No {activeTab} courses found
            </Text>
            <Text style={styles.emptyStateSubtitle}>
              {activeTab === 'ongoing' 
                ? "Start a new course to see it here" 
                : "Complete some courses to see them here"
              }
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: "#F8F9FA" 
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2C3E50",
  },
  filterButton: {
    padding: 8,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#2C3E50",
  },
  tabContainer: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 12,
    padding: 4,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
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
});