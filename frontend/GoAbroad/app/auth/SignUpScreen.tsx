import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, TextInput, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

export default function SignUpScreen() {
  const [fullName, setFullName] = useState('Ibne Riead');
  const [email, setEmail] = useState('ibnerieadazz@gmail.com');
  const [phoneNumber, setPhoneNumber] = useState('2365 3265 3263');
  const [password, setPassword] = useState('********');
  const [showPassword, setShowPassword] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState('India');
  const [targetUniversity, setTargetUniversity] = useState('X MIT College');

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name="arrow-back" size={24} color="#2C3E50" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Sign Up</Text>
            <View style={styles.headerPlaceholder} />
          </View>

          {/* Title */}
          <Text style={styles.title}>Create an account</Text>
          <Text style={styles.subtitle}>
            Complete your details or continue with social media
          </Text>

          {/* Form */}
          <View style={styles.form}>
            {/* Full Name Input */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Full Name</Text>
              <TextInput
                style={styles.input}
                value={fullName}
                onChangeText={setFullName}
              />
            </View>

            {/* Email Input */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Email</Text>
              <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            {/* Phone Number Input */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Phone Number</Text>
              <View style={styles.phoneContainer}>
                <View style={styles.countryCodeContainer}>
                  <Text style={styles.countryCode}>+1</Text>
                  <Ionicons name="chevron-down" size={16} color="#7F8C8D" />
                </View>
                <TextInput
                  style={styles.phoneInput}
                  value={phoneNumber}
                  onChangeText={setPhoneNumber}
                  keyboardType="phone-pad"
                />
              </View>
            </View>

            {/* Password Input */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Password</Text>
              <View style={styles.passwordContainer}>
                <TextInput
                  style={styles.passwordInput}
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                />
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                  <Ionicons name={showPassword ? "eye-off" : "eye"} size={20} color="#7F8C8D" />
                </TouchableOpacity>
              </View>
            </View>

            {/* Country Selection */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Choose your Country</Text>
              <View style={styles.countryOptions}>
                <TouchableOpacity 
                  style={styles.countryOption}
                  onPress={() => setSelectedCountry('India')}
                >
                  <View style={[styles.countryCheckbox, selectedCountry === 'India' && styles.countryCheckboxChecked]}>
                    {selectedCountry === 'India' && <Ionicons name="checkmark" size={16} color="#FFFFFF" />}
                  </View>
                  <Text style={styles.countryFlag}>🇮🇳</Text>
                  <Text style={styles.countryText}>India</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                  style={styles.countryOption}
                  onPress={() => setSelectedCountry('USA')}
                >
                  <View style={[styles.countryCheckbox, selectedCountry === 'USA' && styles.countryCheckboxChecked]}>
                    {selectedCountry === 'USA' && <Ionicons name="checkmark" size={16} color="#FFFFFF" />}
                  </View>
                  <Text style={styles.countryFlag}>🇺🇸</Text>
                  <Text style={styles.countryText}>United States of America (USA)</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Target University */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Choose your Target Univ</Text>
              <View style={styles.universityContainer}>
                <TextInput
                  style={styles.universityInput}
                  placeholder="Search your university"
                  placeholderTextColor="#7F8C8D"
                />
                <View style={styles.universityTags}>
                  <View style={styles.universityTag}>
                    <Text style={styles.universityTagText}>{targetUniversity}</Text>
                    <TouchableOpacity onPress={() => setTargetUniversity('')}>
                      <Ionicons name="close" size={16} color="#7F8C8D" />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>

          {/* Sign Up Button */}
          <TouchableOpacity 
            style={styles.signUpButton}
            onPress={() => router.push('/auth/OTPVerificationScreen')}
          >
            <Text style={styles.signUpButtonText}>Sign Up</Text>
          </TouchableOpacity>

            {/* Login Link */}
            <View style={styles.loginContainer}>
              <Text style={styles.loginText}>Already have an account? </Text>
              <TouchableOpacity onPress={() => router.push('/auth/LoginScreen')}>
                <Text style={styles.loginLink}>LOG IN</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Social Login */}
          <View style={styles.socialContainer}>
            <Text style={styles.socialText}>Or Login With</Text>
            <View style={styles.socialButtons}>
              <TouchableOpacity style={styles.socialButton}>
                <View style={styles.facebookIcon}>
                  <Text style={styles.facebookText}>f</Text>
                </View>
              </TouchableOpacity>

            <TouchableOpacity style={styles.socialButton}>
              <View style={styles.googleIcon}>
                <Image 
                  source={{ uri: 'https://developers.google.com/identity/images/g-logo.png' }}
                  style={styles.googleLogo}
                />
              </View>
            </TouchableOpacity>

              <TouchableOpacity style={styles.socialButton}>
                <View style={styles.appleIcon}>
                  <Ionicons name="logo-apple" size={20} color="#000000" />
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2C3E50',
  },
  headerPlaceholder: {
    width: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#7F8C8D',
    marginBottom: 40,
    lineHeight: 24,
    textAlign: 'center',
  },
  form: {
    marginBottom: 40,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#2C3E50',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    fontSize: 16,
    backgroundColor: '#FFFFFF',
  },
  phoneContainer: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
  },
  countryCodeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderRightWidth: 1,
    borderRightColor: '#E5E5E5',
  },
  countryCode: {
    fontSize: 16,
    color: '#2C3E50',
    marginRight: 8,
  },
  phoneInput: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 16,
    fontSize: 16,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 12,
    paddingHorizontal: 16,
    backgroundColor: '#FFFFFF',
  },
  passwordInput: {
    flex: 1,
    paddingVertical: 16,
    fontSize: 16,
  },
  countryOptions: {
    gap: 12,
  },
  countryOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  countryCheckbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: '#E5E5E5',
    borderRadius: 4,
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  countryCheckboxChecked: {
    backgroundColor: '#0D5543',
    borderColor: '#0D5543',
  },
  countryFlag: {
    fontSize: 20,
    marginRight: 12,
  },
  countryText: {
    fontSize: 16,
    color: '#2C3E50',
  },
  universityContainer: {
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
  },
  universityInput: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    fontSize: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  universityTags: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  universityTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  universityTagText: {
    fontSize: 14,
    color: '#2C3E50',
    marginRight: 8,
  },
  signUpButton: {
    backgroundColor: '#0D5543',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 20,
  },
  signUpButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginText: {
    fontSize: 14,
    color: '#7F8C8D',
  },
  loginLink: {
    fontSize: 14,
    color: '#0D5543',
    fontWeight: '600',
  },
  socialContainer: {
    alignItems: 'center',
    paddingBottom: 20,
  },
  socialText: {
    fontSize: 14,
    color: '#7F8C8D',
    marginBottom: 20,
  },
  socialButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  socialButton: {
    marginHorizontal: 12,
  },
  facebookIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#1877F2',
    justifyContent: 'center',
    alignItems: 'center',
  },
  facebookText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  googleIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  googleLogo: {
    width: 24,
    height: 24,
  },
  appleIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
});