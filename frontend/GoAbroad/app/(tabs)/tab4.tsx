import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, TextInput, View, TouchableOpacity, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

import { fetchBlogsData } from "@/api/blogApi";
import { Blog } from "@/models/Blog";

import BlogCard from "@/components/BlogCard";

export default function BlogsScreen() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [search, setSearch] = useState("");
  const [filteredBlogs, setFilteredBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    (async () => {
      const data = await fetchBlogsData();
      setBlogs(data);
      setFilteredBlogs(data);
    })();
  }, []);

  useEffect(() => {
    if (search.trim() === "") {
      setFilteredBlogs(blogs);
    } else {
      const filtered = blogs.filter(blog =>
        blog.title.toLowerCase().includes(search.toLowerCase()) ||
        blog.excerpt.toLowerCase().includes(search.toLowerCase()) ||
        blog.category.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredBlogs(filtered);
    }
  }, [search, blogs]);

  return (
    <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Blogs & Guides</Text>
          <TouchableOpacity style={styles.filterButton}>
            <Ionicons name="filter-outline" size={24} color="#2C3E50" />
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Ionicons name="search-outline" size={20} color="#7F8C8D" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search blogs..."
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
            <Text style={styles.categoryText}>All Topics</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.categoryButton}>
            <Text style={styles.categoryText}>SOP Writing</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.categoryButton}>
            <Text style={styles.categoryText}>Student Life</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.categoryButton}>
            <Text style={styles.categoryText}>University Selection</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.categoryButton}>
            <Text style={styles.categoryText}>Test Preparation</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.categoryButton}>
            <Text style={styles.categoryText}>Finance</Text>
          </TouchableOpacity>
        </ScrollView>

        {/* Blogs List */}
        <View style={styles.blogsContainer}>
          {filteredBlogs.map((blog) => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </View>

        {/* Empty State */}
        {filteredBlogs.length === 0 && (
          <View style={styles.emptyState}>
            <Ionicons name="document-text-outline" size={64} color="#BDC3C7" />
            <Text style={styles.emptyStateTitle}>No blogs found</Text>
            <Text style={styles.emptyStateSubtitle}>
              Try adjusting your search or check back later for new content
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
  blogsContainer: {
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