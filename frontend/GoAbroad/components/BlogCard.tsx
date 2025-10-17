import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Blog } from "@/models/Blog";

interface BlogCardProps {
  blog: Blog;
  onPress?: () => void;
}

export default function BlogCard({ blog, onPress }: BlogCardProps) {
  return (
    <View style={styles.card}>
      {/* Hero Image */}
      <Image source={{ uri: blog.image }} style={styles.heroImage} />
      
      {/* Tags Section */}
      <View style={styles.tagsContainer}>
        <View style={styles.primaryTag}>
          <Text style={styles.primaryTagText}>{blog.category}</Text>
        </View>
        <Text style={styles.readTime}>{blog.readTime}</Text>
        <Text style={styles.publishDate}>{blog.publishedAt}</Text>
      </View>
      
      {/* Content */}
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={2}>{blog.title}</Text>
        <Text style={styles.description} numberOfLines={3}>{blog.description}</Text>
        
        {/* Author Info */}
        <View style={styles.authorSection}>
          <Ionicons name="person-outline" size={16} color="#6B7280" />
          <Text style={styles.authorText}>By {blog.author}</Text>
        </View>
        
        {/* Action Buttons */}
        <View style={styles.actionContainer}>
          <TouchableOpacity style={styles.readButton} onPress={onPress}>
            <Text style={styles.readButtonText}>Read Full Post</Text>
          </TouchableOpacity>
          
          <View style={styles.iconContainer}>
            <TouchableOpacity style={styles.iconButton}>
              <Ionicons 
                name={blog.isLiked ? "heart" : "heart-outline"} 
                size={20} 
                color={blog.isLiked ? "#e74c3c" : "#95a5a6"} 
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton}>
              <Ionicons 
                name="share-outline" 
                size={20} 
                color="#95a5a6" 
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8.53,
    width: "100%",
    minHeight: 500,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10.67,
    },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 12,
    borderWidth: 1,
    borderColor: "#E5E5E5",
    overflow: "hidden",
    marginBottom: 16,
  },
  heroImage: {
    width: "100%",
    height: 180,
    resizeMode: "cover",
  },
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 12,
    paddingTop: 12,
    paddingBottom: 8,
    gap: 12,
    alignItems: "center",
  },
  primaryTag: {
    backgroundColor: "rgba(187, 247, 208, 1)",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    borderWidth: 1.07,
    borderColor: "rgba(187, 247, 208, 1)",
    marginTop: 8,
    marginLeft: 8,
    marginRight: 8,
    marginBottom: 8,
  },
  primaryTagText: {
    fontSize: 11,
    color: "rgba(21, 128, 61, 1)",
    fontWeight: "600",
  },
  readTime: {
    fontSize: 11,
    color: "#6B7280",
    marginLeft: 12,
  },
  publishDate: {
    fontSize: 11,
    color: "#6B7280",
    marginLeft: 12,
  },
  content: {
    padding: 12,
    paddingTop: 8,
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1F2937",
    marginBottom: 10,
    lineHeight: 22,
  },
  description: {
    fontSize: 13,
    color: "#6B7280",
    marginBottom: 14,
    lineHeight: 18,
  },
  authorSection: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  authorText: {
    fontSize: 11,
    color: "#6B7280",
    marginLeft: 6,
  },
  actionContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "auto",
  },
  readButton: {
    backgroundColor: "rgba(187, 247, 208, 1)",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
    borderWidth: 1.07,
    borderColor: "rgba(187, 247, 208, 1)",
  },
  readButtonText: {
    color: "rgba(21, 128, 61, 1)",
    fontSize: 11,
    fontWeight: "600",
  },
  iconContainer: {
    flexDirection: "row",
    gap: 12,
  },
  iconButton: {
    padding: 4,
  },
});