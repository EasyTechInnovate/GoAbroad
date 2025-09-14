import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface BlogCardProps {
  imageUrl: string;
  category: string;
  readTime: string;
  publishedAt: string;
  title: string;
  description: string;
  authorName: string;
}

const BlogCard: React.FC<BlogCardProps> = ({
  imageUrl,
  category,
  readTime,
  publishedAt,
  title,
  description,
  authorName,
}) => {
  return (
    <View style={styles.card}>
      {/* Image */}
      <Image source={{ uri: imageUrl }} style={styles.image} />

      {/* Content */}
      <View style={styles.content}>
        {/* Top Row */}
        <View style={styles.row}>
          <Text style={styles.tag}>{category}</Text>
          <Text style={styles.meta}>{readTime}</Text>
          <Text style={styles.meta}>{publishedAt}</Text>
        </View>

        {/* Title */}
        <Text style={styles.title}>{title}</Text>

        {/* Description */}
        <Text style={styles.description}>{description}</Text>

        {/* Author */}
        <View style={styles.authorRow}>
          <Ionicons name="person-circle-outline" size={18} color="green" />
          <Text style={styles.author}>By {authorName}</Text>
        </View>

        {/* Button & Actions */}
        <View style={styles.footer}>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Read Full Post</Text>
          </TouchableOpacity>

          <View style={styles.actions}>
            <Ionicons name="heart-outline" size={18} color="gray" />
            <Ionicons
              name="share-social-outline"
              size={18}
              color="gray"
              style={{ marginLeft: 8 }}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default BlogCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    marginVertical: 10,
    marginHorizontal: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: 160,
  },
  content: {
    padding: 12,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  tag: {
    backgroundColor: "#E6F8EF",
    color: "green",
    fontSize: 12,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
    marginRight: 8,
  },
  meta: {
    fontSize: 12,
    color: "gray",
    marginRight: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 6,
  },
  description: {
    fontSize: 13,
    color: "#444",
    marginBottom: 10,
  },
  authorRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  author: {
    fontSize: 12,
    color: "#222",
    marginLeft: 4,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#E6F8EF",
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "green",
  },
  buttonText: {
    fontSize: 13,
    fontWeight: "500",
    color: "green",
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
  },
});
