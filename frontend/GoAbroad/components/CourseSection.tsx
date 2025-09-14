import React from "react";
import { FlatList, StyleSheet, Text, View, Image } from "react-native";
import { Course } from "@/models/Home";

export default function CourseSection({ courses }: { courses: Course[] }) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Popular Courses</Text>
        <Text style={styles.seeAll}>See All</Text>
      </View>

      <FlatList
        horizontal
        data={courses}
        keyExtractor={(item) => item.id}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: "https://picsum.photos/200" }} style={styles.image} />
            <Text style={styles.courseTitle}>{item.title}</Text>
            <Text style={styles.students}>{item.students} students</Text>
            <Text style={styles.price}>₹{item.price}</Text>
          </View>
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
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  title: { fontSize: 18, fontWeight: "700" },
  seeAll: { color: "#007bff" },
  card: {
    width: 160,
    marginHorizontal: 10,
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  image: { width: "100%", height: 100, borderRadius: 8 },
  courseTitle: { fontSize: 14, fontWeight: "600", marginVertical: 4 },
  students: { fontSize: 12, color: "#666" },
  price: { fontSize: 14, fontWeight: "700", marginTop: 4 },
});
