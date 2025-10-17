import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, TextInput, View, TouchableOpacity, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

import { fetchNewsData } from "@/api/newsApi";
import { News } from "@/models/News";

import NewsCard from "@/components/NewsCard";

export default function NewsScreen() {
  const router = useRouter();
  const [news, setNews] = useState<News[]>([]);
  const [search, setSearch] = useState("");
  const [filteredNews, setFilteredNews] = useState<News[]>([]);

  useEffect(() => {
    (async () => {
      const data = await fetchNewsData();
      setNews(data);
      setFilteredNews(data);
    })();
  }, []);

  useEffect(() => {
    if (search.trim() === "") {
      setFilteredNews(news);
    } else {
      const filtered = news.filter(item =>
        item.title.toLowerCase().includes(search.toLowerCase()) ||
        item.category.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredNews(filtered);
    }
  }, [search, news]);

  return (
    <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Latest News</Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search-outline" size={20} color="#7F8C8D" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search news..."
          value={search}
          onChangeText={setSearch}
          placeholderTextColor="#7F8C8D"
        />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* News List */}
        <View style={styles.newsContainer}>
          {filteredNews.map((item) => (
            <NewsCard 
              key={item.id} 
              news={item} 
              onPress={() => {
                router.push({
                  pathname: "/news-detail",
                  params: { newsId: item.id }
                });
              }}
            />
          ))}
        </View>

        {/* Empty State */}
        {filteredNews.length === 0 && (
          <View style={styles.emptyState}>
            <Ionicons name="newspaper-outline" size={64} color="#BDC3C7" />
            <Text style={styles.emptyStateTitle}>No news found</Text>
            <Text style={styles.emptyStateSubtitle}>
              Try adjusting your search or check back later for updates
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
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    position: "relative",
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "rgba(0, 33, 77, 1)",
    textAlign: "center",
    lineHeight: 24,
    letterSpacing: 0,
    width: 101,
    height: 24,
    opacity: 1,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    marginHorizontal: 20,
    marginBottom: 16,
    marginTop: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  searchIcon: {
    marginRight: 12,
    color: "#9CA3AF",
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#1F2937",
    paddingVertical: 4,
  },
  newsContainer: {
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