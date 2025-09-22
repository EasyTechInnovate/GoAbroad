import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View, Text, TouchableOpacity, Image, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

import { fetchUserProfile } from "@/api/userApi";
import { UserProfile } from "@/models/UserProfile";

export default function ProfileScreen() {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const data = await fetchUserProfile();
        setUserProfile(data);
      } catch (error) {
        console.error('Error fetching user profile:', error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleEditProfile = () => {
    console.log("Edit Profile clicked");
    // Navigate to edit profile screen
    router.push("/edit-profile");
  };

  const handleNotification = () => {
    console.log("Notification clicked");
    // Navigate to notification screen
    router.push("/notifications");
  };

  const handlePrivacyPolicy = () => {
    console.log("Privacy Policy clicked");
    // Navigate to privacy policy screen
    router.push("/privacy-policy");
  };

  const handleAboutUs = () => {
    console.log("About Us clicked");
    // Navigate to about us screen
    router.push("/about-us");
  };

  const handleLogout = () => {
    console.log("Logout clicked");
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Logout", style: "destructive", onPress: () => {
          // Handle logout logic here
          console.log("User logged out");
          // Navigate to login screen
                  router.replace("/(tabs)/tab1");
        }}
      ]
    );
  };

  const handleFollowers = () => {
    console.log("Followers clicked");
    // Navigate to followers screen
    router.push("/followers");
  };

  const handleFollowing = () => {
    console.log("Following clicked");
    // Navigate to following screen
    router.push("/following");
  };

  const handleCameraPress = () => {
    console.log("Camera clicked");
    Alert.alert("Camera", "Camera functionality will be implemented");
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading profile...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (!userProfile) {
    return (
      <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Failed to load profile</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        bounces={true}
        alwaysBounceVertical={false}
      >
        {/* Header */}
        <View style={styles.header}>
                  <TouchableOpacity 
                    style={styles.backButton} 
                    onPress={() => {
                      console.log("Back button clicked");
                      router.back();
                    }}
                    activeOpacity={0.7}
                  >
                    <Ionicons name="arrow-back" size={24} color="rgba(20, 80, 68, 1)" />
                  </TouchableOpacity>
          <Text style={styles.headerTitle}>Profile</Text>
          <View style={styles.headerSpacer} />
        </View>

        {/* Profile Section */}
        <View style={styles.profileSection}>
          <View style={styles.avatarContainer}>
            <Image source={{ uri: userProfile.avatar }} style={styles.avatar} />
            <TouchableOpacity style={styles.cameraButton} onPress={handleCameraPress}>
              <Ionicons name="camera" size={16} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
          <Text style={styles.userName}>{userProfile.name}</Text>
          <Text style={styles.userEmail}>{userProfile.email}</Text>
        </View>

        {/* Stats Section */}
        <View style={styles.statsContainer}>
          <TouchableOpacity 
            style={styles.statButton} 
            onPress={handleFollowers}
            activeOpacity={0.8}
          >
            <Text style={styles.statNumber}>6.3k</Text>
            <Text style={styles.statLabel}>followers</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.statButton} 
            onPress={handleFollowing}
            activeOpacity={0.8}
          >
            <Text style={styles.statNumber}>2.5k</Text>
            <Text style={styles.statLabel}>following</Text>
          </TouchableOpacity>
        </View>

        {/* Menu Items */}
        <View style={styles.menuContainer}>
          <TouchableOpacity 
            style={styles.menuItem} 
            onPress={handleEditProfile}
            activeOpacity={0.7}
          >
                    <View style={styles.menuItemLeft}>
                      <View style={styles.menuIconContainer}>
                        <Ionicons name="create-outline" size={18} color="rgba(20, 80, 68, 1)" />
                      </View>
                      <Text style={styles.menuItemText}>Edit Profile</Text>
                    </View>
            <Ionicons name="chevron-forward" size={14} color="#C7C7CC" />
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.menuItem} 
            onPress={handleNotification}
            activeOpacity={0.7}
          >
                    <View style={styles.menuItemLeft}>
                      <View style={styles.menuIconContainer}>
                        <Ionicons name="notifications-outline" size={18} color="rgba(20, 80, 68, 1)" />
                      </View>
                      <Text style={styles.menuItemText}>Notification</Text>
                    </View>
            <Ionicons name="chevron-forward" size={14} color="#C7C7CC" />
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.menuItem} 
            onPress={handlePrivacyPolicy}
            activeOpacity={0.7}
          >
                    <View style={styles.menuItemLeft}>
                      <View style={styles.menuIconContainer}>
                        <Ionicons name="shield-outline" size={18} color="rgba(20, 80, 68, 1)" />
                      </View>
                      <Text style={styles.menuItemText}>Privacy Policy</Text>
                    </View>
            <Ionicons name="chevron-forward" size={14} color="#C7C7CC" />
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.menuItem} 
            onPress={handleAboutUs}
            activeOpacity={0.7}
          >
                    <View style={styles.menuItemLeft}>
                      <View style={styles.menuIconContainer}>
                        <Ionicons name="information-circle-outline" size={18} color="rgba(20, 80, 68, 1)" />
                      </View>
                      <Text style={styles.menuItemText}>About Us</Text>
                    </View>
            <Ionicons name="chevron-forward" size={14} color="#C7C7CC" />
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.menuItem} 
            onPress={handleLogout}
            activeOpacity={0.7}
          >
            <View style={styles.menuItemLeft}>
              <View style={styles.menuIconContainer}>
                <Ionicons name="log-out-outline" size={18} color="#FF3B30" />
              </View>
              <Text style={[styles.menuItemText, styles.logoutText]}>Logout</Text>
            </View>
            <Ionicons name="chevron-forward" size={14} color="#C7C7CC" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: "#FFFFFF" 
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    fontSize: 16,
    color: "#666",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    fontSize: 16,
    color: "#FF3B30",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: "#FFFFFF",
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
  profileSection: {
    alignItems: "center",
    paddingVertical: 32,
    backgroundColor: "#FFFFFF",
  },
  avatarContainer: {
    position: "relative",
    marginBottom: 16,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#F0F0F0",
  },
  cameraButton: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "rgba(20, 80, 68, 1)",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: "#FFFFFF",
  },
  userName: {
    fontSize: 24,
    fontWeight: "600",
    color: "#000000",
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 16,
    color: "#8E8E93",
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    paddingVertical: 24,
    backgroundColor: "#FFFFFF",
    marginBottom: 8,
  },
  statButton: {
    backgroundColor: "rgba(232, 250, 236, 1)",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    marginHorizontal: 8,
    alignItems: "center",
    minWidth: 120,
  },
  statNumber: {
    fontSize: 18,
    fontWeight: "700",
    color: "#000000",
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 14,
    color: "#666666",
    fontWeight: "500",
  },
  menuContainer: {
    backgroundColor: "#FFFFFF",
    marginHorizontal: 20,
    marginBottom: 8,
    borderRadius: 12,
    paddingVertical: 8,
  },
  menuItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F2F2F7",
  },
  menuItemLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  menuIconContainer: {
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  menuItemText: {
    fontSize: 16,
    color: "#000000",
    marginLeft: 16,
    fontWeight: "400",
  },
  logoutText: {
    color: "#FF3B30",
  },
});