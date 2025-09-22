import React, { useState, useEffect } from "react";
import { ScrollView, StyleSheet, View, Text, TouchableOpacity, TextInput, Alert, Modal, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

interface Country {
  id: string;
  name: string;
}

interface University {
  id: string;
  name: string;
}

const mockCountries: Country[] = [
  { id: "1", name: "United States" },
  { id: "2", name: "United Kingdom" },
  { id: "3", name: "Canada" },
  { id: "4", name: "Australia" },
  { id: "5", name: "Germany" },
  { id: "6", name: "France" },
  { id: "7", name: "Netherlands" },
  { id: "8", name: "Sweden" },
];

const mockUniversities: University[] = [
  { id: "1", name: "MIT College" },
  { id: "2", name: "Harvard University" },
  { id: "3", name: "Stanford University" },
  { id: "4", name: "Oxford University" },
  { id: "5", name: "Cambridge University" },
];

export default function EditProfileScreen() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    currentCountry: "",
    targetUniversities: "",
  });
  
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [selectedUniversities, setSelectedUniversities] = useState<University[]>([]);
  const [showCountryModal, setShowCountryModal] = useState(false);
  const [showUniversityModal, setShowUniversityModal] = useState(false);

  useEffect(() => {
    // Load existing user data
    setFormData({
      fullName: "John Doe",
      email: "john.doe@example.com",
      phoneNumber: "+1 234 567 8900",
      currentCountry: "United States",
      targetUniversities: "Tell us about yourself...",
    });
    setSelectedCountry({ id: "1", name: "United States" });
    setSelectedUniversities([{ id: "1", name: "MIT College" }]);
  }, []);

  const handleBackPress = () => {
    router.back();
  };

  const handleSave = () => {
    Alert.alert("Success", "Profile updated successfully!", [
      { text: "OK", onPress: () => router.back() }
    ]);
  };

  const handleCountrySelect = (country: Country) => {
    setSelectedCountry(country);
    setFormData(prev => ({ ...prev, currentCountry: country.name }));
    setShowCountryModal(false);
  };

  const handleUniversityToggle = (university: University) => {
    setSelectedUniversities(prev => {
      const isSelected = prev.find(u => u.id === university.id);
      if (isSelected) {
        return prev.filter(u => u.id !== university.id);
      } else {
        return [...prev, university];
      }
    });
  };

  const removeUniversity = (universityId: string) => {
    setSelectedUniversities(prev => prev.filter(u => u.id !== universityId));
  };

  return (
    <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={handleBackPress}
          activeOpacity={0.7}
        >
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profile</Text>
        <View style={styles.headerSpacer} />
      </View>

      {/* Form Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Personal Information Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitleContainer}>
              <View style={styles.iconContainer}>
                <Ionicons name="person-outline" size={16} color="#FFFFFF" />
              </View>
              <Text style={styles.sectionTitle}>Personal Information</Text>
            </View>
            <TouchableOpacity 
              style={styles.saveButton} 
              onPress={handleSave}
              activeOpacity={0.7}
            >
              <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
          </View>

          {/* Full Name */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Full Name</Text>
            <TextInput
              style={styles.textInput}
              value={formData.fullName}
              onChangeText={(text) => setFormData(prev => ({ ...prev, fullName: text }))}
              placeholder="Enter your full name"
              placeholderTextColor="#C7C7CC"
            />
          </View>

          {/* Email */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Email</Text>
            <TextInput
              style={styles.textInput}
              value={formData.email}
              onChangeText={(text) => setFormData(prev => ({ ...prev, email: text }))}
              placeholder="Enter your email"
              placeholderTextColor="#C7C7CC"
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          {/* Phone Number */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Phone Number</Text>
            <TextInput
              style={styles.textInput}
              value={formData.phoneNumber}
              onChangeText={(text) => setFormData(prev => ({ ...prev, phoneNumber: text }))}
              placeholder="Enter your phone number"
              placeholderTextColor="#C7C7CC"
              keyboardType="phone-pad"
            />
          </View>

          {/* Current Country */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Current Country</Text>
            <TouchableOpacity
              style={styles.dropdownInput}
              onPress={() => setShowCountryModal(true)}
              activeOpacity={0.7}
            >
              <Text style={[styles.dropdownText, selectedCountry && styles.dropdownTextSelected]}>
                {selectedCountry ? selectedCountry.name : "Select country"}
              </Text>
              <Ionicons name="chevron-down" size={20} color="#C7C7CC" />
            </TouchableOpacity>
          </View>

          {/* Target Universities */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Target Universities</Text>
            <TextInput
              style={[styles.textInput, styles.textArea]}
              value={formData.targetUniversities}
              onChangeText={(text) => setFormData(prev => ({ ...prev, targetUniversities: text }))}
              placeholder="Tell us about yourself..."
              placeholderTextColor="#C7C7CC"
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />
            
            {/* Selected Universities Tags */}
            <View style={styles.tagsContainer}>
              {selectedUniversities.map((university) => (
                <View key={university.id} style={styles.tag}>
                  <Text style={styles.tagText}>{university.name}</Text>
                  <TouchableOpacity
                    onPress={() => removeUniversity(university.id)}
                    activeOpacity={0.7}
                  >
                    <Ionicons name="close" size={14} color="#8E8E93" />
                  </TouchableOpacity>
                </View>
              ))}
              <TouchableOpacity
                style={styles.addTagButton}
                onPress={() => setShowUniversityModal(true)}
                activeOpacity={0.7}
              >
                <Ionicons name="add" size={16} color="#007AFF" />
                <Text style={styles.addTagText}>Add University</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Country Selection Modal */}
      <Modal
        visible={showCountryModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowCountryModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Country</Text>
              <TouchableOpacity
                onPress={() => setShowCountryModal(false)}
                activeOpacity={0.7}
              >
                <Ionicons name="close" size={24} color="#000" />
              </TouchableOpacity>
            </View>
            <ScrollView style={styles.modalContent}>
              {mockCountries.map((country) => (
                <TouchableOpacity
                  key={country.id}
                  style={styles.modalItem}
                  onPress={() => handleCountrySelect(country)}
                  activeOpacity={0.7}
                >
                  <Text style={styles.modalItemText}>{country.name}</Text>
                  {selectedCountry?.id === country.id && (
                    <Ionicons name="checkmark" size={20} color="#007AFF" />
                  )}
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* University Selection Modal */}
      <Modal
        visible={showUniversityModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowUniversityModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Universities</Text>
              <TouchableOpacity
                onPress={() => setShowUniversityModal(false)}
                activeOpacity={0.7}
              >
                <Ionicons name="close" size={24} color="#000" />
              </TouchableOpacity>
            </View>
            <ScrollView style={styles.modalContent}>
              {mockUniversities.map((university) => (
                <TouchableOpacity
                  key={university.id}
                  style={styles.modalItem}
                  onPress={() => handleUniversityToggle(university)}
                  activeOpacity={0.7}
                >
                  <Text style={styles.modalItemText}>{university.name}</Text>
                  {selectedUniversities.find(u => u.id === university.id) && (
                    <Ionicons name="checkmark" size={20} color="#007AFF" />
                  )}
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#F2F2F7",
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000000",
  },
  headerSpacer: {
    width: 32,
  },
  saveButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: "#16A34A",
    borderRadius: 8,
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  content: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  section: {
    width: Dimensions.get('window').width - 40,
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 24,
    paddingVertical: 32,
    marginHorizontal: 20,
    marginTop: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  sectionTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconContainer: {
    width: 38.4,
    height: 38.4,
    borderRadius: 8.53,
    backgroundColor: "rgba(59, 130, 246, 1)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
    borderWidth: 1,
    borderColor: "#E5E5E5",
    marginTop: 10.67,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000000",
    marginLeft: 8,
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: "500",
    color: "#000000",
    marginBottom: 8,
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: "#000000",
    backgroundColor: "#FFFFFF",
    minHeight: 50,
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
  dropdownInput: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 14,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    minHeight: 50,
  },
  dropdownText: {
    fontSize: 16,
    color: "#C7C7CC",
  },
  dropdownTextSelected: {
    color: "#000000",
  },
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 12,
    gap: 8,
  },
  tag: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: 108,
    height: 36,
    borderRadius: 5,
    backgroundColor: "rgba(20, 80, 68, 0.87)",
    paddingHorizontal: 8,
    paddingVertical: 0,
    marginRight: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#E5E5E5",
  },
  tagText: {
    fontWeight: "400",
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0,
    color: "#FFFFFF",
    textAlign: "center",
    flex: 1,
  },
  addTagButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: "#007AFF",
    borderRadius: 16,
    borderStyle: "dashed",
  },
  addTagText: {
    fontSize: 14,
    color: "#007AFF",
    marginLeft: 4,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  modalContainer: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: "70%",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F2F2F7",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000000",
  },
  modalContent: {
    maxHeight: 400,
  },
  modalItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F2F2F7",
  },
  modalItemText: {
    fontSize: 16,
    color: "#000000",
  },
});
