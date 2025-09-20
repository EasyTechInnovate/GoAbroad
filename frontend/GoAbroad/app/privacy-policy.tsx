import React from "react";
import { 
  ScrollView, 
  StyleSheet, 
  View, 
  Text 
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

export default function PrivacyPolicyScreen() {
  return (
    <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#2C3E50" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Privacy Policy</Text>
        <View style={styles.headerSpacer} />
      </View>

      {/* Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.contentContainer}>
          {/* Last Updated */}
          <View style={styles.lastUpdated}>
            <Ionicons name="calendar-outline" size={16} color="#7F8C8D" />
            <Text style={styles.lastUpdatedText}>Last updated: September 14, 2025</Text>
          </View>

          {/* Introduction */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Introduction</Text>
            <Text style={styles.sectionText}>
              Welcome to GoAbroad. We are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our mobile application and related services.
            </Text>
          </View>

          {/* Information We Collect */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Information We Collect</Text>
            <Text style={styles.sectionText}>
              We collect information you provide directly to us, such as when you create an account, enroll in courses, or contact us for support. This may include your name, email address, phone number, educational background, and payment information.
            </Text>
            <Text style={styles.sectionText}>
              We also automatically collect certain information about your device and usage patterns, including your IP address, device type, operating system, and app usage data.
            </Text>
          </View>

          {/* How We Use Your Information */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>How We Use Your Information</Text>
            <Text style={styles.sectionText}>
              We use the information we collect to provide, maintain, and improve our services, process transactions, send you technical notices and support messages, and communicate with you about products, services, and promotional offers.
            </Text>
          </View>

          {/* Disclosures of Your Information */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Disclosures of Your Information</Text>
            <Text style={styles.sectionText}>
              We may share your information in the following circumstances:
            </Text>
            <Text style={styles.bulletPoint}>
              • With service providers who assist us in operating our platform
            </Text>
            <Text style={styles.bulletPoint}>
              • When required by law or to protect our rights and safety
            </Text>
            <Text style={styles.bulletPoint}>
              • In connection with a business transfer or acquisition
            </Text>
            <Text style={styles.bulletPoint}>
              • With your explicit consent for other purposes
            </Text>
          </View>

          {/* Data Security */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Data Security</Text>
            <Text style={styles.sectionText}>
              We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet or electronic storage is 100% secure.
            </Text>
          </View>

          {/* Your Rights */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Your Rights</Text>
            <Text style={styles.sectionText}>
              You have the right to access, update, or delete your personal information. You may also opt out of certain communications from us. To exercise these rights, please contact us using the information provided below.
            </Text>
          </View>

          {/* Legal Disclaimer */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Legal Disclaimer</Text>
            <Text style={styles.sectionText}>
              GoAbroad envisions a world in which all students have access to quality education and study abroad opportunities. After years of analysis of the global education system, we know that making this vision a reality involves more than technical solutions—it requires comprehensive support and guidance.
            </Text>
            <Text style={styles.sectionText}>
              That's why GoAbroad supports students, educational institutions, and partners working for educational excellence. Our work—including comprehensive course offerings, expert guidance, and personalized support—gives you the tools to understand global education opportunities, build your academic profile, and engage with the international education community.
            </Text>
          </View>

          {/* Contact Information */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Contact Us</Text>
            <Text style={styles.sectionText}>
              If you have any questions about this Privacy Policy or our privacy practices, please contact us at:
            </Text>
            <View style={styles.contactInfo}>
              <View style={styles.contactItem}>
                <Ionicons name="mail-outline" size={16} color="#0D5543" />
                <Text style={styles.contactText}>privacy@goabroad.com</Text>
              </View>
              <View style={styles.contactItem}>
                <Ionicons name="call-outline" size={16} color="#0D5543" />
                <Text style={styles.contactText}>+1 (555) 123-4567</Text>
              </View>
              <View style={styles.contactItem}>
                <Ionicons name="location-outline" size={16} color="#0D5543" />
                <Text style={styles.contactText}>123 Education Street, Learning City, LC 12345</Text>
              </View>
            </View>
          </View>

          {/* Changes to Privacy Policy */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Changes to This Privacy Policy</Text>
            <Text style={styles.sectionText}>
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date. You are advised to review this Privacy Policy periodically for any changes.
            </Text>
          </View>
        </View>
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
  headerSpacer: {
    width: 24,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingVertical: 24,
  },
  lastUpdated: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EBF3FD",
    padding: 12,
    borderRadius: 8,
    marginBottom: 24,
    gap: 8,
  },
  lastUpdatedText: {
    fontSize: 14,
    color: "#2C3E50",
    fontWeight: "500",
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#2C3E50",
    marginBottom: 12,
  },
  sectionText: {
    fontSize: 16,
    color: "#2C3E50",
    lineHeight: 24,
    marginBottom: 12,
  },
  bulletPoint: {
    fontSize: 16,
    color: "#2C3E50",
    lineHeight: 24,
    marginBottom: 8,
    marginLeft: 16,
  },
  contactInfo: {
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 8,
    marginTop: 12,
    gap: 12,
  },
  contactItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  contactText: {
    fontSize: 16,
    color: "#2C3E50",
  },
});
