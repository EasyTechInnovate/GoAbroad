import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { News } from "@/models/News";

interface NewsCardProps {
  news: News;
  onPress?: () => void;
}

export default function NewsCard({ news, onPress }: NewsCardProps) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image source={{ uri: news.image }} style={styles.image} />
      
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.category}>{news.category}</Text>
          <TouchableOpacity style={styles.bookmarkButton}>
            <Ionicons 
              name={news.isBookmarked ? "bookmark" : "bookmark-outline"} 
              size={20} 
              color={news.isBookmarked ? "#f39c12" : "#bdc3c7"} 
            />
          </TouchableOpacity>
        </View>
        
        <Text style={styles.title} numberOfLines={2}>{news.title}</Text>
        <Text style={styles.excerpt} numberOfLines={3}>{news.excerpt}</Text>
        
        <View style={styles.footer}>
          <View style={styles.authorInfo}>
            <Text style={styles.author}>{news.author}</Text>
            <Text style={styles.date}>{news.publishedAt}</Text>
          </View>
          <View style={styles.metaInfo}>
            <Text style={styles.readTime}>{news.readTime}</Text>
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
    color: "#e74c3c",
    backgroundColor: "#fdf2f2",
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
