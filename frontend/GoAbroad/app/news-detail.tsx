import React, { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter, useLocalSearchParams } from "expo-router";
import { News } from "@/models/News";
import { fetchNewsData } from "@/api/newsApi";

export default function NewsDetailScreen() {
  const router = useRouter();
  const { newsId } = useLocalSearchParams();
  const [news, setNews] = useState<News | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadNews = async () => {
      try {
        const newsData = await fetchNewsData();
        const selectedNews = newsData.find((item) => item.id === newsId);
        setNews(selectedNews || null);
      } catch (error) {
        console.error("Error loading news:", error);
      } finally {
        setLoading(false);
      }
    };

    if (newsId) {
      loadNews();
    }
  }, [newsId]);

  if (loading) {
    return (
      <View style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text>Loading...</Text>
        </View>
      </View>
    );
  }

  if (!news) {
    return (
      <View style={styles.container}>
        <View style={styles.errorContainer}>
          <Text>News not found</Text>
          <TouchableOpacity onPress={() => router.back()}>
            <Text>Go Back</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color="#2C3E50" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Latest News</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView 
        showsVerticalScrollIndicator={true}
        contentContainerStyle={styles.scrollContent}
        style={styles.scrollView}
        bounces={true}
        alwaysBounceVertical={true}
        scrollEnabled={true}
      >
        <View style={styles.newsCard}>
          {/* Main Image */}
          <Image source={{ uri: news.image }} style={styles.mainImage} />

          {/* Tags Section */}
          <View style={styles.tagsContainer}>
            <View style={[styles.tag, styles.primaryTag]}>
              <Text style={styles.primaryTagText}>{news.category}</Text>
            </View>
            <View style={[styles.tag, styles.secondaryTag]}>
              <Text style={styles.secondaryTagText}>Scholarships</Text>
            </View>
            <View style={[styles.tag, styles.secondaryTag]}>
              <Text style={styles.secondaryTagText}>{news.publishedAt}</Text>
            </View>
          </View>

          {/* Content */}
          <View style={styles.content}>
            {/* Title */}
            <Text style={styles.title}>{news.title}</Text>

            {/* Excerpt */}
            <Text style={styles.excerpt}>{news.excerpt}</Text>

            {/* Full Content */}
            <Text style={styles.fullContent}>
              {news.content || news.excerpt}
            </Text>

            {/* Additional Informative Content */}
            <Text style={styles.sectionTitle}>Key Highlights:</Text>
            <Text style={styles.bulletPoint}>• Comprehensive coverage of the latest developments in international education</Text>
            <Text style={styles.bulletPoint}>• Expert insights from industry professionals and academic advisors</Text>
            <Text style={styles.bulletPoint}>• Updated information on visa requirements and application processes</Text>
            <Text style={styles.bulletPoint}>• Exclusive interviews with successful international students</Text>

            <Text style={styles.sectionTitle}>What This Means for You:</Text>
            <Text style={styles.additionalContent}>
              This development represents a significant opportunity for students planning to study abroad. The changes outlined in this article could impact your application timeline, required documentation, and overall preparation strategy. We recommend reviewing the specific requirements for your target country and university to ensure you're fully prepared for the application process.
            </Text>

            <Text style={styles.sectionTitle}>Next Steps:</Text>
            <Text style={styles.bulletPoint}>• Review the updated requirements for your target universities</Text>
            <Text style={styles.bulletPoint}>• Schedule a consultation with our education advisors</Text>
            <Text style={styles.bulletPoint}>• Update your application timeline accordingly</Text>
            <Text style={styles.bulletPoint}>• Stay informed about future updates through our newsletter</Text>

            {/* Author Info */}
            <View style={styles.authorSection}>
              <Text style={styles.authorText}>By {news.author}</Text>
              <Text style={styles.publishDate}>{news.publishedAt}</Text>
            </View>

            {/* Action Buttons */}
            <View style={styles.actionContainer}>
              <TouchableOpacity style={styles.likeButton}>
                <Ionicons
                  name={news.isLiked ? "heart" : "heart-outline"}
                  size={20}
                  color={news.isLiked ? "#e74c3c" : "#95a5a6"}
                />
                <Text style={styles.buttonText}>Like</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.shareButton}>
                <Ionicons
                  name="share-outline"
                  size={20}
                  color="#95a5a6"
                />
                <Text style={styles.buttonText}>Share</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
  newsCard: {
    backgroundColor: "rgba(255, 255, 255, 1)",
    width: "100%",
    borderRadius: 8.53,
    opacity: 1,
    marginHorizontal: 4,
    marginTop: 8,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4.27,
    },
    shadowOpacity: 0.1,
    shadowRadius: 6.4,
    elevation: 8,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    height: 75.09333038330078,
    top: 40.45,
    opacity: 1,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
    position: "absolute",
    zIndex: 1000,
  },
  backButton: {
    padding: 6,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "rgba(0, 33, 77, 1)",
    textAlign: "center",
  },
  headerSpacer: {
    width: 32, // Same width as back button to center the title
  },
  mainImage: {
    width: "100%",
    height: 150,
    resizeMode: "cover",
    borderTopLeftRadius: 8.53,
    borderTopRightRadius: 8.53,
  },
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 6,
    paddingTop: 8,
    paddingBottom: 4,
    gap: 4,
  },
  tag: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 4,
  },
  primaryTag: {
    backgroundColor: "#8B5CF6", // Purple background
  },
  secondaryTag: {
    backgroundColor: "#F3F4F6", // Light gray background
  },
  primaryTagText: {
    fontSize: 12,
    color: "#FFFFFF",
    fontWeight: "600",
  },
  secondaryTagText: {
    fontSize: 12,
    color: "#6B7280",
    fontWeight: "500",
  },
  content: {
    padding: 6,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1F2937",
    marginBottom: 8,
    lineHeight: 22,
  },
  excerpt: {
    fontSize: 12,
    color: "#6B7280",
    marginBottom: 12,
    lineHeight: 18,
    fontStyle: "italic",
  },
  fullContent: {
    fontSize: 12,
    color: "#374151",
    marginBottom: 12,
    lineHeight: 20,
  },
  additionalContent: {
    fontSize: 12,
    color: "#374151",
    marginBottom: 10,
    lineHeight: 18,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1F2937",
    marginBottom: 4,
    marginTop: 10,
  },
  bulletPoint: {
    fontSize: 12,
    color: "#374151",
    marginBottom: 4,
    lineHeight: 16,
    paddingLeft: 10,
  },
  authorSection: {
    marginBottom: 12,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
  },
  authorText: {
    fontSize: 12,
    color: "#6B7280",
    fontWeight: "500",
    marginBottom: 4,
  },
  publishDate: {
    fontSize: 10,
    color: "#9CA3AF",
  },
  actionContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 12,
    paddingBottom: 8,
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
  },
  likeButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: "#F8F9FA",
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  shareButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: "#F8F9FA",
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  buttonText: {
    color: "#6B7280",
    fontSize: 12,
    fontWeight: "500",
    marginLeft: 6,
  },
  heartButton: {
    padding: 8,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  scrollView: {
    flex: 1,
    marginTop: 120, // Space for fixed header
  },
  scrollContent: {
    paddingBottom: 20,
    flexGrow: 1,
  },
});
