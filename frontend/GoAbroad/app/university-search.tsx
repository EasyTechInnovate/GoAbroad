import React, { useState, useEffect } from "react";
import { 
  ScrollView, 
  StyleSheet, 
  View, 
  Text, 
  TouchableOpacity, 
  TextInput,
  Image 
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";

// API Integration Comments for University Search Page
// TODO: Import API services when backend is ready
// import UniversityService from '@/api/universityService';
// import NewsService from '@/api/newsService';
// import { University, UniversitySearchResponse } from '@/models/University';
// import { News, NewsSearchResponse } from '@/models/News';

interface SearchResult {
  id: string;
  title: string;
  type: 'university' | 'course' | 'news' | 'blog';
  description?: string;
  image?: string;
  readMore?: boolean;
}

export default function UniversitySearchPage() {
  const { query } = useLocalSearchParams();
  const [searchQuery, setSearchQuery] = useState(query as string || "");
  const [loading, setLoading] = useState(false);
  const [universityResults, setUniversityResults] = useState<SearchResult[]>([]);
  const [newsResults, setNewsResults] = useState<SearchResult[]>([]);

  // API Integration Comments for University Search Page
  // TODO: Replace with actual API calls when backend is ready
  // useEffect(() => {
  //   if (query) {
  //     loadSearchResults(query as string);
  //   }
  // }, [query]);

  // const loadSearchResults = async (searchTerm: string) => {
  //   try {
  //     setLoading(true);
  //     
  //     // Search universities
  //     const universityResponse = await UniversityService.searchUniversities({
  //       query: searchTerm,
  //       page: 1,
  //       limit: 10
  //     });
  //     
  //     if (universityResponse.success) {
  //       setUniversityResults(universityResponse.data.universities.map(uni => ({
  //         id: uni.id,
  //         title: uni.name,
  //         type: 'university' as const,
  //         description: uni.description,
  //         image: uni.logo
  //       })));
  //     }
  //     
  //     // Search news
  //     const newsResponse = await NewsService.searchNews({
  //       query: searchTerm,
  //       page: 1,
  //       limit: 5
  //     });
  //     
  //     if (newsResponse.success) {
  //       setNewsResults(newsResponse.data.news.map(news => ({
  //         id: news.id,
  //         title: news.title,
  //         type: 'news' as const,
  //         readMore: true
  //       })));
  //     }
  //   } catch (error) {
  //     console.error('Error loading search results:', error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // Mock data - replace with API calls

  const mockUniversityResults: SearchResult[] = [
    {
      id: "1",
      title: "Massachusetts Institute of Technology",
      type: "university",
      description: "Private research university in Cambridge, Massachusetts",
      image: "https://picsum.photos/100/100?random=16"
    },
    {
      id: "2", 
      title: "Massachusetts Institute of Technology",
      type: "university",
      description: "Private research university in Cambridge, Massachusetts",
      image: "https://picsum.photos/100/100?random=17"
    },
    {
      id: "3",
      title: "Massachusetts Institute of Technology", 
      type: "university",
      description: "Private research university in Cambridge, Massachusetts",
      image: "https://picsum.photos/100/100?random=18"
    }
  ];

  const mockNewsResults: SearchResult[] = [
    {
      id: "4",
      title: "How to get admission in MIT college",
      type: "news",
      readMore: true
    },
    {
      id: "5",
      title: "Cutoff of MIT for 2025 Session",
      type: "news", 
      readMore: true
    }
  ];

  const handleSearch = () => {
    if (searchQuery.trim()) {
      // Refresh search results
      console.log("Searching for:", searchQuery);
    }
  };

  const handleUniversityPress = (university: SearchResult) => {
    router.push({
      pathname: "/make-friends",
      params: { university: university.title }
    });
  };

  const handleNewsPress = (news: SearchResult) => {
    console.log("Opening news:", news.title);
  };

  const handleMakeFriendsPress = () => {
    router.push({
      pathname: "/make-friends",
      params: { university: "Massachusetts Institute of Technology" }
    });
  };

  return (
    <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <Ionicons name="search" size={20} color="#7F8C8D" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Q Search for Universities, Courses, Friends"
              placeholderTextColor="#7F8C8D"
              value={searchQuery}
              onChangeText={setSearchQuery}
              onSubmitEditing={handleSearch}
              returnKeyType="search"
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={() => setSearchQuery("")}>
                <Ionicons name="close-circle" size={20} color="#7F8C8D" />
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* In Universities Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>In Universities</Text>
          {mockUniversityResults.map((university) => (
            <TouchableOpacity 
              key={university.id}
              style={styles.universityItem}
              onPress={() => handleUniversityPress(university)}
            >
              <Image source={{ uri: university.image }} style={styles.universityLogo} />
              <View style={styles.universityInfo}>
                <Text style={styles.universityName}>{university.title}</Text>
                <Text style={styles.universityDescription}>{university.description}</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#7F8C8D" />
            </TouchableOpacity>
          ))}
        </View>

        {/* In Courses Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>In Courses</Text>
          <View style={styles.emptyState}>
            <Ionicons name="book-outline" size={48} color="#BDC3C7" />
            <Text style={styles.emptyStateText}>Nothing to Show</Text>
          </View>
        </View>

        {/* In News & Blogs Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>In News & Blogs</Text>
          {mockNewsResults.map((news) => (
            <TouchableOpacity 
              key={news.id}
              style={styles.newsItem}
              onPress={() => handleNewsPress(news)}
            >
              <View style={styles.newsContent}>
                <Text style={styles.newsTitle}>{news.title}</Text>
                {news.readMore && (
                  <Text style={styles.readMoreText}>Read More</Text>
                )}
              </View>
              <Ionicons name="chevron-forward" size={20} color="#7F8C8D" />
            </TouchableOpacity>
          ))}
        </View>

        {/* Make Friends CTA */}
        <View style={styles.ctaContainer}>
          <TouchableOpacity style={styles.ctaButton} onPress={handleMakeFriendsPress}>
            <Ionicons name="people" size={20} color="#FFFFFF" />
            <Text style={styles.ctaButtonText}>Make Friends at MIT</Text>
          </TouchableOpacity>
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
  makeFriendsButton: {
    fontSize: 14,
    fontWeight: "600",
    color: "#0D5543",
  },
  searchContainer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: "#FFFFFF",
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F8F9FA",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: "#E5E5E5",
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#2C3E50",
  },
  section: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2C3E50",
    marginBottom: 16,
  },
  universityItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  universityLogo: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 16,
  },
  universityInfo: {
    flex: 1,
  },
  universityName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#2C3E50",
    marginBottom: 4,
  },
  universityDescription: {
    fontSize: 14,
    color: "#7F8C8D",
  },
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 40,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
  },
  emptyStateText: {
    fontSize: 16,
    color: "#7F8C8D",
    marginTop: 12,
  },
  newsItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  newsContent: {
    flex: 1,
  },
  newsTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#2C3E50",
    marginBottom: 4,
  },
  readMoreText: {
    fontSize: 14,
    color: "#0D5543",
    fontWeight: "500",
  },
  ctaContainer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  ctaButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#0D5543",
    paddingVertical: 16,
    borderRadius: 12,
    gap: 8,
  },
  ctaButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  bottomNavigation: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderTopColor: "#E5E5E5",
  },
  navItem: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 8,
  },
  activeNavItem: {
    // Active state styling
  },
  navLabel: {
    fontSize: 12,
    fontWeight: "500",
    color: "#7F8C8D",
    marginTop: 4,
  },
  activeNavLabel: {
    color: "#0D5543",
  },
});
