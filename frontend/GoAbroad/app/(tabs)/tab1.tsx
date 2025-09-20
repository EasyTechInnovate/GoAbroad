import React, { useEffect, useState, useRef } from "react";
import { FlatList, StyleSheet, TextInput, View, Text, TouchableOpacity, Image, ScrollView, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

import { fetchHomeData } from "@/api/homeApi";
import { HomeResponse } from "@/models/Home";

export default function HomeScreen() {
  const [homeData, setHomeData] = useState<HomeResponse | null>(null);
  const [search, setSearch] = useState("");
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
  const bannerScrollRef = useRef<ScrollView>(null);

  const bannerData = [
    {
      id: 1,
      title: "Get Cashback 30% Off",
      subtitle: "Shop Now",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=200&fit=crop",
      backgroundColor: "#FF6B6B"
    },
    {
      id: 2,
      title: "International Day of Education",
      subtitle: "Learn More",
      image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&h=200&fit=crop",
      backgroundColor: "#4ECDC4"
    },
    {
      id: 3,
      title: "New Courses Available",
      subtitle: "Explore Now",
      image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=200&fit=crop",
      backgroundColor: "#45B7D1"
    }
  ];

  useEffect(() => {
    (async () => {
      const data = await fetchHomeData();
      setHomeData(data);
    })();
  }, []);

  if (!homeData) return null;

  return (
    <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
      <ScrollView 
        style={styles.scrollView} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        bounces={true}
        scrollEventThrottle={16}
      >
        {/* Status Bar */}
        <View style={styles.statusBar}>
          <Text style={styles.timeText}>9:41</Text>
          <View style={styles.statusIcons}>
            <Ionicons name="cellular" size={16} color="#000" />
            <Ionicons name="wifi" size={16} color="#000" />
            <Ionicons name="battery-full" size={16} color="#000" />
          </View>
        </View>

        {/* Header */}
        <View style={styles.header}>
          <View style={styles.userInfo}>
            <Image source={{ uri: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=50&h=50&fit=crop&crop=face" }} style={styles.profileImage} />
            <Text style={styles.greetingText}>Hello, Ibne Riead</Text>
          </View>
          <TouchableOpacity style={styles.notificationButton}>
            <Ionicons name="notifications" size={20} color="#000" />
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <TouchableOpacity 
          style={styles.searchContainer}
          onPress={() => router.push("/search")}
        >
          <Ionicons name="search-outline" size={20} color="#7F8C8D" style={styles.searchIcon} />
          <Text style={styles.searchPlaceholder}>Search for 'Courses', 'MIT', 'Colleges', 'Friends'</Text>
        </TouchableOpacity>

        {/* Scrollable Banner Carousel */}
        <View style={styles.bannerCarouselContainer}>
          <ScrollView
            ref={bannerScrollRef}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onMomentumScrollEnd={(event) => {
              const index = Math.round(event.nativeEvent.contentOffset.x / (Dimensions.get('window').width - 40));
              setCurrentBannerIndex(index);
            }}
            style={styles.bannerScrollView}
          >
            {/* Banner 1 */}
            <View style={styles.bannerSlide}>
              <View style={styles.premiumBannerMain}>
                <View style={styles.bannerHeader}>
                  <View style={styles.crownIconContainer}>
                    <Ionicons name="star" size={16} color="#FFD700" />
                  </View>
                  <TouchableOpacity style={styles.closeButton}>
                    <Ionicons name="close" size={16} color="#FFFFFF" />
                  </TouchableOpacity>
                </View>
                <View style={styles.bannerContent}>
                  <Text style={styles.bannerMainText}>Fully personalised counselling now from the comfort of your home.</Text>
                  <TouchableOpacity style={styles.premiumLink}>
                    <Text style={styles.premiumLinkText}>Check Out Premium</Text>
                    <Ionicons name="chevron-forward" size={14} color="#FFD700" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            {/* Banner 2 */}
            <View style={styles.bannerSlide}>
              <View style={styles.premiumBannerMain}>
                <View style={styles.bannerHeader}>
                  <View style={styles.crownIconContainer}>
                    <Ionicons name="star" size={16} color="#FFD700" />
                  </View>
                  <TouchableOpacity style={styles.closeButton}>
                    <Ionicons name="close" size={16} color="#FFFFFF" />
                  </TouchableOpacity>
                </View>
                <View style={styles.bannerContent}>
                  <Text style={styles.bannerMainText}>Get Cashback 30% Off on all premium courses.</Text>
                  <TouchableOpacity style={styles.premiumLink}>
                    <Text style={styles.premiumLinkText}>Shop Now</Text>
                    <Ionicons name="chevron-forward" size={14} color="#FFD700" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            {/* Banner 3 */}
            <View style={styles.bannerSlide}>
              <View style={styles.premiumBannerMain}>
                <View style={styles.bannerHeader}>
                  <View style={styles.crownIconContainer}>
                    <Ionicons name="star" size={16} color="#FFD700" />
                  </View>
                  <TouchableOpacity style={styles.closeButton}>
                    <Ionicons name="close" size={16} color="#FFFFFF" />
                  </TouchableOpacity>
                </View>
                <View style={styles.bannerContent}>
                  <Text style={styles.bannerMainText}>International Day of Education - Special offers available.</Text>
                  <TouchableOpacity style={styles.premiumLink}>
                    <Text style={styles.premiumLinkText}>Learn More</Text>
                    <Ionicons name="chevron-forward" size={14} color="#FFD700" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </ScrollView>
          
          {/* Experience Card */}
          <View style={styles.experienceCard}>
            <View style={styles.experienceContent}>
              <View style={styles.experienceIconContainer}>
                <Ionicons name="star" size={20} color="#FFD700" />
              </View>
              <View style={styles.experienceTextContainer}>
                <Text style={styles.experienceYears}>15+ Years</Text>
                <Text style={styles.experienceLabel}>Counselling Experience</Text>
              </View>
            </View>
          </View>

          {/* Carousel Indicators */}
          <View style={styles.carouselIndicators}>
            {[0, 1, 2].map((index) => (
              <View
                key={index}
                style={[
                  styles.indicatorDot,
                  index === currentBannerIndex && styles.activeIndicatorDot
                ]}
              />
            ))}
          </View>
        </View>

        {/* Experience Section */}
        <View style={styles.experienceSection}>
          <Text style={styles.experienceText}>15+ Years Counselling Experience</Text>
        </View>

        {/* Popular Courses Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Popular Courses</Text>
          <TouchableOpacity>
            <Text style={styles.seeAllText}>See All</Text>
          </TouchableOpacity>
        </View>

        {/* Course Cards */}
        <View style={styles.coursesContainer}>
          <View style={styles.courseCard}>
            <Image source={{ uri: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=300&h=150&fit=crop" }} style={styles.courseCardImage} />
            <View style={styles.courseCardContent}>
              <Text style={styles.courseCardTitle}>IELTS Preparation Masterclass</Text>
              <Text style={styles.courseCardLessons}>24 Lessons</Text>
              <View style={styles.courseCardProgressContainer}>
                <Text style={styles.courseCardProgressText}>Progress 20%</Text>
                <View style={styles.courseCardProgressBar}>
                  <View style={[styles.courseCardProgressFill, { width: '20%' }]} />
                </View>
              </View>
              <View style={styles.courseCardPriceContainer}>
                <Text style={styles.courseCardPrice}>₹690.00</Text>
                <TouchableOpacity style={styles.heartIcon}>
                  <Ionicons name="heart-outline" size={20} color="#E74C3C" />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View style={styles.courseCard}>
            <Image source={{ uri: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=300&h=150&fit=crop" }} style={styles.courseCardImage} />
            <View style={styles.courseCardContent}>
              <Text style={styles.courseCardTitle}>University Application Essays</Text>
              <Text style={styles.courseCardLessons}>15 Lessons</Text>
              <View style={styles.courseCardProgressContainer}>
                <Text style={styles.courseCardProgressText}>Progress 50%</Text>
                <View style={styles.courseCardProgressBar}>
                  <View style={[styles.courseCardProgressFill, { width: '50%' }]} />
                </View>
              </View>
              <View style={styles.courseCardPriceContainer}>
                <Text style={styles.courseCardPrice}>₹99.00</Text>
                <TouchableOpacity style={styles.heartIcon}>
                  <Ionicons name="heart-outline" size={20} color="#E74C3C" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>

        {/* International Travel Education Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>International Travel Education</Text>
        </View>
        <View style={styles.educationContainer}>
          <Image source={{ uri: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=200&fit=crop" }} style={styles.educationImage} />
        </View>

        {/* Latest News Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Latest News</Text>
          <TouchableOpacity>
            <Text style={styles.seeAllText}>See All</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.newsContainer}>
          <View style={styles.newsCard}>
            <Image source={{ uri: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=200&h=120&fit=crop" }} style={styles.newsImage} />
            <View style={styles.newsOverlay}>
              <View style={styles.newsContent}>
                <Text style={styles.newsTitle}>Will AI take our jobs? Lorem ipsum dolor sit amet consectetur.</Text>
                <View style={styles.newsActions}>
                  <TouchableOpacity style={styles.newsActionButton}>
                    <Ionicons name="heart-outline" size={16} color="#FFFFFF" />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.newsActionButton}>
                    <Ionicons name="share-outline" size={16} color="#FFFFFF" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>

          <View style={styles.newsCard}>
            <Image source={{ uri: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=200&h=120&fit=crop" }} style={styles.newsImage} />
            <View style={styles.newsOverlay}>
              <View style={styles.newsContent}>
                <Text style={styles.newsTitle}>Will AI take our jobs? Lorem ipsum dolor sit amet consectetur.</Text>
                <View style={styles.newsActions}>
                  <TouchableOpacity style={styles.newsActionButton}>
                    <Ionicons name="heart-outline" size={16} color="#FFFFFF" />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.newsActionButton}>
                    <Ionicons name="share-outline" size={16} color="#FFFFFF" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* Recent Blogs Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Blogs</Text>
          <TouchableOpacity>
            <Text style={styles.seeAllText}>See All</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.blogsContainer}>
          <View style={styles.blogCard}>
            <View style={styles.blogCardHeader}>
              <TouchableOpacity style={styles.messageButton}>
                <Ionicons name="chatbubble-outline" size={16} color="#7F8C8D" />
              </TouchableOpacity>
            </View>
            <View style={styles.blogInfo}>
              <Text style={styles.blogTitle}>10 Tips for Writing a Standout SOP</Text>
              <Text style={styles.blogDescription}>Learn how to craft a compelling Statement of Purpose...</Text>
              <View style={styles.blogFooter}>
                <View style={styles.readTimePill}>
                  <Text style={styles.readTimeText}>5 min read</Text>
                </View>
                <View style={styles.blogActions}>
                  <TouchableOpacity style={styles.actionButton}>
                    <Ionicons name="bookmark-outline" size={16} color="#7F8C8D" />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.actionButton}>
                    <Ionicons name="heart-outline" size={16} color="#7F8C8D" />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.actionButton}>
                    <Ionicons name="share-outline" size={16} color="#7F8C8D" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>

          <View style={styles.blogCard}>
            <View style={styles.blogCardHeader}>
              <TouchableOpacity style={styles.messageButton}>
                <Ionicons name="chatbubble-outline" size={16} color="#7F8C8D" />
              </TouchableOpacity>
            </View>
            <View style={styles.blogInfo}>
              <Text style={styles.blogTitle}>Student Life in the US vs UK</Text>
              <Text style={styles.blogDescription}>A comprehensive comparison of student experiences...</Text>
              <View style={styles.blogFooter}>
                <View style={styles.readTimePill}>
                  <Text style={styles.readTimeText}>8 min read</Text>
                </View>
                <View style={styles.blogActions}>
                  <TouchableOpacity style={styles.actionButton}>
                    <Ionicons name="bookmark-outline" size={16} color="#7F8C8D" />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.actionButton}>
                    <Ionicons name="heart-outline" size={16} color="#7F8C8D" />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.actionButton}>
                    <Ionicons name="share-outline" size={16} color="#7F8C8D" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* Bottom Spacing for Tab Bar */}
        <View style={styles.bottomSpacing} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: "#FFFFFF" 
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  statusBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 5,
  },
  timeText: {
    fontSize: 17,
    fontWeight: "600",
    color: "#000000",
  },
  statusIcons: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  greetingText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000000",
  },
  profileImage: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E5E5E5",
  },
  notificationButton: {
    padding: 8,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F8F9FA",
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: "#E5E5E5",
  },
  searchIcon: {
    marginRight: 12,
  },
  searchPlaceholder: {
    flex: 1,
    fontSize: 16,
    color: "#7F8C8D",
  },
  bannerCarouselContainer: {
    marginBottom: 20,
  },
  bannerScrollView: {
    height: 200,
  },
  bannerSlide: {
    width: Dimensions.get('window').width - 40,
    marginHorizontal: 20,
  },
  premiumBannerMain: {
    backgroundColor: "#1E3A8A",
    borderRadius: 16,
    paddingHorizontal: 20,
    paddingVertical: 16,
    position: "relative",
    height: 160,
  },
  bannerHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  crownIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
  },
  closeButton: {
    padding: 4,
  },
  bannerContent: {
    alignItems: "center",
  },
  bannerMainText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
    textAlign: "center",
    marginBottom: 12,
    lineHeight: 22,
  },
  premiumLink: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  premiumLinkText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  experienceCard: {
    backgroundColor: "#FFFFFF",
    marginHorizontal: 20,
    marginTop: 12,
    marginBottom: 12,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  experienceContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  experienceIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#FFF8DC",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  experienceTextContainer: {
    flex: 1,
  },
  experienceYears: {
    fontSize: 16,
    fontWeight: "700",
    color: "#000000",
    marginBottom: 2,
  },
  experienceLabel: {
    fontSize: 14,
    color: "#7F8C8D",
  },
  carouselIndicators: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    gap: 6,
  },
  indicatorDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#FF6B6B",
  },
  activeIndicatorDot: {
    backgroundColor: "#1E3A8A",
    width: 20,
  },
  premiumBanner: {
    backgroundColor: "#1E3A8A",
    marginHorizontal: 20,
    marginBottom: 16,
    borderRadius: 12,
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  bannerTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
    marginBottom: 12,
    lineHeight: 22,
  },
  premiumButton: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    alignSelf: "flex-start",
  },
  premiumButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1E3A8A",
  },
  experienceSection: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  experienceText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000000",
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000000",
  },
  seeAllText: {
    fontSize: 14,
    color: "#1E3A8A",
    fontWeight: "600",
  },
  coursesContainer: {
    flexDirection: "row",
    paddingHorizontal: 20,
    gap: 12,
    marginBottom: 24,
  },
  courseCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    flex: 1,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 6,
    borderWidth: 2,
    borderColor: "#1E3A8A",
    overflow: "hidden",
  },
  courseCardImage: {
    width: "100%",
    height: 120,
    resizeMode: "cover",
  },
  courseCardContent: {
    padding: 16,
  },
  courseCardTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#1E3A8A",
    marginBottom: 8,
    lineHeight: 22,
  },
  courseCardLessons: {
    fontSize: 14,
    color: "#7F8C8D",
    marginBottom: 12,
    fontWeight: "500",
  },
  courseCardProgressContainer: {
    marginBottom: 12,
  },
  courseCardProgressText: {
    fontSize: 12,
    color: "#7F8C8D",
    marginBottom: 6,
    fontWeight: "500",
  },
  courseCardProgressBar: {
    height: 6,
    backgroundColor: "#F9FAFB",
    borderRadius: 3,
    overflow: "hidden",
  },
  courseCardProgressFill: {
    height: "100%",
    backgroundColor: "#1E3A8A",
    borderRadius: 3,
  },
  courseCardPriceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  courseCardPrice: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1E3A8A",
  },
  heartIcon: {
    padding: 8,
    backgroundColor: "rgba(0, 164, 5, 0.07)",
    borderRadius: 16,
  },
  educationContainer: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  educationImage: {
    width: "100%",
    height: 120,
    borderRadius: 12,
    resizeMode: "cover",
  },
  newsContainer: {
    flexDirection: "row",
    paddingHorizontal: 20,
    gap: 12,
    marginBottom: 24,
  },
  newsCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    width: 160,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    borderWidth: 1,
    borderColor: "#E5E5E5",
    overflow: "hidden",
    position: "relative",
    height: 210,
  },
  newsImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    position: "absolute",
  },
  newsOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    padding: 12,
    justifyContent: "flex-end",
    alignItems: "flex-start",
  },
  newsContent: {
    alignItems: "flex-start",
  },
  newsTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#FFFFFF",
    marginBottom: 8,
    lineHeight: 18,
  },
  newsActions: {
    flexDirection: "row",
    justifyContent: "flex-start",
    gap: 8,
  },
  newsActionButton: {
    padding: 4,
    backgroundColor: "rgba(0, 164, 5, 0.07)",
    borderRadius: 12,
  },
  actionButton: {
    padding: 4,
    backgroundColor: "rgba(0, 164, 5, 0.07)",
    borderRadius: 12,
  },
  blogsContainer: {
    backgroundColor: "rgba(0, 164, 5, 0.07)",
    paddingHorizontal: 20,
    paddingVertical: 16,
    gap: 12,
    marginBottom: 24,
  },
  blogCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    borderWidth: 1,
    borderColor: "#E5E5E5",
    position: "relative",
  },
  blogCardHeader: {
    position: "absolute",
    top: 12,
    right: 12,
    zIndex: 1,
  },
  messageButton: {
    padding: 4,
    backgroundColor: "rgba(0, 164, 5, 0.07)",
    borderRadius: 12,
  },
  blogInfo: {
    flex: 1,
  },
  blogTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000000",
    marginBottom: 8,
    lineHeight: 22,
  },
  blogDescription: {
    fontSize: 14,
    color: "#7F8C8D",
    lineHeight: 20,
    marginBottom: 12,
  },
  blogFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  readTimePill: {
    backgroundColor: "#E8F5E8",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  readTimeText: {
    fontSize: 12,
    color: "#2E7D32",
    fontWeight: "500",
  },
  blogActions: {
    flexDirection: "row",
    gap: 8,
  },
  bottomSpacing: {
    height: 100,
  },
});
