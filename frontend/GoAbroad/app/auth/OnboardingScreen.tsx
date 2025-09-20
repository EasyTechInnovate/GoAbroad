import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Dimensions,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

const { width } = Dimensions.get('window');

const onboardingData = [
  {
    id: 1,
    title: "Learning never stops",
    subtitle:
      "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis",
    illustration: require("@/assets/images/intro1.png.png"),
  },
  {
    id: 2,
    title: "Anywhere and anytime",
    subtitle:
      "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis",
    illustration: require("@/assets/images/intro2.png.png"),
  },
  {
    id: 3,
    title: "Expand your knowledge",
    subtitle:
      "Amet minim mollit non deserunt est sit aliqua dolor do amet sin officia consequat duis",
    illustration: require("@/assets/images/intro3.png.png"),
  },
];

export default function OnboardingScreen() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    if (currentIndex < onboardingData.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      router.replace("/auth/WelcomeScreen");
    }
  };

  const handleSkip = () => {
    router.replace("/auth/WelcomeScreen");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Skip Button */}
        <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>

        {/* Illustration */}
        <View style={styles.illustrationContainer}>
          <Image 
            source={onboardingData[currentIndex].illustration} 
            style={styles.illustration}
            resizeMode="contain"
          />
        </View>

        {/* Content */}
        <View style={styles.textContainer}>
          <Text style={styles.title}>
            {onboardingData[currentIndex].title}
          </Text>
          <Text style={styles.subtitle}>
            {onboardingData[currentIndex].subtitle}
          </Text>
        </View>

        {/* Bottom Section */}
        <View style={styles.bottomSection}>
          {/* Dots Indicator */}
          <View style={styles.dotsContainer}>
            {onboardingData.map((_, index) => (
              <View
                key={index}
                style={[styles.dot, index === currentIndex && styles.activeDot]}
              />
            ))}
          </View>

          {/* Next Button */}
          <View style={styles.nextButtonContainer}>
            <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
              <Ionicons name="arrow-forward" size={24} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFFFFF" },
  content: { flex: 1, paddingHorizontal: 24, paddingTop: 60 },
  skipButton: {
    alignSelf: "flex-end",
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginTop: 10,
  },
  skipText: { fontSize: 16, color: "#6B7280", fontWeight: "500" },
  illustrationContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
    paddingHorizontal: 20,
  },
  illustration: {
    width: width * 0.9,
    height: width * 0.9,
    maxWidth: 400,
    maxHeight: 400,
  },
  textContainer: { paddingHorizontal: 20, marginBottom: 60 },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#111827",
    textAlign: "center",
    marginBottom: 16,
    lineHeight: 40,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 16,
    color: "#6B7280",
    textAlign: "center",
    lineHeight: 24,
    paddingHorizontal: 10,
  },
  bottomSection: { alignItems: "center", paddingHorizontal: 20, paddingBottom: 50 },
  dotsContainer: { flexDirection: "row", alignItems: "center", marginBottom: 30 },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#D1D5DB",
    marginHorizontal: 4,
  },
  activeDot: { backgroundColor: "#0D5543", width: 24, height: 8, borderRadius: 4 },
  nextButtonContainer: { alignItems: "center" },
  nextButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#0D5543",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#0D5543",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
});
