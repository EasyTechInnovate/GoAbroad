
// import React, { useEffect, useState } from "react";
// import { FlatList, SafeAreaView } from "react-native";
// import BlogCard from "@/components/BlogCard";

// interface Blog {
//   id: string;
//   imageUrl: string;
//   category: string;
//   readTime: string;
//   publishedAt: string;
//   title: string;
//   description: string;
//   authorName: string;
// }

// const BlogList = () => {
//   const [blogs, setBlogs] = useState<Blog[]>([]);

//   useEffect(() => {
//     // Dummy API data
//     const fetchBlogs = async () => {
//       // Simulate API
//       const data: Blog[] = [
//         {
//           id: "1",
//           imageUrl:
//             "https://images.unsplash.com/photo-1522202176988-66273c2fd55f",
//           category: "Application Tips",
//           readTime: "5 min read",
//           publishedAt: "3 days ago",
//           title: "10 Tips for Writing a Standout Statement of Purpose",
//           description:
//             "Learn how to craft a compelling Statement of Purpose that will make your application stand out.",
//           authorName: "Dr. Sarah Johnson",
          
//         },
//          {
//           id: "2",
//           imageUrl:
//             "https://images.unsplash.com/photo-1522202176988-66273c2fd55f",
//           category: "Application Tips",
//           readTime: "5 min read",
//           publishedAt: "3 days ago",
//           title: "10 Tips for Writing a Standout Statement of Purpose",
//           description:
//             "Learn how to craft a compelling Statement of Purpose that will make your application stand out.",
//           authorName: "Dr. Sarah Johnson",
          
//         },
//          {
//           id: "3",
//           imageUrl:
//             "https://images.unsplash.com/photo-1522202176988-66273c2fd55f",
//           category: "Application Tips",
//           readTime: "5 min read",
//           publishedAt: "3 days ago",
//           title: "10 Tips for Writing a Standout Statement of Purpose",
//           description:
//             "Learn how to craft a compelling Statement of Purpose that will make your application stand out.",
//           authorName: "Dr. Sarah Johnson",
          
//         },
//       ];
//       setBlogs(data);
//     };

//     fetchBlogs();
//   }, []);

//   return (
//    <SafeAreaView
//          style={{ flex: 1, backgroundColor: "#fff", paddingHorizontal: 20 }}
//          edges={["top"]} // ✅ only apply safe area on top & sides
//        >
//       <FlatList
//         data={blogs}
//         keyExtractor={(item) => item.id}
//         renderItem={({ item }) => <BlogCard {...item} />}
//         showsVerticalScrollIndicator={false}
//       />
//     </SafeAreaView>
//   );
// };

// export default BlogList;
import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, TextInput, View } from "react-native";
import BlogCard from "@/components/BlogCard";
import { SafeAreaView } from "react-native-safe-area-context"; // ✅ ye import karo

interface Blog {
  id: string;
  imageUrl: string;
  category: string;
  readTime: string;
  publishedAt: string;
  title: string;
  description: string;
  authorName: string;
}

const BlogList = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [search, setSearch] = useState("");
  useEffect(() => {
    const fetchBlogs = async () => {
      const data: Blog[] = [
        {
          id: "1",
          imageUrl:
            "https://images.unsplash.com/photo-1522202176988-66273c2fd55f",
          category: "Application Tips",
          readTime: "5 min read",
          publishedAt: "3 days ago",
          title: "10 Tips for Writing a Standout Statement of Purpose",
          description:
            "Learn how to craft a compelling Statement of Purpose that will make your application stand out.",
          authorName: "Dr. Sarah Johnson",
        },
        {
          id: "2",
          imageUrl:
            "https://images.unsplash.com/photo-1522202176988-66273c2fd55f",
          category: "Application Tips",
          readTime: "5 min read",
          publishedAt: "3 days ago",
          title: "10 Tips for Writing a Standout Statement of Purpose",
          description:
            "Learn how to craft a compelling Statement of Purpose that will make your application stand out.",
          authorName: "Dr. Sarah Johnson",
        },
        {
          id: "3",
          imageUrl:
            "https://images.unsplash.com/photo-1522202176988-66273c2fd55f",
          category: "Application Tips",
          readTime: "5 min read",
          publishedAt: "3 days ago",
          title: "10 Tips for Writing a Standout Statement of Purpose",
          description:
            "Learn how to craft a compelling Statement of Purpose that will make your application stand out.",
          authorName: "Dr. Sarah Johnson",
        },
      ];
      setBlogs(data);
    };

    fetchBlogs();
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
                Profile
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
        data={blogs}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <BlogCard {...item} />}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

export default BlogList;

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
