import React, { useState } from "react";
import { 
  StyleSheet, 
  View, 
  Text, 
  TouchableOpacity, 
  ScrollView,
  Alert 
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

interface Language {
  id: string;
  name: string;
  code: string;
  flag: string;
}

export default function LanguageScreen() {
  const [selectedLanguage, setSelectedLanguage] = useState("en");

  const languages: Language[] = [
    { id: "en", name: "English", code: "en", flag: "🇺🇸" },
    { id: "bn", name: "Bangla", code: "bn", flag: "🇧🇩" },
    { id: "hi", name: "Hindi", code: "hi", flag: "🇮🇳" },
    { id: "fr", name: "Francais", code: "fr", flag: "🇫🇷" },
    { id: "it", name: "Italiaon", code: "it", flag: "🇮🇹" },
    { id: "es", name: "Spanish", code: "es", flag: "🇪🇸" },
    { id: "de", name: "German", code: "de", flag: "🇩🇪" },
    { id: "pt", name: "Portuguese", code: "pt", flag: "🇵🇹" },
    { id: "ru", name: "Russian", code: "ru", flag: "🇷🇺" },
    { id: "ja", name: "Japanese", code: "ja", flag: "🇯🇵" },
    { id: "ko", name: "Korean", code: "ko", flag: "🇰🇷" },
    { id: "zh", name: "Chinese", code: "zh", flag: "🇨🇳" }
  ];

  const handleLanguageSelect = (languageCode: string) => {
    setSelectedLanguage(languageCode);
    // Here you would typically save the language preference
    console.log("Selected language:", languageCode);
  };

  const handleSave = () => {
    // Here you would typically save the language preference to storage
    Alert.alert(
      "Language Updated",
      "Your language preference has been updated successfully.",
      [
        {
          text: "OK",
          onPress: () => router.back()
        }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#2C3E50" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Language</Text>
        <TouchableOpacity onPress={handleSave}>
          <Text style={styles.saveButton}>Save</Text>
        </TouchableOpacity>
      </View>

      {/* Language List */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.languageContainer}>
          {languages.map((language) => (
            <TouchableOpacity
              key={language.id}
              style={[
                styles.languageItem,
                selectedLanguage === language.code && styles.selectedLanguageItem
              ]}
              onPress={() => handleLanguageSelect(language.code)}
            >
              <View style={styles.languageInfo}>
                <Text style={styles.flag}>{language.flag}</Text>
                <Text style={[
                  styles.languageName,
                  selectedLanguage === language.code && styles.selectedLanguageName
                ]}>
                  {language.name}
                </Text>
              </View>
              
              {selectedLanguage === language.code && (
                <View style={styles.radioButton}>
                  <Ionicons name="radio-button-on" size={24} color="#0D5543" />
                </View>
              )}
              
              {selectedLanguage !== language.code && (
                <View style={styles.radioButton}>
                  <Ionicons name="radio-button-off" size={24} color="#BDC3C7" />
                </View>
              )}
            </TouchableOpacity>
          ))}
        </View>

        {/* Language Info */}
        <View style={styles.infoContainer}>
          <View style={styles.infoItem}>
            <Ionicons name="information-circle" size={20} color="#3498DB" />
            <Text style={styles.infoText}>
              Changing the language will update the app interface
            </Text>
          </View>
          <View style={styles.infoItem}>
            <Ionicons name="refresh" size={20} color="#F39C12" />
            <Text style={styles.infoText}>
              Some content may require app restart to fully update
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: "#FFFFFF",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2C3E50",
  },
  saveButton: {
    fontSize: 16,
    fontWeight: "600",
    color: "#0D5543",
  },
  content: {
    flex: 1,
  },
  languageContainer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  languageItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  selectedLanguageItem: {
    borderWidth: 2,
    borderColor: "#0D5543",
    backgroundColor: "#EBF3FD",
  },
  languageInfo: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  flag: {
    fontSize: 24,
    marginRight: 16,
  },
  languageName: {
    fontSize: 16,
    fontWeight: "500",
    color: "#2C3E50",
  },
  selectedLanguageName: {
    fontWeight: "600",
    color: "#0D5543",
  },
  radioButton: {
    marginLeft: 16,
  },
  infoContainer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    gap: 12,
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EBF3FD",
    padding: 12,
    borderRadius: 8,
    gap: 12,
  },
  infoText: {
    fontSize: 14,
    color: "#2C3E50",
    flex: 1,
    lineHeight: 20,
  },
});
