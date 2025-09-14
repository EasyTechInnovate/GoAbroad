import React from "react";
import { View, Text } from "react-native";

interface Props {
  followers: number;
  following: number;
}

const ProfileStats: React.FC<Props> = ({ followers, following }) => {
  return (
    <View style={{ flexDirection: "row", justifyContent: "center", marginVertical: 20 }}>
      <View style={{ alignItems: "center", marginHorizontal: 20 }}>
        <Text style={{ fontWeight: "bold", fontSize: 16 }}>{followers.toLocaleString()}k</Text>
        <Text style={{ color: "gray" }}>Followers</Text>
      </View>
      <View style={{ alignItems: "center", marginHorizontal: 20 }}>
        <Text style={{ fontWeight: "bold", fontSize: 16 }}>{following.toLocaleString()}k</Text>
        <Text style={{ color: "gray" }}>Following</Text>
      </View>
    </View>
  );
};

export default ProfileStats;
