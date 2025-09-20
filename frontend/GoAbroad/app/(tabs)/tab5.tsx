import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View, Text, TouchableOpacity, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

import { fetchUserProfile } from "@/api/userApi";
import { UserProfile } from "@/models/UserProfile";

import ProfileHeader from "@/components/ProfileHeader";
import ProfileStats from "@/components/ProfileStats";
import ProfileMenuItem from "@/components/ProfileMenuItem";

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
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Profile</Text>
          <TouchableOpacity style={styles.settingsButton}>
            <Ionicons name="settings-outline" size={24} color="#2C3E50" />
          </TouchableOpacity>
        </View>

        {/* Profile Header */}
        <ProfileHeader user={userProfile} />
        
        {/* Profile Stats */}
        <ProfileStats 
          followers={userProfile.followers}
          following={userProfile.following}
          courses={12}
          achievements={8}
        />

        {/* Quick Actions */}
        <View style={styles.quickActionsContainer}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActions}>
            <TouchableOpacity style={styles.quickActionButton}>
              <View style={styles.quickActionIcon}>
                <Ionicons name="bookmark-outline" size={24} color="#0D5543" />
              </View>
              <Text style={styles.quickActionText}>Saved</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quickActionButton}>
              <View style={styles.quickActionIcon}>
                <Ionicons name="calendar-outline" size={24} color="#0D5543" />
              </View>
              <Text style={styles.quickActionText}>Schedule</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quickActionButton}>
              <View style={styles.quickActionIcon}>
                <Ionicons name="document-text-outline" size={24} color="#0D5543" />
              </View>
              <Text style={styles.quickActionText}>Applications</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quickActionButton}>
              <View style={styles.quickActionIcon}>
                <Ionicons name="help-circle-outline" size={24} color="#0D5543" />
              </View>
              <Text style={styles.quickActionText}>Help</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Account Section */}
        <View style={styles.menuContainer}>
          <Text style={styles.menuTitle}>Account</Text>
          
          <ProfileMenuItem
            icon="person-outline"
            title="Edit Profile"
            subtitle="Update your personal information"
            onPress={() => {}}
          />
          
          <ProfileMenuItem
            icon="heart-outline"
            title="Wishlist"
            subtitle="View your saved courses"
            onPress={() => router.push("/wishlist")}
          />
          
          <ProfileMenuItem
            icon="document-text-outline"
            title="My Applications"
            subtitle="Track your university applications"
            onPress={() => {}}
          />
          
          <ProfileMenuItem
            icon="calendar-outline"
            title="Appointments"
            subtitle="Schedule counseling sessions"
            onPress={() => {}}
          />
        </View>

        {/* Support Section */}
        <View style={styles.menuContainer}>
          <Text style={styles.menuTitle}>Support</Text>
          
          <ProfileMenuItem
            icon="help-circle-outline"
            title="Help Center"
            subtitle="Get answers to common questions"
            onPress={() => {}}
          />
          
          <ProfileMenuItem
            icon="chatbubble-outline"
            title="Contact Support"
            subtitle="Reach out to our team"
            onPress={() => {}}
          />
          
          <ProfileMenuItem
            icon="star-outline"
            title="Rate App"
            subtitle="Share your feedback"
            onPress={() => {}}
          />
        </View>

        {/* Settings Section */}
        <View style={styles.menuContainer}>
          <Text style={styles.menuTitle}>Settings</Text>
          
          <ProfileMenuItem
            icon="notifications-outline"
            title="Notifications"
            subtitle="View and manage your notifications"
            onPress={() => router.push("/notifications")}
          />
          
          <ProfileMenuItem
            icon="language-outline"
            title="Language"
            subtitle="Change app language"
            onPress={() => router.push("/language")}
          />
          
          <ProfileMenuItem
            icon="shield-outline"
            title="Privacy Policy"
            subtitle="Read our privacy policy"
            onPress={() => router.push("/privacy-policy")}
          />
          
          <ProfileMenuItem
            icon="information-circle-outline"
            title="About Us"
            subtitle="Learn more about GoAbroad"
            onPress={() => router.push("/about-us")}
          />
          
          <ProfileMenuItem
            icon="log-out-outline"
            title="Sign Out"
            subtitle="Sign out of your account"
            onPress={() => {}}
            isDestructive={true}
          />
        </View>
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
  settingsButton: {
    padding: 8,
  },
  quickActionsContainer: {
    backgroundColor: "#FFFFFF",
    marginHorizontal: 20,
    marginBottom: 8,
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2C3E50",
    marginBottom: 16,
  },
  quickActions: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  quickActionButton: {
    alignItems: "center",
    flex: 1,
  },
  quickActionIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#EBF3FD",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  quickActionText: {
    fontSize: 12,
    fontWeight: "500",
    color: "#2C3E50",
  },
  menuContainer: {
    backgroundColor: "#fff",
    marginHorizontal: 20,
    marginVertical: 8,
    borderRadius: 12,
    paddingVertical: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  menuTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2c3e50",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
});