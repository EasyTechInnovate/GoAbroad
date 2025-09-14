import React from "react";
import { FlatList, Image, StyleSheet, Text, View, Dimensions } from "react-native";
import { CarouselItem } from "@/models/Home";

const { width } = Dimensions.get("window");

export default function CarouselSection({ items }: { items: CarouselItem[] }) {
  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        pagingEnabled
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <Text style={styles.title}>{item.title}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginVertical: 10 },
  card: {
    width: width - 40,
    marginHorizontal: 10,
    borderRadius: 12,
    backgroundColor: "#f2f2f2",
    overflow: "hidden",
  },
  image: { width: "100%", height: 150, resizeMode: "cover" },
  title: { padding: 10, fontSize: 16, fontWeight: "600" },
});
