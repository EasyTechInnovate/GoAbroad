import React, { useState } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Course } from "@/models/Course";

interface CourseCardProps {
  course: Course;
  onPress?: () => void;
  showWishlistButton?: boolean;
}

export default function CourseCard({ course, onPress, showWishlistButton = true }: CourseCardProps) {
  const [isBookmarked, setIsBookmarked] = useState(course.isBookmarked);

  const handlePress = () => {
    if (onPress) {
      onPress();
    } else {
      router.push("/course-detail");
    }
  };

  const handleBookmarkPress = () => {
    setIsBookmarked(!isBookmarked);
    // Here you would typically make an API call to save/remove from wishlist
    console.log(`${isBookmarked ? 'Removed from' : 'Added to'} wishlist:`, course.title);
  };

  return (
    <TouchableOpacity style={styles.card} onPress={handlePress}>
      <Image source={{ uri: course.image }} style={styles.image} />

      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.category}>{course.category}</Text>
          {showWishlistButton && (
            <TouchableOpacity style={styles.bookmarkButton} onPress={handleBookmarkPress}>
              <Ionicons
                name={isBookmarked ? "heart" : "heart-outline"}
                size={20}
                color={isBookmarked ? "#E74C3C" : "#bdc3c7"}
              />
            </TouchableOpacity>
          )}
        </View>

        <Text style={styles.title} numberOfLines={2}>{course.title}</Text>
        <Text style={styles.instructor}>by {course.instructor}</Text>

        <View style={styles.stats}>
          <View style={styles.statItem}>
            <Ionicons name="people-outline" size={16} color="#7f8c8d" />
            <Text style={styles.statText}>{course.students.toLocaleString()}</Text>
          </View>
          <View style={styles.statItem}>
            <Ionicons name="star" size={16} color="#f39c12" />
            <Text style={styles.statText}>{course.rating}</Text>
          </View>
          <View style={styles.statItem}>
            <Ionicons name="time-outline" size={16} color="#7f8c8d" />
            <Text style={styles.statText}>{course.duration}</Text>
          </View>
        </View>

        <View style={styles.footer}>
          <Text style={styles.level}>{course.level}</Text>
          <Text style={styles.price}>₹{course.price}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: 200,
  },
  content: {
    padding: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  category: {
    fontSize: 12,
    fontWeight: "600",
    color: "#3498db",
    backgroundColor: "#ebf3fd",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  bookmarkButton: {
    padding: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2c3e50",
    marginBottom: 4,
  },
  instructor: {
    fontSize: 14,
    color: "#7f8c8d",
    marginBottom: 12,
  },
  stats: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  statItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  statText: {
    fontSize: 12,
    color: "#7f8c8d",
    marginLeft: 4,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  level: {
    fontSize: 12,
    fontWeight: "600",
    color: "#27ae60",
    backgroundColor: "#e8f5e8",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  price: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#e74c3c",
  },
});
