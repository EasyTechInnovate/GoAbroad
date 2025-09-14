import React from "react";
import { View, Text, Image } from "react-native";

interface Props {
  name: string;
  email: string;
  avatar: string;
}

const ProfileHeader: React.FC<Props> = ({ name, email, avatar }) => {
  return (
    <View style={{ alignItems: "center", marginVertical: 20 }}>
      <Image
        source={{ uri: avatar }}
        style={{ width: 100, height: 100, borderRadius: 50 }}
      />
      <Text style={{ fontSize: 20, fontWeight: "bold", marginTop: 10 }}>
        {name}
      </Text>
      <Text style={{ color: "gray" }}>{email}</Text>
    </View>
  );
};

export default ProfileHeader;
