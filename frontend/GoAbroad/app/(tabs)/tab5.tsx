// import React, { useEffect, useState } from "react";
// import { View, SafeAreaView, ActivityIndicator, Text } from "react-native";
// import { getUserProfile } from "@/api/userApi";
// import { UserProfile } from "@/models/UserProfile";
// import ProfileHeader from "@/components/ProfileHeader";
// import ProfileStats from "@/components/ProfileStats";
// import ProfileMenuItem from "@/components/ProfileMenuItem";

// const ProfileScreen: React.FC = () => {
//   const [user, setUser] = useState<UserProfile | null>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     getUserProfile().then((data) => {
//       setUser(data);
//       setLoading(false);
//     });
//   }, []);

//   if (loading) {
//     return (
//       <SafeAreaView style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//         <ActivityIndicator size="large" color="green" />
//       </SafeAreaView>
//     );
//   }

//   if (!user) {
//     return (
//       <SafeAreaView style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//         <Text>Failed to load profile</Text>
//       </SafeAreaView>
//     );
//   }

//   return (
//     <SafeAreaView style={{ flex: 1, backgroundColor: "#fff", paddingHorizontal: 20 }} edges={["top", "left", "right"]}>
//       <Text style={{ textAlign: "center", fontSize: 18, fontWeight: "600", marginVertical: 10 }}>
//         Profile
//       </Text>

//       <ProfileHeader name={user.name} email={user.email} avatar={user.avatar} />
//       <ProfileStats followers={user.followers / 1000} following={user.following / 1000} />

//       <View>
//         <ProfileMenuItem icon="person-outline" label="Edit Profile" />
//         <ProfileMenuItem icon="notifications-outline" label="Notification" />
//         <ProfileMenuItem icon="shield-checkmark-outline" label="Privacy Policy" />
//         <ProfileMenuItem icon="information-circle-outline" label="About Us" />
//         <ProfileMenuItem icon="log-out-outline" label="Logout" color="red" />
//       </View>
//     </SafeAreaView>
//   );
// };

// export default ProfileScreen;
import React, { useEffect, useState } from "react";
import { View, ActivityIndicator, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context"; // ✅ use this package
import { getUserProfile } from "@/api/userApi";
import { UserProfile } from "@/models/UserProfile";
import ProfileHeader from "@/components/ProfileHeader";
import ProfileStats from "@/components/ProfileStats";
import ProfileMenuItem from "@/components/ProfileMenuItem";

const ProfileScreen: React.FC = () => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUserProfile().then((data) => {
      setUser(data);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <SafeAreaView
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        edges={["top", "left", "right"]}
      >
        <ActivityIndicator size="large" color="green" />
      </SafeAreaView>
    );
  }

  if (!user) {
    return (
      <SafeAreaView
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        edges={["top", "left", "right"]}
      >
        <Text>Failed to load profile</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "#fff", paddingHorizontal: 20 }}
      edges={["top", "left", "right"]} // ✅ only apply safe area on top & sides
    >
      <Text
        style={{
          textAlign: "center",
          fontSize: 18,
          fontWeight: "600",
          marginVertical: 10,
        }}
      >
        Profile
      </Text>

      <ProfileHeader name={user.name} email={user.email} avatar={user.avatar} />
      <ProfileStats
        followers={user.followers / 1000}
        following={user.following / 1000}
      />

      <View>
        <ProfileMenuItem icon="person-outline" label="Edit Profile" />
        <ProfileMenuItem icon="notifications-outline" label="Notification" />
        <ProfileMenuItem
          icon="shield-checkmark-outline"
          label="Privacy Policy"
        />
        <ProfileMenuItem icon="information-circle-outline" label="About Us" />
        <ProfileMenuItem icon="log-out-outline" label="Logout" color="red" />
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;
