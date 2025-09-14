import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { fetchHomeData } from "@/api/homeApi";
import { HomeResponse } from "@/models/Home";

import Header from "@/components/Header";
import CarouselSection from "@/components/CarouselSection";
import CourseSection from "@/components/CourseSection";
import NewsSection from "@/components/NewsSection";
import BlogSection from "@/components/BlogSection";

export default function HomeScreen() {
  const [homeData, setHomeData] = useState<HomeResponse | null>(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    (async () => {
      const data = await fetchHomeData();
      setHomeData(data);
    })();
  }, []);

  if (!homeData) return null;

  return (
    <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
      <ScrollView>
        <Header user={homeData.user} />

        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search courses, blogs, news..."
            value={search}
            onChangeText={setSearch}
          />
        </View>

        <CarouselSection items={homeData.carousel} />
        <CourseSection courses={homeData.courses} />
        <NewsSection news={homeData.news} />
        <BlogSection blogs={homeData.blogs} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  searchContainer: {
    marginHorizontal: 16,
    marginVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#f9f9f9",
    paddingHorizontal: 12,
  },
  searchInput: {
    height: 40,
  },
});
