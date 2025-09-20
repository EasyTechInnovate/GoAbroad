import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface ProfileMenuItemProps {
  icon: string;
  title: string;
  subtitle: string;
  onPress: () => void;
  isDestructive?: boolean;
}

export default function ProfileMenuItem({ 
  icon, 
  title, 
  subtitle, 
  onPress, 
  isDestructive = false 
}: ProfileMenuItemProps) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.iconContainer}>
        <Ionicons 
          name={icon as any} 
          size={24} 
          color={isDestructive ? "#e74c3c" : "#3498db"} 
        />
      </View>
      <View style={styles.content}>
        <Text style={[styles.title, isDestructive && styles.destructiveText]}>
          {title}
        </Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>
      <Ionicons 
        name="chevron-forward" 
        size={20} 
        color="#bdc3c7" 
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#ecf0f1",
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#f8f9fa",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: "#2c3e50",
    marginBottom: 2,
  },
  subtitle: {
    fontSize: 14,
    color: "#7f8c8d",
  },
  destructiveText: {
    color: "#e74c3c",
  },
});