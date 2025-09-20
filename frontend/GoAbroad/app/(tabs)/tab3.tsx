import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, TextInput, View, TouchableOpacity, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

import { fetchNewsData } from "@/api/newsApi";
import { News } from "@/models/News";

import NewsCard from "@/components/NewsCard";

export default function NewsScreen() {
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
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Latest News</Text>
          <TouchableOpacity style={styles.filterButton}>
            <Ionicons name="filter-outline" size={24} color="#2C3E50" />
          </TouchableOpacity>
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

        {/* Category Filter */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.categoryContainer}
          contentContainerStyle={styles.categoryContent}
        >
          <TouchableOpacity style={styles.categoryButton}>
            <Text style={styles.categoryText}>All News</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.categoryButton}>
            <Text style={styles.categoryText}>Visa Updates</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.categoryButton}>
            <Text style={styles.categoryText}>University News</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.categoryButton}>
            <Text style={styles.categoryText}>Scholarships</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.categoryButton}>
            <Text style={styles.categoryText}>Requirements</Text>
          </TouchableOpacity>
        </ScrollView>

        {/* News List */}
        <View style={styles.newsContainer}>
          {filteredNews.map((item) => (
            <NewsCard key={item.id} news={item} />
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
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2C3E50",
  },
  filterButton: {
    padding: 8,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#2C3E50",
  },
  categoryContainer: {
    marginBottom: 20,
  },
  categoryContent: {
    paddingHorizontal: 20,
  },
  categoryButton: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  categoryText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#2C3E50",
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