import React, { useState } from "react";
import { 
  ScrollView, 
  StyleSheet, 
  View, 
  Text, 
  TouchableOpacity, 
  Image,
  Alert 
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

interface WishlistItem {
  id: string;
  title: string;
  category: string;
  lessons: number;
  rating: number;
  reviewCount: number;
  price: number;
  image: string;
  instructor: string;
}

export default function WishlistScreen() {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([
    {
      id: "1",
      title: "IELTS Preparation Masterclass",
      category: "English Test",
      lessons: 24,
      rating: 4.9,
      reviewCount: 127,
      price: 690,
      image: "https://picsum.photos/300/200?random=9",
      instructor: "Dr. Sarah Johnson"
    },
    {
      id: "2",
      title: "University Application Essays",
      category: "Writing",
      lessons: 15,
      rating: 4.8,
      reviewCount: 89,
      price: 99,
      image: "https://picsum.photos/300/200?random=10",
      instructor: "Prof. Michael Chen"
    },
    {
      id: "3",
      title: "UI UX Design",
      category: "Design",
      lessons: 22,
      rating: 4.9,
      reviewCount: 156,
      price: 199,
      image: "https://picsum.photos/300/200?random=11",
      instructor: "Alex Rodriguez"
    },
    {
      id: "4",
      title: "Study Abroad Planning Guide",
      category: "Planning",
      lessons: 18,
      rating: 4.7,
      reviewCount: 203,
      price: 149,
      image: "https://picsum.photos/300/200?random=12",
      instructor: "Dr. Emily Watson"
    }
  ]);

  const handleRemoveFromWishlist = (itemId: string, itemTitle: string) => {
    Alert.alert(
      "Are You Sure!",
      `Remove from Wishlist ${itemTitle}`,
      [
        {
          text: "No",
          style: "cancel",
        },
        {
          text: "Yes",
          style: "destructive",
          onPress: () => {
            setWishlistItems(prev => prev.filter(item => item.id !== itemId));
          },
        },
      ]
    );
  };

  const handleCoursePress = (item: WishlistItem) => {
    router.push("/course-detail");
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Ionicons
        key={index}
        name={index < Math.floor(rating) ? "star" : "star-outline"}
        size={14}
        color="#F39C12"
      />
    ));
  };

  return (
    <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
      {/* Beautiful Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View style={styles.headerLeft}>
            <View style={styles.headerIcon}>
              <Ionicons name="heart" size={24} color="#E74C3C" />
            </View>
            <View style={styles.headerText}>
              <Text style={styles.headerTitle}>My Wishlist</Text>
              <Text style={styles.headerSubtitle}>{wishlistItems.length} courses saved</Text>
            </View>
          </View>
          <View style={styles.headerRight}>
            <TouchableOpacity style={styles.headerButton}>
              <Ionicons name="search-outline" size={20} color="#0D5543" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.headerButton}>
              <Ionicons name="filter-outline" size={20} color="#0D5543" />
            </TouchableOpacity>
          </View>
        </View>
        
        {/* Stats Row */}
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{wishlistItems.length}</Text>
            <Text style={styles.statLabel}>Total</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>
              {wishlistItems.reduce((sum, item) => sum + item.price, 0)}
            </Text>
            <Text style={styles.statLabel}>Total Value</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>
              {Math.round(wishlistItems.reduce((sum, item) => sum + item.rating, 0) / wishlistItems.length * 10) / 10}
            </Text>
            <Text style={styles.statLabel}>Avg Rating</Text>
          </View>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>

        {/* Wishlist Items */}
        <View style={styles.wishlistContainer}>
          {wishlistItems.map((item) => (
            <TouchableOpacity 
              key={item.id}
              style={styles.wishlistItem}
              onPress={() => handleCoursePress(item)}
            >
              {/* Course Image */}
              <View style={styles.imageContainer}>
                <Image source={{ uri: item.image }} style={styles.courseImage} />
              </View>

              {/* Course Info */}
              <View style={styles.courseInfo}>
                <Text style={styles.courseTitle}>{item.title}</Text>
                <Text style={styles.courseCategory}>{item.category}</Text>
                
                <View style={styles.courseStats}>
                  <View style={styles.statItem}>
                    <Ionicons name="book-outline" size={14} color="#7F8C8D" />
                    <Text style={styles.statText}>{item.lessons} Lessons</Text>
                  </View>
                </View>

                <View style={styles.ratingContainer}>
                  <View style={styles.stars}>
                    {renderStars(item.rating)}
                  </View>
                  <Text style={styles.ratingText}>
                    {item.rating} ({item.reviewCount} reviews)
                  </Text>
                </View>
              </View>

              {/* Price and Actions */}
              <View style={styles.priceActions}>
                <Text style={styles.priceText}>₹{item.price}</Text>
                <TouchableOpacity 
                  style={styles.removeButton}
                  onPress={() => handleRemoveFromWishlist(item.id, item.title)}
                >
                  <Ionicons name="heart" size={20} color="#E74C3C" />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Empty State */}
        {wishlistItems.length === 0 && (
          <View style={styles.emptyState}>
            <Ionicons name="heart-outline" size={64} color="#BDC3C7" />
            <Text style={styles.emptyStateTitle}>Your wishlist is empty</Text>
            <Text style={styles.emptyStateSubtitle}>
              Start adding courses you're interested in
            </Text>
            <TouchableOpacity 
              style={styles.browseButton}
              onPress={() => router.push("/(tabs)/tab2")}
            >
              <Text style={styles.browseButtonText}>Browse Courses</Text>
            </TouchableOpacity>
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
    backgroundColor: "#FFFFFF",
    paddingTop: 20,
    paddingBottom: 16,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  headerContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  headerIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#FDF2F2",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  headerText: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2C3E50",
    marginBottom: 2,
  },
  headerSubtitle: {
    fontSize: 14,
    color: "#7F8C8D",
    fontWeight: "500",
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F8F9FA",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 8,
    borderWidth: 1,
    borderColor: "#E5E5E5",
  },
  statsRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    backgroundColor: "#F8F9FA",
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  statItem: {
    alignItems: "center",
    flex: 1,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#0D5543",
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: "#7F8C8D",
    fontWeight: "500",
  },
  statDivider: {
    width: 1,
    height: 30,
    backgroundColor: "#E5E5E5",
    marginHorizontal: 16,
  },
  wishlistContainer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  wishlistItem: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    marginBottom: 16,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  imageContainer: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 16,
    overflow: "hidden",
  },
  courseImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  courseInfo: {
    flex: 1,
  },
  courseTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#2C3E50",
    marginBottom: 4,
  },
  courseCategory: {
    fontSize: 14,
    color: "#7F8C8D",
    marginBottom: 8,
  },
  courseStats: {
    marginBottom: 8,
  },
  statItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  statText: {
    fontSize: 12,
    color: "#7F8C8D",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stars: {
    flexDirection: "row",
    gap: 2,
  },
  ratingText: {
    fontSize: 12,
    color: "#7F8C8D",
  },
  priceActions: {
    alignItems: "center",
    gap: 8,
  },
  priceText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#0D5543",
  },
  removeButton: {
    padding: 8,
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
    marginBottom: 24,
  },
  browseButton: {
    backgroundColor: "#0D5543",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  browseButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
  },
});
