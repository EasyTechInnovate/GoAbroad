import React, { useState } from "react";
import { ScrollView, StyleSheet, View, Text, TouchableOpacity, Image, Alert, Modal } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

interface Notification {
  id: string;
  type: 'course' | 'friend_request' | 'offer' | 'like' | 'general';
  title: string;
  description: string;
  timestamp: string;
  avatar?: string;
  icon?: string;
  iconColor?: string;
  iconBgColor?: string;
  showActions?: boolean;
}

const mockNotifications: Notification[] = [
  // Today's notifications
  {
    id: "1",
    type: 'course',
    title: "Course Successfully Enrolled",
    description: "Lorem ipsum dolor sit amet consectetur. Ultricies tincidunt eleifend vitae",
    timestamp: "15 min ago",
    icon: "checkmark",
    iconColor: "#FFFFFF",
    iconBgColor: "#34C759",
  },
  {
    id: "2",
    type: 'friend_request',
    title: "Cameron Williamson",
    description: "Send you a friend request",
    timestamp: "15 min ago",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face",
    showActions: true,
  },
  {
    id: "3",
    type: 'offer',
    title: "Today's Special Offers",
    description: "Lorem ipsum dolor sit amet consectetur. Ultricies tincidunt eleifend vitae",
    timestamp: "15 min ago",
    icon: "star",
    iconColor: "#FFFFFF",
    iconBgColor: "#FFD60A",
  },
  // Yesterday's notifications
  {
    id: "4",
    type: 'like',
    title: "Bessie Cooper",
    description: "Liked your post",
    timestamp: "26 Jun 2023",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=50&h=50&fit=crop&crop=face",
  },
  {
    id: "5",
    type: 'general',
    title: "Cody Fisher",
    description: "Lorem ipsum dolor sit amet consectetur.",
    timestamp: "27 Jun 2023",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face",
  },
  {
    id: "6",
    type: 'general',
    title: "Jacob Jones",
    description: "Lorem ipsum dolor sit amet consectetur.",
    timestamp: "28 Jun 2023",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=50&h=50&fit=crop&crop=face",
  },
];

export default function NotificationScreen() {
  const [showMenu, setShowMenu] = useState(false);

  const handleBackPress = () => {
    router.back();
  };

  const handleMuteNotification = () => {
    setShowMenu(false);
    Alert.alert("Mute Notification", "Notifications have been muted");
  };

  const handleClearAll = () => {
    setShowMenu(false);
    Alert.alert("Clear All", "All notifications have been cleared");
  };

  const handleAcceptFriend = (notificationId: string) => {
    Alert.alert("Friend Request", "Friend request accepted");
  };

  const handleRejectFriend = (notificationId: string) => {
    Alert.alert("Friend Request", "Friend request rejected");
  };

  const renderNotificationIcon = (notification: Notification) => {
    if (notification.avatar) {
      return (
        <Image source={{ uri: notification.avatar }} style={styles.notificationAvatar} />
      );
    }

    return (
      <View style={[styles.notificationIcon, { backgroundColor: notification.iconBgColor }]}>
        <Ionicons 
          name={notification.icon as any} 
          size={20} 
          color={notification.iconColor} 
        />
      </View>
    );
  };

  const renderNotificationActions = (notification: Notification) => {
    if (!notification.showActions) return null;

    return (
      <View style={styles.notificationActions}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => handleRejectFriend(notification.id)}
          activeOpacity={0.7}
        >
          <Ionicons name="close" size={16} color="#FFFFFF" />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.actionButton, { backgroundColor: "#34C759" }]}
          onPress={() => handleAcceptFriend(notification.id)}
          activeOpacity={0.7}
        >
          <Ionicons name="checkmark" size={16} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    );
  };

  const todayNotifications = mockNotifications.filter(n => n.timestamp.includes("min ago"));
  const yesterdayNotifications = mockNotifications.filter(n => !n.timestamp.includes("min ago"));

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
        <Text style={styles.headerTitle}>Notification</Text>
        <TouchableOpacity 
          style={styles.menuButton} 
          onPress={() => setShowMenu(!showMenu)}
          activeOpacity={0.7}
        >
          <Ionicons name="ellipsis-vertical" size={20} color="#000" />
        </TouchableOpacity>
      </View>

      {/* Three-dot Menu */}
      {showMenu && (
        <View style={styles.menuOverlay}>
          <View style={styles.menuContainer}>
            <TouchableOpacity 
              style={styles.menuItem} 
              onPress={handleMuteNotification}
              activeOpacity={0.7}
            >
              <Text style={styles.menuItemText}>Mute Notification</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.menuItem} 
              onPress={handleClearAll}
              activeOpacity={0.7}
            >
              <Text style={styles.menuItemText}>Clear All</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* Notifications Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Today Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Today</Text>
          {todayNotifications.map((notification) => (
            <View key={notification.id} style={styles.notificationItem}>
              {renderNotificationIcon(notification)}
              <View style={styles.notificationContent}>
                <Text style={styles.notificationTitle}>{notification.title}</Text>
                <Text style={styles.notificationDescription}>{notification.description}</Text>
                <Text style={styles.notificationTimestamp}>{notification.timestamp}</Text>
              </View>
              {renderNotificationActions(notification)}
            </View>
          ))}
        </View>

        {/* Yesterday Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Yesterday</Text>
          {yesterdayNotifications.map((notification) => (
            <View key={notification.id} style={styles.notificationItem}>
              {renderNotificationIcon(notification)}
              <View style={styles.notificationContent}>
                <Text style={styles.notificationTitle}>{notification.title}</Text>
                <Text style={styles.notificationDescription}>{notification.description}</Text>
                <Text style={styles.notificationTimestamp}>{notification.timestamp}</Text>
              </View>
              {renderNotificationActions(notification)}
            </View>
          ))}
        </View>
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
  menuButton: {
    padding: 4,
  },
  menuOverlay: {
    position: "absolute",
    top: 60,
    right: 20,
    zIndex: 1000,
  },
  menuContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    borderWidth: 1,
    borderColor: "#E5E5E5",
    minWidth: 160,
  },
  menuItem: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F2F2F7",
  },
  menuItemText: {
    fontSize: 16,
    color: "#000000",
    fontWeight: "400",
  },
  content: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  section: {
    paddingHorizontal: 20,
    paddingTop: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#000000",
    marginBottom: 16,
  },
  notificationItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F2F2F7",
  },
  notificationAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F0F0F0",
    marginRight: 12,
  },
  notificationIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  notificationContent: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000000",
    marginBottom: 4,
  },
  notificationDescription: {
    fontSize: 14,
    color: "#8E8E93",
    lineHeight: 20,
    marginBottom: 4,
  },
  notificationTimestamp: {
    fontSize: 12,
    color: "#C7C7CC",
  },
  notificationActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  actionButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#FF3B30",
    justifyContent: "center",
    alignItems: "center",
  },
});