import React from "react";
import { 
  StyleSheet, 
  View, 
  Text, 
  TouchableOpacity 
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

export default function ReviewSuccessScreen() {
  const handleGotIt = () => {
    // Navigate back to course completion screen
    router.back();
  };

  return (
    <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#2C3E50" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Write a Review</Text>
        <View style={styles.headerSpacer} />
      </View>

      {/* Success Content */}
      <View style={styles.content}>
        {/* Success Icon */}
        <View style={styles.successIcon}>
          <Ionicons name="checkmark-circle" size={80} color="#27AE60" />
        </View>

        {/* Success Message */}
        <Text style={styles.successTitle}>Successfully</Text>
        <Text style={styles.successMessage}>
          Thank you so much you've just publish your review
        </Text>

        {/* Additional Info */}
        <View style={styles.infoContainer}>
          <View style={styles.infoItem}>
            <Ionicons name="star" size={20} color="#F39C12" />
            <Text style={styles.infoText}>Your review helps other students</Text>
          </View>
          <View style={styles.infoItem}>
            <Ionicons name="heart" size={20} color="#E74C3C" />
            <Text style={styles.infoText}>We appreciate your feedback</Text>
          </View>
          <View style={styles.infoItem}>
            <Ionicons name="people" size={20} color="#3498DB" />
            <Text style={styles.infoText}>Join the learning community</Text>
          </View>
        </View>
      </View>

      {/* Action Button */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={styles.gotItButton}
          onPress={handleGotIt}
        >
          <Text style={styles.gotItButtonText}>Got it</Text>
        </TouchableOpacity>
      </View>
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
  headerSpacer: {
    width: 24,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 40,
  },
  successIcon: {
    marginBottom: 32,
  },
  successTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#2C3E50",
    marginBottom: 16,
    textAlign: "center",
  },
  successMessage: {
    fontSize: 16,
    color: "#7F8C8D",
    textAlign: "center",
    lineHeight: 24,
    marginBottom: 40,
  },
  infoContainer: {
    width: "100%",
    gap: 16,
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  infoText: {
    fontSize: 16,
    color: "#2C3E50",
    fontWeight: "500",
  },
  buttonContainer: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: "#E5E5E5",
  },
  gotItButton: {
    backgroundColor: "#0D5543",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  gotItButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
});
