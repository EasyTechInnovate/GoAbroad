import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CourseCard from "@/components/CourseCard";
import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import ToggleButton from "@/components/ToggleButton";

interface Course {
  id: string;
  imageUrl: string;
  title: string;
  professor: string;
  duration: string;
  weeks: string;
  videos: number;
  category: string;
  description: string;
  progress: number;
  topics: { id: string; title: string; lessons: string[] }[];
}

const CourseScreen = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [search, setSearch] = useState("");
  useEffect(() => {
    const fetchCourses = async () => {
      const data: Course[] = [
        {
          id: "1",
          imageUrl:
            "https://images.unsplash.com/photo-1522202176988-66273c2fd55f",
          title: "IELTS Preparation Masterclass",
          professor: "Dr. Sarah Johnson",
          duration: "30h",
          weeks: "8 weeks",
          videos: 24,
          category: "Test Prep",
          description:
            "Comprehensive IELTS preparation covering all four skills",
          progress: 0.45,
          topics: [
            {
              id: "t1",
              title: "Listening Skills",
              lessons: ["Academic Listening", "General Listening", "Practice Tests"],
            },
            {
              id: "t2",
              title: "Reading Comprehension",
              lessons: ["Skimming & Scanning", "Reading Strategies", "Mock Tests"],
            },
            {
              id: "t3",
              title: "Writing Tasks",
              lessons: ["Task 1 Reports", "Task 2 Essays", "Writing Practice"],
            },
            {
              id: "t4",
              title: "Speaking Skills",
              lessons: ["Part 1 Interview", "Part 2 Cue Cards", "Part 3 Discussion"],
            },
          ],
        },
      ];
      setCourses(data);
    };

    fetchCourses();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }} edges={["top", "left", "right"]}>
       <Text
                              style={{
                                textAlign: "center",
                                fontSize: 18,
                                fontWeight: "600",
                                marginVertical: 10,
                              }}
                            >
                            My Courses
                            </Text>
                            <View style={{paddingHorizontal:10}}>
<ToggleButton
  options={["Overview", "Preview"]}
  onSelect={(value) => console.log("Selected:", value)}
/>
                            </View>
                      
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        {courses.map((course) => (
          <CourseCard
            key={course.id}
            {...course}
            onContinue={(id) => console.log("Continue:", id)}
            onPreview={(id) => console.log("Preview:", id)}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default CourseScreen;

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
