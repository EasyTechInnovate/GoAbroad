import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as Progress from "react-native-progress";

interface Topic {
  id: string;
  title: string;
  lessons: string[];
}

interface CourseCardProps {
  id: string;
  imageUrl: string;
  title: string;
  professor: string;
  duration: string;
  weeks: string;
  videos: number;
  category: string;
  description: string;
  progress: number; // 0 - 1
  topics: Topic[];
  onContinue?: (id: string) => void;
  onPreview?: (id: string) => void;
}

const CourseCard: React.FC<CourseCardProps> = ({
  id,
  imageUrl,
  title,
  professor,
  duration,
  weeks,
  videos,
  category,
  description,
  progress,
  topics,
  onContinue,
  onPreview,
}) => {
  return (
    <View style={styles.card}>
      {/* Course Banner */}
      <Image source={{ uri: imageUrl }} style={styles.image} />

      {/* Title & Instructor */}
      <Text style={styles.title}>{title}</Text>
      <View style={styles.metaRow}>
        <Ionicons name="person-outline" size={16} color="#555" />
        <Text style={styles.meta}>{professor}</Text>
        <Text style={styles.meta}> • {weeks}</Text>
        <Text style={styles.meta}> • {videos} videos</Text>
      </View>

      {/* Category */}
      <Text style={styles.category}>{category}</Text>

      {/* Description */}
      <Text style={styles.description}>{description}</Text>

      {/* Progress */}
      <View style={styles.progressRow}>
        <Text style={styles.progressLabel}>Progress</Text>
        <Text style={styles.progressPercent}>{Math.round(progress * 100)}%</Text>
      </View>
      <Progress.Bar
        progress={progress}
        width={null}
        height={6}
        borderRadius={3}
        color="#3b82f6"
        unfilledColor="#e5e7eb"
        borderWidth={0}
      />

      {/* Topics */}
      <Text style={styles.sectionTitle}>Course Topics</Text>
      <FlatList
        data={topics}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.topicBox}>
            <Text style={styles.topicTitle}>{item.title}</Text>
            {item.lessons.map((lesson, idx) => (
              <Text key={idx} style={styles.lesson}>
                • {lesson}
              </Text>
            ))}
          </View>
        )}
      />

      {/* Buttons */}
      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={styles.primaryBtn}
          onPress={() => onContinue && onContinue(id)}
        >
          <Text style={styles.primaryBtnText}>Continue Course</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.secondaryBtn}
          onPress={() => onPreview && onPreview(id)}
        >
          <Text style={styles.secondaryBtnText}>Preview</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CourseCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 20,
    padding: 16,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  image: {
    width: "100%",
    height: 160,
    borderRadius: 10,
    marginBottom: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111",
    marginBottom: 4,
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  meta: {
    fontSize: 13,
    color: "#555",
    marginLeft: 4,
  },
  category: {
    color: "#2563eb",
    fontWeight: "600",
    marginBottom: 8,
    fontSize: 13,
  },
  description: {
    fontSize: 14,
    color: "#555",
    marginBottom: 12,
  },
  progressRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  progressLabel: {
    fontSize: 13,
    fontWeight: "600",
  },
  progressPercent: {
    fontSize: 13,
    fontWeight: "600",
    color: "#2563eb",
  },
  sectionTitle: {
    marginTop: 16,
    fontSize: 15,
    fontWeight: "700",
    marginBottom: 8,
  },
  topicBox: {
    backgroundColor: "#f9fafb",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  topicTitle: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 4,
  },
  lesson: {
    fontSize: 13,
    color: "#444",
    marginLeft: 6,
  },
  buttonRow: {
    flexDirection: "row",
    marginTop: 16,
  },
  primaryBtn: {
    flex: 1,
    backgroundColor: "#2563eb",
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
    marginRight: 8,
  },
  primaryBtnText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 14,
  },
  secondaryBtn: {
    flex: 1,
    backgroundColor: "#f3f4f6",
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  secondaryBtnText: {
    color: "#2563eb",
    fontWeight: "600",
    fontSize: 14,
  },
});
