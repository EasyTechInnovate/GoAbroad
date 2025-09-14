import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface Props {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  color?: string;
  onPress?: () => void;
}

const ProfileMenuItem: React.FC<Props> = ({ icon, label, color = "green", onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 12,
        borderBottomWidth: 0.5,
        borderColor: "#ddd",
      }}
    >
      <View
        style={{
          backgroundColor: "#e6f7ec",
          padding: 8,
          borderRadius: 20,
          marginRight: 15,
        }}
      >
        <Ionicons name={icon} size={20} color={color} />
      </View>
      <Text style={{ flex: 1, fontSize: 16 }}>{label}</Text>
      <Ionicons name="chevron-forward" size={20} color="gray" />
    </TouchableOpacity>
  );
};

export default ProfileMenuItem;
