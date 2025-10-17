import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { News } from "@/models/News";

const { width: screenWidth } = Dimensions.get('window');

interface NewsCardProps {
  news: News;
  onPress?: () => void;
}

export default function NewsCard({ news, onPress }: NewsCardProps) {
  const router = useRouter();

  const handlePress = () => {
    if (onPress) {
      onPress();
    } else {
      // Navigate to news detail screen
      router.push({
        pathname: "/news-detail",
        params: { newsId: news.id }
      });
    }
  };

  return (
    <TouchableOpacity style={styles.card} onPress={handlePress}>
      {/* Main Image */}
      <Image source={{ uri: news.image }} style={styles.image} />
      
      {/* Tags Section */}
      <View style={styles.tagsContainer}>
        <View style={styles.tag}>
          <Text style={styles.tagText}>{news.category}</Text>
        </View>
        <View style={styles.tag}>
          <Text style={styles.tagText}>{news.readTime}</Text>
        </View>
        <View style={styles.tag}>
          <Text style={styles.tagText}>{news.publishedAt}</Text>
        </View>
      </View>
      
      {/* Content */}
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={2}>{news.title}</Text>
        <Text style={styles.excerpt} numberOfLines={3}>{news.excerpt}</Text>
        
        {/* Author Info */}
        <View style={styles.authorSection}>
          <Text style={styles.authorText}>By {news.author}</Text>
        </View>
        
        {/* Action Buttons */}
        <View style={styles.actionContainer}>
          <TouchableOpacity style={styles.readButton} onPress={onPress}>
            <Text style={styles.readButtonText}>Read Full Post</Text>
          </TouchableOpacity>
          
          <View style={styles.iconContainer}>
            <TouchableOpacity style={styles.iconButton}>
              <Ionicons 
                name={news.isLiked ? "heart" : "heart-outline"} 
                size={20} 
                color={news.isLiked ? "#e74c3c" : "#95a5a6"} 
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
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    width: "100%", // Full width within container
    minHeight: 400, // Reduced height to fit better
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: "#E5E5E5",
    overflow: "hidden",
    marginBottom: 16,
  },
  image: {
    width: "100%",
    height: 160, // Reduced height to fit better
    resizeMode: "cover",
  },
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 12,
    gap: 12,
  },
  tag: {
    backgroundColor: "#f1f3f4",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 4,
  },
  tagText: {
    fontSize: 11,
    color: "#6c757d",
    fontWeight: "500",
  },
  content: {
    padding: 20,
    paddingTop: 12,
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2c3e50",
    marginBottom: 16,
    lineHeight: 26,
  },
  excerpt: {
    fontSize: 14,
    color: "#6c757d",
    marginBottom: 20,
    lineHeight: 22,
  },
  authorSection: {
    marginBottom: 20,
  },
  authorText: {
    fontSize: 12,
    color: "#6c757d",
    fontStyle: "italic",
    lineHeight: 16,
  },
  actionContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 16,
  },
  readButton: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "rgba(233, 213, 255, 1)",
  },
  readButtonText: {
    color: "#8B5CF6",
    fontSize: 12,
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
