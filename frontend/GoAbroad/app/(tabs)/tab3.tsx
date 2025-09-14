import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import NewsCard from "@/components/NewsCard";
import { FlatList, StyleSheet, Text, TextInput, View } from "react-native";

interface News {
  id: string;
  imageUrl: string;
  source: string;
  category: string;
  publishedAt: string;
  title: string;
  description: string;
}

const NewsList = () => {
  const [news, setNews] = useState<News[]>([]);
const [search, setSearch] = useState("");
  useEffect(() => {
    const fetchNews = async () => {
      const data: News[] = [
        {
          id: "1",
          imageUrl:
            "https://images.unsplash.com/photo-1517430816045-df4b7de11d1d",
          source: "BBC News",
          category: "Scholarships",
          publishedAt: "2 hours ago",
          title: "New Scholarship Opportunities for 2024",
          description:
            "Several universities announce new scholarship programs for international students with full tuition coverage and living stipends.",
        },
         {
          id: "2",
          imageUrl:
            "https://images.unsplash.com/photo-1517430816045-df4b7de11d1d",
          source: "BBC News",
          category: "Scholarships",
          publishedAt: "2 hours ago",
          title: "New Scholarship Opportunities for 2024",
          description:
            "Several universities announce new scholarship programs for international students with full tuition coverage and living stipends.",
        },
         {
          id: "3",
          imageUrl:
            "https://images.unsplash.com/photo-1517430816045-df4b7de11d1d",
          source: "BBC News",
          category: "Scholarships",
          publishedAt: "2 hours ago",
          title: "New Scholarship Opportunities for 2024",
          description:
            "Several universities announce new scholarship programs for international students with full tuition coverage and living stipends.",
        },
      ];
      setNews(data);
    };

    fetchNews();
  }, []);

  return (
      <SafeAreaView
          style={{ flex: 1, backgroundColor: "#fff", paddingHorizontal: 20 }}
          edges={["top", "left", "right"]} // ✅ sirf top aur sides safe
        >
        <Text
                        style={{
                          textAlign: "center",
                          fontSize: 18,
                          fontWeight: "600",
                          marginVertical: 10,
                        }}
                      >
                        Latest News
                      </Text>
                 <View style={styles.searchContainer}>
                          <TextInput
                            style={styles.searchInput}
                            placeholder="Search courses, blogs, news..."
                            value={search}
                            onChangeText={setSearch}
                          />
                        </View>
      <FlatList
        data={news}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <NewsCard
            {...item}
            onPress={(id) => console.log("Open News ID:", id)}
          />
        )}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

export default NewsList;

const styles = StyleSheet.create({

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
