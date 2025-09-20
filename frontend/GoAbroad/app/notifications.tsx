import React, { useState } from "react";
import { 
  ScrollView, 
  StyleSheet, 
  View, 
  Text, 
  TouchableOpacity, 
  Alert 
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  type: 'enrollment' | 'offer' | 'friend_request' | 'course_update' | 'general';
  isRead: boolean;
}

export default function NotificationScreen() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      title: "Course Successfully Enrolled",
      message: "You have successfully enrolled in UI UX Design course",
      time: "15 min ago",
      type: "enrollment",
      isRead: false
    },
    {
      id: "2",
      title: "Today's Special Offers",
      message: "Get 50% off on IELTS Preparation courses",
      time: "1 hour ago",
      type: "offer",
      isRead: false
    },
    {
      id: "3",
      title: "Cameron Williamson",
      message: "Send you a friend request",
      time: "2 hours ago",
      type: "friend_request",
      isRead: true
    },
    {
      id: "4",
      title: "Cameron Williamson",
      message: "Send you a friend request",
      time: "3 hours ago",
      type: "friend_request",
      isRead: true
    },
    {
      id: "5",
      title: "Course Update",
      message: "New lesson added to IELTS Preparation course",
      time: "5 hours ago",
      type: "course_update",
      isRead: true
    },
    {
      id: "6",
      title: "Cameron Williamson",
      message: "Send you a friend request",
      time: "1 day ago",
      type: "friend_request",
      isRead: true
    }
  ]);

  const handleMarkAsRead = (notificationId: string) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === notificationId 
          ? { ...notif, isRead: true }
          : notif
      )
    );
  };

  const handleDeleteNotification = (notificationId: string) => {
    Alert.alert(
      "Delete Notification",
      "Are you sure you want to delete this notification?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            setNotifications(prev => prev.filter(notif => notif.id !== notificationId));
          }
        }
      ]
    );
  };

  const handleClearAll = () => {
    Alert.alert(
      "Clear All Notifications",
      "Are you sure you want to clear all notifications?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Clear All",
          style: "destructive",
          onPress: () => setNotifications([])
        }
      ]
    );
  };

  const handleMuteNotifications = () => {
    Alert.alert(
      "Mute Notifications",
      "You can manage notification settings in your device settings.",
      [{ text: "OK" }]
    );
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'enrollment':
        return <Ionicons name="checkmark-circle" size={24} color="#27AE60" />;
      case 'offer':
        return <Ionicons name="gift" size={24} color="#F39C12" />;
      case 'friend_request':
        return <Ionicons name="person-add" size={24} color="#3498DB" />;
      case 'course_update':
        return <Ionicons name="book" size={24} color="#9B59B6" />;
      default:
        return <Ionicons name="notifications" size={24} color="#7F8C8D" />;
    }
  };

  const unreadCount = notifications.filter(notif => !notif.isRead).length;

  return (
    <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#2C3E50" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notification</Text>
        <View style={styles.headerActions}>
          <TouchableOpacity onPress={handleMuteNotifications} style={styles.headerButton}>
            <Text style={styles.headerButtonText}>Mute Notification</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleClearAll} style={styles.headerButton}>
            <Text style={styles.headerButtonText}>Clear All</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Notifications List */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Today Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Today</Text>
          
          {notifications.filter(notif => !notif.isRead).map((notification) => (
            <View key={notification.id} style={[styles.notificationItem, !notification.isRead && styles.unreadNotification]}>
              <View style={styles.notificationIcon}>
                {getNotificationIcon(notification.type)}
              </View>
              
              <View style={styles.notificationContent}>
                <Text style={[styles.notificationTitle, !notification.isRead && styles.unreadTitle]}>
                  {notification.title}
                </Text>
                <Text style={styles.notificationMessage}>
                  {notification.message}
                </Text>
                <Text style={styles.notificationTime}>
                  {notification.time}
                </Text>
              </View>

              <View style={styles.notificationActions}>
                {!notification.isRead && (
                  <TouchableOpacity 
                    style={styles.actionButton}
                    onPress={() => handleMarkAsRead(notification.id)}
                  >
                    <Ionicons name="checkmark" size={16} color="#27AE60" />
                  </TouchableOpacity>
                )}
                <TouchableOpacity 
                  style={styles.actionButton}
                  onPress={() => handleDeleteNotification(notification.id)}
                >
                  <Ionicons name="close" size={16} color="#E74C3C" />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>

        {/* Earlier Section */}
        {notifications.filter(notif => notif.isRead).length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Earlier</Text>
            
            {notifications.filter(notif => notif.isRead).map((notification) => (
              <View key={notification.id} style={styles.notificationItem}>
                <View style={styles.notificationIcon}>
                  {getNotificationIcon(notification.type)}
                </View>
                
                <View style={styles.notificationContent}>
                  <Text style={styles.notificationTitle}>
                    {notification.title}
                  </Text>
                  <Text style={styles.notificationMessage}>
                    {notification.message}
                  </Text>
                  <Text style={styles.notificationTime}>
                    {notification.time}
                  </Text>
                </View>

                <View style={styles.notificationActions}>
                  <TouchableOpacity 
                    style={styles.actionButton}
                    onPress={() => handleDeleteNotification(notification.id)}
                  >
                    <Ionicons name="close" size={16} color="#E74C3C" />
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        )}

        {/* Empty State */}
        {notifications.length === 0 && (
          <View style={styles.emptyState}>
            <Ionicons name="notifications-outline" size={64} color="#BDC3C7" />
            <Text style={styles.emptyStateTitle}>No notifications</Text>
            <Text style={styles.emptyStateSubtitle}>
              You're all caught up! New notifications will appear here.
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
    backgroundColor: "#F8F9FA",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: "#FFFFFF",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2C3E50",
  },
  headerActions: {
    flexDirection: "row",
    gap: 16,
  },
  headerButton: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  headerButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#0D5543",
  },
  content: {
    flex: 1,
  },
  section: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#2C3E50",
    marginBottom: 16,
  },
  notificationItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  unreadNotification: {
    borderLeftWidth: 4,
    borderLeftColor: "#0D5543",
  },
  notificationIcon: {
    marginRight: 12,
    marginTop: 2,
  },
  notificationContent: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#2C3E50",
    marginBottom: 4,
  },
  unreadTitle: {
    fontWeight: "bold",
  },
  notificationMessage: {
    fontSize: 14,
    color: "#7F8C8D",
    lineHeight: 20,
    marginBottom: 8,
  },
  notificationTime: {
    fontSize: 12,
    color: "#BDC3C7",
  },
  notificationActions: {
    flexDirection: "row",
    gap: 8,
    marginLeft: 12,
  },
  actionButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#F8F9FA",
    justifyContent: "center",
    alignItems: "center",
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
