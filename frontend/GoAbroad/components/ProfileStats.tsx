import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface ProfileStatsProps {
  followers: number;
  following: number;
  courses: number;
  achievements: number;
}

export default function ProfileStats({ followers, following, courses, achievements }: ProfileStatsProps) {
  return (
    <View style={styles.container}>
      <View style={styles.statItem}>
        <Text style={styles.statNumber}>{followers.toLocaleString()}</Text>
        <Text style={styles.statLabel}>Followers</Text>
      </View>
      <View style={styles.statItem}>
        <Text style={styles.statNumber}>{following.toLocaleString()}</Text>
        <Text style={styles.statLabel}>Following</Text>
      </View>
      <View style={styles.statItem}>
        <Text style={styles.statNumber}>{courses}</Text>
        <Text style={styles.statLabel}>Courses</Text>
      </View>
      <View style={styles.statItem}>
        <Text style={styles.statNumber}>{achievements}</Text>
        <Text style={styles.statLabel}>Achievements</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#fff",
    marginHorizontal: 16,
    marginBottom: 8,
    borderRadius: 12,
    paddingVertical: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  statItem: {
    flex: 1,
    alignItems: "center",
  },
  statNumber: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#2c3e50",
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: "#7f8c8d",
    fontWeight: "500",
  },
});