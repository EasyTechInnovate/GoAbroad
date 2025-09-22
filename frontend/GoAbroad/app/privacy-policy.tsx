import React from "react";
import { ScrollView, StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

export default function PrivacyPolicyScreen() {
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
          <Ionicons name="arrow-back" size={24} color="rgba(20, 80, 68, 1)" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Privacy Policy</Text>
        <TouchableOpacity 
          style={styles.menuButton} 
          activeOpacity={0.7}
        >
          <Ionicons name="menu" size={20} color="rgba(20, 80, 68, 1)" />
        </TouchableOpacity>
      </View>

      {/* Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Disclosures of Your Information Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Disclosures of Your Information</Text>
          <Text style={styles.sectionContent}>
            Food First envisions a world in which all people have access to healthy, ecologically produced, and culturally appropriate food. We believe that achieving this vision requires political transformation. We work to build a social movement for food sovereignty through research, education, and advocacy.
          </Text>
          <Text style={styles.sectionContent}>
            Our mission is to end the injustices that cause hunger, poverty, and environmental degradation throughout the world. We believe that a world based on the right to food, environmental sustainability, and social justice is possible and necessary.
          </Text>
          <Text style={styles.sectionContent}>
            We work with grassroots organizations, social movements, and policy makers to develop alternatives to the corporate food system. Our research and analysis help communities understand the root causes of hunger and develop strategies for change.
          </Text>
        </View>

        {/* Legal Disclaimer Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Legal Disclaimer</Text>
          <Text style={styles.sectionContent}>
            Food First envisions a world in which all people have access to healthy, ecologically produced, and culturally appropriate food. We believe that achieving this vision requires political transformation. We work to build a social movement for food sovereignty through research, education, and advocacy.
          </Text>
          <Text style={styles.sectionContent}>
            The information provided in this application is for educational and informational purposes only. It is not intended to be a substitute for professional advice, diagnosis, or treatment. Always seek the advice of qualified professionals regarding any questions you may have.
          </Text>
          <Text style={styles.sectionContent}>
            We make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability, or availability of the information contained in this application. Any reliance you place on such information is strictly at your own risk.
          </Text>
          <Text style={styles.sectionContent}>
            In no event will we be liable for any loss or damage including without limitation, indirect or consequential loss or damage, or any loss or damage whatsoever arising from loss of data or profits arising out of, or in connection with, the use of this application.
          </Text>
        </View>

        {/* Additional Content */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Data Collection and Usage</Text>
          <Text style={styles.sectionContent}>
            We collect information you provide directly to us, such as when you create an account, use our services, or contact us for support. This may include your name, email address, phone number, and other information you choose to provide.
          </Text>
          <Text style={styles.sectionContent}>
            We use the information we collect to provide, maintain, and improve our services, process transactions, send you technical notices and support messages, and communicate with you about products, services, and events.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Information Sharing</Text>
          <Text style={styles.sectionContent}>
            We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in this privacy policy. We may share your information in certain limited circumstances, such as to comply with legal obligations or protect our rights.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Contact Information</Text>
          <Text style={styles.sectionContent}>
            If you have any questions about this Privacy Policy, please contact us at privacy@goabroad.com or through our support channels within the application.
          </Text>
        </View>

        {/* Bottom Spacing */}
        <View style={styles.bottomSpacing} />
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
  content: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  section: {
    paddingHorizontal: 20,
    paddingVertical: 24,
    borderBottomWidth: 1,
    borderBottomColor: "#F2F2F7",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#000000",
    marginBottom: 16,
    lineHeight: 28,
  },
  sectionContent: {
    fontSize: 16,
    color: "#333333",
    lineHeight: 24,
    marginBottom: 16,
    textAlign: "left",
  },
  bottomSpacing: {
    height: 40,
  },
});