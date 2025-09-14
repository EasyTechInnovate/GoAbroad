import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { User } from "@/models/Home";

export default function Header({ user }: { user: User }) {
  return (
    <View style={styles.container}>
      <Image source={{ uri: user.profilePic }} style={styles.avatar} />
      <Text style={styles.name}>Hi, {user.name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: "row", alignItems: "center", padding: 16 },
  avatar: { width: 40, height: 40, borderRadius: 20, marginRight: 10 },
  name: { fontSize: 16, fontWeight: "600" },
});
