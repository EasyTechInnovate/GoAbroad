import React, { useState } from "react";
import { ScrollView, StyleSheet, View, Text, TouchableOpacity, Image, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";

interface User {
  id: string;
  name: string;
  handle: string;
  avatar: string;
  isFollowing: boolean;
}

const mockUsers: User[] = [
  {
    id: "1",
    name: "Shah Rukh Khan",
    handle: "@srk",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face",
    isFollowing: true,
  },
  {
    id: "2",
    name: "Robert Downey Jr.",
    handle: "@robertdowney",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face",
    isFollowing: true,
  },
  {
    id: "3",
    name: "Tom Cruise",
    handle: "@tomcruise",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=50&h=50&fit=crop&crop=face",
    isFollowing: true,
  },
  {
    id: "4",
    name: "Elizabeth",
    handle: "@elizabeth",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=50&h=50&fit=crop&crop=face",
    isFollowing: true,
  },
  {
    id: "5",
    name: "Kate Winslet",
    handle: "@katewinslet",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop&crop=face",
    isFollowing: true,
  },
  {
    id: "6",
    name: "Saoirse Hopper",
    handle: "@saoirsehopper",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=50&h=50&fit=crop&crop=face",
    isFollowing: true,
  },
  {
    id: "7",
    name: "Melina Charlton",
    handle: "@melinacharlton",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=50&h=50&fit=crop&crop=face",
    isFollowing: true,
  },
];

export default function FollowersScreen() {
  const [users, setUsers] = useState<User[]>(mockUsers);

  const handleFollowToggle = (userId: string) => {
    setUsers(prevUsers =>
      prevUsers.map(user =>
        user.id === userId
          ? { ...user, isFollowing: !user.isFollowing }
          : user
      )
    );
  };

  const handleBackPress = () => {
    router.back();
  };

  return (
    <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={handleBackPress}
          activeOpacity={0.7}
        >
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Following (6.3k)</Text>
        <View style={styles.headerSpacer} />
      </View>

      {/* Users List */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {users.map((user) => (
          <View key={user.id} style={styles.userItem}>
            <Image source={{ uri: user.avatar }} style={styles.userAvatar} />
            <View style={styles.userInfo}>
              <Text style={styles.userName}>{user.name}</Text>
              <Text style={styles.userHandle}>{user.handle}</Text>
            </View>
            <TouchableOpacity
              onPress={() => handleFollowToggle(user.id)}
              activeOpacity={0.7}
            >
              {user.isFollowing ? (
                <View style={styles.followingButton}>
                  <Text style={styles.followingButtonText}>Following</Text>
                </View>
              ) : (
                <LinearGradient
                  colors={['rgba(22, 163, 74, 1)', 'rgba(20, 80, 68, 1)']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.followButtonGradient}
                >
                  <Text style={styles.followButtonText}>Follow</Text>
                </LinearGradient>
              )}
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#F2F2F7",
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000000",
  },
  headerSpacer: {
    width: 32,
  },
  content: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  userItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F2F2F7",
  },
  userAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#F0F0F0",
    marginRight: 12,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000000",
    marginBottom: 2,
  },
  userHandle: {
    fontSize: 14,
    color: "#8E8E93",
  },
  followButtonGradient: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  followingButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#F2F2F7",
    borderWidth: 1,
    borderColor: "#C7C7CC",
    alignItems: "center",
    justifyContent: "center",
  },
  followButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  followingButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#8E8E93",
  },
});
