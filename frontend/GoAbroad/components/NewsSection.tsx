import React from "react";
import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import { News } from "@/models/Home";

export default function NewsSection({ news }: { news: News[] }) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Latest News</Text>
        <Text style={styles.seeAll}>See All</Text>
      </View>

      <FlatList
        horizontal
        data={news}
        keyExtractor={(item) => item.id}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <Text style={styles.newsTitle}>{item.title}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginVertical: 10 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  title: { fontSize: 18, fontWeight: "700" },
  seeAll: { color: "#007bff" },
  card: {
    width: 220,
    marginHorizontal: 10,
    backgroundColor: "#fff",
    borderRadius: 8,
    overflow: "hidden",
    elevation: 2,
  },
  image: { width: "100%", height: 120 },
  newsTitle: { padding: 8, fontSize: 14, fontWeight: "600" },
});
