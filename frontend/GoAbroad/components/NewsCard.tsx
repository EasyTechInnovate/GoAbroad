import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface NewsCardProps {
  id: string;
  imageUrl: string;
  source: string;
  category: string;
  publishedAt: string;
  title: string;
  description: string;
  onPress?: (id: string) => void; // for navigation
}

const NewsCard: React.FC<NewsCardProps> = ({
  id,
  imageUrl,
  source,
  category,
  publishedAt,
  title,
  description,
  onPress,
}) => {
  return (
    <View style={styles.card}>
      {/* Image */}
      <Image source={{ uri: imageUrl }} style={styles.image} />

      {/* Meta Info */}
      <View style={styles.metaRow}>
        <Text style={styles.tag}>{source}</Text>
        <Text style={styles.tag}>{category}</Text>
        <Text style={styles.time}>{publishedAt}</Text>
      </View>

      {/* Title */}
      <Text style={styles.title}>{title}</Text>

      {/* Description */}
      <Text style={styles.description} numberOfLines={3}>
        {description}
      </Text>

      {/* Footer Actions */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.readMoreBtn}
          onPress={() => onPress && onPress(id)}
        >
          <Text style={styles.readMoreText}>Read More</Text>
        </TouchableOpacity>

        <View style={styles.actions}>
          <TouchableOpacity style={styles.iconBtn}>
            <Ionicons name="heart-outline" size={20} color="#444" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconBtn}>
            <Ionicons name="share-social-outline" size={20} color="#444" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default NewsCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
    padding: 12,
  },
  image: {
    width: "100%",
    height: 180,
    // borderRadius: 12,
    borderTopRightRadius:12,
    borderTopLeftRadius:12,
    marginBottom: 10,
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  tag: {
    fontSize: 12,
    color: "#6C63FF",
    fontWeight: "600",
    marginRight: 8,
  },
  time: {
    fontSize: 12,
    color: "gray",
    marginLeft: "auto",
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 6,
    color: "#222",
  },
  description: {
    fontSize: 14,
    color: "#555",
    marginBottom: 12,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  readMoreBtn: {
    backgroundColor: "#F3EFFF",
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 14,
  },
  readMoreText: {
    color: "#6C63FF",
    fontWeight: "600",
    fontSize: 14,
  },
  actions: {
    flexDirection: "row",
  },
  iconBtn: {
    marginLeft: 12,
  },
});
