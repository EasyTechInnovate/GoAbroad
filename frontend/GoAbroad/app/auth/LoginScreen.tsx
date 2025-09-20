import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, TextInput, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

export default function LoginScreen() {
  const [email, setEmail] = useState('ibnerieadazz@gmail.com');
  const [password, setPassword] = useState('********');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="#2C3E50" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Log In</Text>
          <View style={styles.headerPlaceholder} />
        </View>

        {/* Title */}
        <Text style={styles.title}>Welcome Back</Text>
        <Text style={styles.subtitle}>
          Sign in with your email and password or continue with social media
        </Text>

        {/* Form */}
        <View style={styles.form}>
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

          {/* Remember Me & Forgot Password */}
          <View style={styles.optionsContainer}>
            <TouchableOpacity 
              style={styles.checkboxContainer}
              onPress={() => setRememberMe(!rememberMe)}
            >
              <View style={[styles.checkbox, rememberMe && styles.checkboxChecked]}>
                {rememberMe && <Ionicons name="checkmark" size={16} color="#FFFFFF" />}
              </View>
              <Text style={styles.checkboxText}>Remember me</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={styles.forgotText}>Forgot Password?</Text>
            </TouchableOpacity>
          </View>

          {/* Login Button */}
          <TouchableOpacity 
            style={styles.loginButton}
            onPress={() => router.push('/auth/OTPVerificationScreen')}
          >
            <Text style={styles.loginButtonText}>Log In</Text>
          </TouchableOpacity>

          {/* Sign Up Link */}
          <View style={styles.signUpContainer}>
            <Text style={styles.signUpText}>Don't have an account? </Text>
            <TouchableOpacity onPress={() => router.push('/auth/SignUpScreen')}>
              <Text style={styles.signUpLink}>SIGN UP</Text>
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 20,
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
    marginBottom: 30,
    lineHeight: 24,
    textAlign: 'center',
  },
  form: {
    flex: 1,
    justifyContent: 'space-between',
  },
  inputContainer: {
    marginBottom: 10,
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
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 16,
    fontSize: 16,
    backgroundColor: '#FFFFFF',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 8,
    paddingHorizontal: 16,
    backgroundColor: '#FFFFFF',
  },
  passwordInput: {
    flex: 1,
    paddingVertical: 16,
    fontSize: 16,
  },
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: '#E5E5E5',
    borderRadius: 4,
    marginRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#0D5543',
    borderColor: '#0D5543',
  },
  checkboxText: {
    fontSize: 14,
    color: '#2C3E50',
  },
  forgotText: {
    fontSize: 14,
    color: '#0D5543',
    fontWeight: '500',
  },
  loginButton: {
    backgroundColor: '#0D5543',
    paddingVertical: 16,
    borderRadius: 25,
    alignItems: 'center',
    marginBottom: 15,
  },
  loginButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  signUpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  signUpText: {
    fontSize: 14,
    color: '#7F8C8D',
  },
  signUpLink: {
    fontSize: 14,
    color: '#0D5543',
    fontWeight: '600',
  },
  socialContainer: {
    alignItems: 'center',
    paddingBottom: 20,
    marginTop: 10,
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