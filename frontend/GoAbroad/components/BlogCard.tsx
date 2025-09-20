import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Blog } from "@/models/Blog";

interface BlogCardProps {
  blog: Blog;
  onPress?: () => void;
}

export default function BlogCard({ blog, onPress }: BlogCardProps) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image source={{ uri: blog.image }} style={styles.image} />
      
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.category}>{blog.category}</Text>
          <TouchableOpacity style={styles.bookmarkButton}>
            <Ionicons 
              name={blog.isBookmarked ? "bookmark" : "bookmark-outline"} 
              size={20} 
              color={blog.isBookmarked ? "#f39c12" : "#bdc3c7"} 
            />
          </TouchableOpacity>
        </View>
        
        <Text style={styles.title} numberOfLines={2}>{blog.title}</Text>
        <Text style={styles.excerpt} numberOfLines={3}>{blog.excerpt}</Text>
        
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tagsContainer}>
          {blog.tags.map((tag, index) => (
            <View key={index} style={styles.tag}>
              <Text style={styles.tagText}>{tag}</Text>
            </View>
          ))}
        </ScrollView>
        
        <View style={styles.footer}>
          <View style={styles.authorInfo}>
            <Text style={styles.author}>{blog.author}</Text>
            <Text style={styles.date}>{blog.publishedAt}</Text>
          </View>
          <View style={styles.metaInfo}>
            <Text style={styles.readTime}>{blog.readTime}</Text>
          </View>
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
    color: "#9b59b6",
    backgroundColor: "#f4ecf7",
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
    marginBottom: 8,
    lineHeight: 24,
  },
  excerpt: {
    fontSize: 14,
    color: "#7f8c8d",
    marginBottom: 12,
    lineHeight: 20,
  },
  tagsContainer: {
    marginBottom: 12,
  },
  tag: {
    backgroundColor: "#ecf0f1",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 6,
  },
  tagText: {
    fontSize: 11,
    color: "#7f8c8d",
    fontWeight: "500",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  authorInfo: {
    flex: 1,
  },
  author: {
    fontSize: 12,
    fontWeight: "600",
    color: "#2c3e50",
  },
  date: {
    fontSize: 11,
    color: "#95a5a6",
    marginTop: 2,
  },
  metaInfo: {
    alignItems: "flex-end",
  },
  readTime: {
    fontSize: 11,
    color: "#95a5a6",
    backgroundColor: "#ecf0f1",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
  },
});
