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
import { router } from "expo-router";

// API Integration Comments for Search Page
// TODO: Import API services when backend is ready
// import UniversityService from '@/api/universityService';
// import CourseService from '@/api/courseService';
// import { University, Course } from '@/models/University';
// import { Course as CourseModel } from '@/models/Course';

interface UniversityCard {
  id: string;
  name: string;
  image: string;
  country: string;
}

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [universities, setUniversities] = useState<UniversityCard[]>([]);
  const [loading, setLoading] = useState(false);

  // API Integration Comments for Search Page
  // TODO: Replace with actual API calls when backend is ready
  // useEffect(() => {
  //   loadFeaturedUniversities();
  // }, []);

  // const loadFeaturedUniversities = async () => {
  //   try {
  //     setLoading(true);
  //     const response = await UniversityService.getFeaturedUniversities();
  //     if (response.success) {
  //       setUniversities(response.data.map(uni => ({
  //         id: uni.id,
  //         name: uni.name,
  //         image: uni.logo,
  //         country: uni.country
  //       })));
  //     }
  //   } catch (error) {
  //     console.error('Error loading universities:', error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // Mock data - replace with API calls
  const mockUniversities: UniversityCard[] = [
    {
      id: "1",
      name: "University of London",
      image: "https://picsum.photos/300/200?random=13",
      country: "United Kingdom"
    },
    {
      id: "2", 
      name: "Harvard University",
      image: "https://picsum.photos/300/200?random=14",
      country: "United States"
    },
    {
      id: "3",
      name: "University of Toronto",
      image: "https://picsum.photos/300/200?random=15",
      country: "Canada"
    }
  ];

  const handleSearch = async () => {
    if (searchQuery.trim()) {
      // API Integration Comments for Search Page
      // TODO: Implement search API call when backend is ready
      // try {
      //   setLoading(true);
      //   const response = await UniversityService.searchUniversities({
      //     query: searchQuery,
      //     page: 1,
      //     limit: 20
      //   });
      //   if (response.success) {
      //     router.push({
      //       pathname: "/university-search",
      //       params: { 
      //         query: searchQuery,
      //         results: JSON.stringify(response.data.universities)
      //       }
      //     });
      //   }
      // } catch (error) {
      //   console.error('Search error:', error);
      // } finally {
      //   setLoading(false);
      // }

      // Mock navigation - replace with API integration
      router.push({
        pathname: "/university-search",
        params: { query: searchQuery }
      });
    }
  };

  const handleUniversityPress = (universityName: string) => {
    router.push({
      pathname: "/university-search", 
      params: { query: universityName }
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
              placeholder='Q Search for "Courses", "MIT", "Colleges", "Friends"'
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

        {/* Section Title */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>
            Search your Universities & Make Friends Around that Interest
          </Text>
        </View>

        {/* University Cards */}
        <View style={styles.universitiesContainer}>
          {mockUniversities.map((university) => (
            <TouchableOpacity 
              key={university.id}
              style={styles.universityCard}
              onPress={() => handleUniversityPress(university.name)}
            >
              <Image source={{ uri: university.image }} style={styles.universityImage} />
              <View style={styles.universityOverlay}>
                <Text style={styles.universityName}>{university.name}</Text>
                <Text style={styles.universityCountry}>{university.country}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Quick Search Suggestions */}
        <View style={styles.suggestionsContainer}>
          <Text style={styles.suggestionsTitle}>Popular Searches</Text>
          <View style={styles.suggestionsList}>
            {["MIT College", "Harvard University", "IELTS Preparation", "Study Abroad"].map((suggestion, index) => (
              <TouchableOpacity 
                key={index}
                style={styles.suggestionChip}
                onPress={() => {
                  setSearchQuery(suggestion);
                  handleSearch();
                }}
              >
                <Text style={styles.suggestionText}>{suggestion}</Text>
              </TouchableOpacity>
            ))}
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
  sectionContainer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#2C3E50",
    textAlign: "center",
    lineHeight: 24,
  },
  universitiesContainer: {
    flexDirection: "row",
    paddingHorizontal: 20,
    gap: 12,
    marginBottom: 24,
  },
  universityCard: {
    flex: 1,
    height: 200,
    borderRadius: 12,
    overflow: "hidden",
    position: "relative",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  universityImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  universityOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0,0,0,0.7)",
    padding: 12,
  },
  universityName: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 2,
  },
  universityCountry: {
    fontSize: 12,
    color: "#FFFFFF",
    opacity: 0.8,
  },
  suggestionsContainer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  suggestionsTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#2C3E50",
    marginBottom: 12,
  },
  suggestionsList: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  suggestionChip: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#E5E5E5",
  },
  suggestionText: {
    fontSize: 14,
    color: "#2C3E50",
    fontWeight: "500",
  },
});
