import React from "react";
import { 
  ScrollView, 
  StyleSheet, 
  View, 
  Text, 
  TouchableOpacity 
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

export default function AboutUsScreen() {
  const teamMembers = [
    { name: "Dr. Sarah Johnson", role: "CEO & Founder", image: "👩‍💼" },
    { name: "Prof. Michael Chen", role: "Academic Director", image: "👨‍🏫" },
    { name: "Alex Rodriguez", role: "Head of Technology", image: "👨‍💻" },
    { name: "Dr. Emily Watson", role: "Student Success Manager", image: "👩‍🎓" }
  ];

  const stats = [
    { number: "50K+", label: "Students Helped" },
    { number: "500+", label: "Universities Partnered" },
    { number: "95%", label: "Success Rate" },
    { number: "24/7", label: "Support Available" }
  ];

  return (
    <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#2C3E50" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>About Us</Text>
        <View style={styles.headerSpacer} />
      </View>

      {/* Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.contentContainer}>
          {/* Hero Section */}
          <View style={styles.heroSection}>
            <View style={styles.logoContainer}>
              <Text style={styles.logo}>🌍</Text>
            </View>
            <Text style={styles.appName}>GoAbroad</Text>
            <Text style={styles.tagline}>Your Gateway to Global Education</Text>
            <Text style={styles.version}>Version 1.0.0</Text>
          </View>

          {/* Our History */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Our History</Text>
            <Text style={styles.sectionText}>
              GoAbroad envisions a world in which all students have access to quality education and study abroad opportunities. After years of analysis of the global education system, we know that making this vision a reality involves more than technical solutions—it requires comprehensive support and guidance.
            </Text>
            <Text style={styles.sectionText}>
              That's why GoAbroad supports students, educational institutions, and partners working for educational excellence. Our work—including comprehensive course offerings, expert guidance, and personalized support—gives you the tools to understand global education opportunities, build your academic profile, and engage with the international education community.
            </Text>
          </View>

          {/* Our Mission */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Our Mission</Text>
            <Text style={styles.sectionText}>
              To democratize access to quality education and study abroad opportunities by providing comprehensive guidance, expert support, and innovative technology solutions that empower students to achieve their academic and career goals.
            </Text>
          </View>

          {/* Statistics */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Our Impact</Text>
            <View style={styles.statsContainer}>
              {stats.map((stat, index) => (
                <View key={index} style={styles.statItem}>
                  <Text style={styles.statNumber}>{stat.number}</Text>
                  <Text style={styles.statLabel}>{stat.label}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Our Team */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Our Team</Text>
            <View style={styles.teamContainer}>
              {teamMembers.map((member, index) => (
                <View key={index} style={styles.teamMember}>
                  <Text style={styles.memberImage}>{member.image}</Text>
                  <Text style={styles.memberName}>{member.name}</Text>
                  <Text style={styles.memberRole}>{member.role}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* What We Offer */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>What We Offer</Text>
            <View style={styles.featuresContainer}>
              <View style={styles.featureItem}>
                <Ionicons name="book-outline" size={24} color="#0D5543" />
                <Text style={styles.featureText}>Comprehensive Course Library</Text>
              </View>
              <View style={styles.featureItem}>
                <Ionicons name="people-outline" size={24} color="#0D5543" />
                <Text style={styles.featureText}>Expert Mentorship</Text>
              </View>
              <View style={styles.featureItem}>
                <Ionicons name="school-outline" size={24} color="#0D5543" />
                <Text style={styles.featureText}>University Partnerships</Text>
              </View>
              <View style={styles.featureItem}>
                <Ionicons name="chatbubble-outline" size={24} color="#0D5543" />
                <Text style={styles.featureText}>24/7 Support</Text>
              </View>
              <View style={styles.featureItem}>
                <Ionicons name="document-text-outline" size={24} color="#0D5543" />
                <Text style={styles.featureText}>Application Assistance</Text>
              </View>
              <View style={styles.featureItem}>
                <Ionicons name="card-outline" size={24} color="#0D5543" />
                <Text style={styles.featureText}>Scholarship Guidance</Text>
              </View>
            </View>
          </View>

          {/* Contact Information */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Get in Touch</Text>
            <View style={styles.contactContainer}>
              <TouchableOpacity style={styles.contactItem}>
                <Ionicons name="mail-outline" size={20} color="#0D5543" />
                <Text style={styles.contactText}>info@goabroad.com</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.contactItem}>
                <Ionicons name="call-outline" size={20} color="#0D5543" />
                <Text style={styles.contactText}>+1 (555) 123-4567</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.contactItem}>
                <Ionicons name="location-outline" size={20} color="#0D5543" />
                <Text style={styles.contactText}>123 Education Street, Learning City</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Social Media */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Follow Us</Text>
            <View style={styles.socialContainer}>
              <TouchableOpacity style={styles.socialButton}>
                <Ionicons name="logo-facebook" size={24} color="#1877F2" />
                <Text style={styles.socialText}>Facebook</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.socialButton}>
                <Ionicons name="logo-twitter" size={24} color="#1DA1F2" />
                <Text style={styles.socialText}>Twitter</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.socialButton}>
                <Ionicons name="logo-instagram" size={24} color="#E4405F" />
                <Text style={styles.socialText}>Instagram</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.socialButton}>
                <Ionicons name="logo-linkedin" size={24} color="#0077B5" />
                <Text style={styles.socialText}>LinkedIn</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Copyright */}
          <View style={styles.copyrightSection}>
            <Text style={styles.copyrightText}>
              © 2025 GoAbroad. All rights reserved.
            </Text>
            <Text style={styles.copyrightText}>
              Made with ❤️ for students worldwide
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
  heroSection: {
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    padding: 32,
    borderRadius: 16,
    marginBottom: 24,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  logoContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#EBF3FD",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  logo: {
    fontSize: 40,
  },
  appName: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#2C3E50",
    marginBottom: 8,
  },
  tagline: {
    fontSize: 16,
    color: "#7F8C8D",
    marginBottom: 8,
  },
  version: {
    fontSize: 14,
    color: "#BDC3C7",
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
  statsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 16,
  },
  statItem: {
    flex: 1,
    minWidth: "45%",
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#0D5543",
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: "#7F8C8D",
    textAlign: "center",
  },
  teamContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 16,
  },
  teamMember: {
    flex: 1,
    minWidth: "45%",
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  memberImage: {
    fontSize: 32,
    marginBottom: 8,
  },
  memberName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#2C3E50",
    marginBottom: 4,
    textAlign: "center",
  },
  memberRole: {
    fontSize: 14,
    color: "#7F8C8D",
    textAlign: "center",
  },
  featuresContainer: {
    gap: 12,
  },
  featureItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    gap: 12,
  },
  featureText: {
    fontSize: 16,
    color: "#2C3E50",
    fontWeight: "500",
  },
  contactContainer: {
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
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
  socialContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  socialButton: {
    flex: 1,
    minWidth: "45%",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    gap: 12,
  },
  socialText: {
    fontSize: 16,
    color: "#2C3E50",
    fontWeight: "500",
  },
  copyrightSection: {
    alignItems: "center",
    paddingVertical: 24,
    borderTopWidth: 1,
    borderTopColor: "#E5E5E5",
    marginTop: 16,
  },
  copyrightText: {
    fontSize: 14,
    color: "#7F8C8D",
    textAlign: "center",
    marginBottom: 4,
  },
});
