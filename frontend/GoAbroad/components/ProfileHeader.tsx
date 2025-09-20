import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { UserProfile } from "@/models/UserProfile";

interface ProfileHeaderProps {
  user: UserProfile;
}

export default function ProfileHeader({ user }: ProfileHeaderProps) {
  return (
    <View style={styles.container}>
      <View style={styles.profileSection}>
        <Image source={{ uri: user.avatar }} style={styles.avatar} />
        <View style={styles.userInfo}>
          <Text style={styles.name}>{user.name}</Text>
          <Text style={styles.email}>{user.email}</Text>
        </View>
        <TouchableOpacity style={styles.editButton}>
          <Ionicons name="create-outline" size={20} color="#3498db" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingVertical: 20,
    marginBottom: 8,
  },
  profileSection: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 16,
  },
  userInfo: {
    flex: 1,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2c3e50",
    marginBottom: 4,
  },
  email: {
    fontSize: 16,
    color: "#7f8c8d",
  },
  editButton: {
    padding: 8,
    backgroundColor: "#ebf3fd",
    borderRadius: 20,
  },
});