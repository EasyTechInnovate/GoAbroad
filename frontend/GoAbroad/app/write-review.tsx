import React, { useState } from "react";
import { 
  StyleSheet, 
  View, 
  Text, 
  TouchableOpacity, 
  TextInput,
  ScrollView 
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

export default function WriteReviewScreen() {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const courseData = {
    title: "UI UX Design",
    instructor: "Dr. Sarah Johnson"
  };

  const handleRatingPress = (selectedRating: number) => {
    setRating(selectedRating);
  };

  const handleSubmitReview = async () => {
    if (rating === 0) {
      alert("Please select a rating");
      return;
    }

    if (comment.trim().length < 10) {
      alert("Please write at least 10 characters for your review");
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      router.push("/review-success");
    }, 1500);
  };

  const renderStars = () => {
    return Array.from({ length: 5 }, (_, index) => (
      <TouchableOpacity
        key={index}
        onPress={() => handleRatingPress(index + 1)}
        style={styles.starButton}
      >
        <Ionicons
          name={index < rating ? "star" : "star-outline"}
          size={32}
          color={index < rating ? "#F39C12" : "#BDC3C7"}
        />
      </TouchableOpacity>
    ));
  };

  return (
    <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="#2C3E50" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Write a Review</Text>
          <View style={styles.headerSpacer} />
        </View>

        {/* Content */}
        <View style={styles.content}>
          {/* Course Info */}
          <View style={styles.courseInfo}>
            <Text style={styles.courseTitle}>{courseData.title}</Text>
            <Text style={styles.instructor}>by {courseData.instructor}</Text>
          </View>

          {/* Review Prompt */}
          <View style={styles.reviewPrompt}>
            <Text style={styles.promptTitle}>Review your experience</Text>
            <Text style={styles.promptSubtitle}>
              How would you rate your overall experience with this course?
            </Text>
          </View>

          {/* Rating Section */}
          <View style={styles.ratingSection}>
            <Text style={styles.sectionTitle}>Select Rating</Text>
            <View style={styles.starsContainer}>
              {renderStars()}
            </View>
            {rating > 0 && (
              <Text style={styles.ratingText}>
                {rating} {rating === 1 ? 'star' : 'stars'}
              </Text>
            )}
          </View>

          {/* Comment Section */}
          <View style={styles.commentSection}>
            <Text style={styles.sectionTitle}>Write a Comment</Text>
            <TextInput
              style={styles.commentInput}
              placeholder="Share your experience...."
              placeholderTextColor="#BDC3C7"
              value={comment}
              onChangeText={setComment}
              multiline
              numberOfLines={6}
              textAlignVertical="top"
            />
            <Text style={styles.characterCount}>
              {comment.length}/500 characters
            </Text>
          </View>

          {/* Tips */}
          <View style={styles.tipsSection}>
            <Text style={styles.tipsTitle}>Review Tips:</Text>
            <Text style={styles.tipItem}>• Be honest about your experience</Text>
            <Text style={styles.tipItem}>• Mention what you liked most</Text>
            <Text style={styles.tipItem}>• Suggest improvements if any</Text>
            <Text style={styles.tipItem}>• Keep it constructive and helpful</Text>
          </View>
        </View>
      </ScrollView>

      {/* Submit Button */}
      <View style={styles.submitContainer}>
        <TouchableOpacity 
          style={[
            styles.submitButton,
            (rating === 0 || comment.trim().length < 10) && styles.submitButtonDisabled
          ]}
          onPress={handleSubmitReview}
          disabled={rating === 0 || comment.trim().length < 10 || isSubmitting}
        >
          <Text style={styles.submitButtonText}>
            {isSubmitting ? "Publishing..." : "Published Review"}
          </Text>
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
    paddingHorizontal: 20,
    paddingVertical: 24,
  },
  courseInfo: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderRadius: 12,
    marginBottom: 24,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  courseTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#2C3E50",
    marginBottom: 4,
  },
  instructor: {
    fontSize: 16,
    color: "#7F8C8D",
  },
  reviewPrompt: {
    marginBottom: 32,
  },
  promptTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2C3E50",
    marginBottom: 8,
  },
  promptSubtitle: {
    fontSize: 16,
    color: "#7F8C8D",
    lineHeight: 24,
  },
  ratingSection: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderRadius: 12,
    marginBottom: 24,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#2C3E50",
    marginBottom: 16,
  },
  starsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 12,
  },
  starButton: {
    marginHorizontal: 8,
  },
  ratingText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#0D5543",
    textAlign: "center",
  },
  commentSection: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderRadius: 12,
    marginBottom: 24,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  commentInput: {
    borderWidth: 1,
    borderColor: "#E5E5E5",
    borderRadius: 8,
    padding: 16,
    fontSize: 16,
    color: "#2C3E50",
    minHeight: 120,
    marginBottom: 8,
  },
  characterCount: {
    fontSize: 12,
    color: "#7F8C8D",
    textAlign: "right",
  },
  tipsSection: {
    backgroundColor: "#EBF3FD",
    padding: 16,
    borderRadius: 8,
    marginBottom: 24,
  },
  tipsTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#2C3E50",
    marginBottom: 8,
  },
  tipItem: {
    fontSize: 14,
    color: "#7F8C8D",
    marginBottom: 4,
  },
  submitContainer: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: "#E5E5E5",
  },
  submitButton: {
    backgroundColor: "#0D5543",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  submitButtonDisabled: {
    backgroundColor: "#BDC3C7",
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
});
