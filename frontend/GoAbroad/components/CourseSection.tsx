import React from "react";
import { FlatList, StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Course } from "@/models/Course";

export default function CourseSection({ courses }: { courses: Course[] }) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Popular Courses</Text>
        <TouchableOpacity>
          <Text style={styles.seeAll}>See All</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        horizontal
        data={courses}
        keyExtractor={(item) => item.id}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <View style={styles.content}>
              <Text style={styles.category}>{item.category}</Text>
              <Text style={styles.courseTitle} numberOfLines={2}>{item.title}</Text>
              <Text style={styles.instructor}>by {item.instructor}</Text>
              <View style={styles.stats}>
                <View style={styles.statItem}>
                  <Ionicons name="people-outline" size={12} color="#7f8c8d" />
                  <Text style={styles.statText}>{item.students.toLocaleString()}</Text>
                </View>
                <View style={styles.statItem}>
                  <Ionicons name="star" size={12} color="#f39c12" />
                  <Text style={styles.statText}>{item.rating}</Text>
                </View>
              </View>
              <Text style={styles.price}>₹{item.price}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginVertical: 10 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  title: { fontSize: 20, fontWeight: "bold", color: "#2c3e50" },
  seeAll: { color: "#3498db", fontSize: 16, fontWeight: "600" },
  card: {
    width: 200,
    marginHorizontal: 8,
    backgroundColor: "#fff",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    overflow: "hidden",
  },
  image: { width: "100%", height: 120 },
  content: {
    padding: 12,
  },
  category: {
    fontSize: 10,
    fontWeight: "600",
    color: "#3498db",
    backgroundColor: "#ebf3fd",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
    alignSelf: "flex-start",
    marginBottom: 6,
  },
  courseTitle: { 
    fontSize: 14, 
    fontWeight: "bold", 
    color: "#2c3e50",
    marginBottom: 4,
    lineHeight: 18,
  },
  instructor: {
    fontSize: 11,
    color: "#7f8c8d",
    marginBottom: 8,
  },
  stats: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  statItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  statText: {
    fontSize: 10,
    color: "#7f8c8d",
    marginLeft: 2,
  },
  price: { 
    fontSize: 16, 
    fontWeight: "bold", 
    color: "#e74c3c",
  },
});
