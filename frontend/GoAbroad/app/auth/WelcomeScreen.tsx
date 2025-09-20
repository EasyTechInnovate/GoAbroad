import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

export default function WelcomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Logo */}
        <View style={styles.logoContainer}>
          <Image 
            source={require('@/assets/images/intro4.png.png')} 
            style={styles.logoImage}
            resizeMode="contain"
          />
        </View>

        {/* Welcome Text */}
        <Text style={styles.welcomeText}>Welcome to Goupbroad</Text>
        <Text style={styles.subtitleText}>
          Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet.
        </Text>

        {/* Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={styles.primaryButton}
            onPress={() => router.push('/auth/SignUpScreen')}
          >
            <Text style={styles.primaryButtonText}>Create an Account</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.secondaryButton}
            onPress={() => router.push('/auth/LoginScreen')}
          >
            <Text style={styles.secondaryButtonText}>Log In</Text>
          </TouchableOpacity>
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
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  logoContainer: {
    marginBottom: 40,
  },
  logoImage: {
    width: 120,
    height: 120,
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2C3E50',
    textAlign: 'center',
    marginBottom: 16,
  },
  subtitleText: {
    fontSize: 16,
    color: '#7F8C8D',
    textAlign: 'center',
    marginBottom: 50,
    lineHeight: 24,
  },
  buttonContainer: {
    width: '100%',
    marginBottom: 40,
  },
  primaryButton: {
    backgroundColor: '#0D5543',
    paddingVertical: 16,
    borderRadius: 25,
    marginBottom: 16,
    alignItems: 'center',
  },
  primaryButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    paddingVertical: 16,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#0D5543',
    alignItems: 'center',
  },
  secondaryButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0D5543',
  },
  socialContainer: {
    alignItems: 'center',
    width: '100%',
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
