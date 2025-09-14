import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { Blog } from "@/models/Home";

export default function BlogSection({ blogs }: { blogs: Blog[] }) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}> Recent Blogs</Text>
        <Text style={styles.seeAll}>See All</Text>
      </View>

      <FlatList
        data={blogs}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.blogTitle}>{item.title}</Text>
            <Text style={styles.excerpt}>{item.excerpt}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginVertical: 10, paddingHorizontal: 16 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  title: { fontSize: 18, fontWeight: "700" },
  seeAll: { color: "#007bff" },
  card: {
    backgroundColor: "#f9f9f9",
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  blogTitle: { fontSize: 14, fontWeight: "600", marginBottom: 4 },
  excerpt: { fontSize: 12, color: "#666" },
});
