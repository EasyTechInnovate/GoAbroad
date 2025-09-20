import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, TextInput, Keyboard } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState('ibnerieadazz@gmail.com');

  const handleSendOTP = () => {
    // Handle send OTP logic here
    router.push('/auth/OTPVerificationScreen');
  };

  const handleKeyPress = (key: string) => {
    if (key === '@') {
      setEmail(prev => prev + '@');
    } else if (key === '.com') {
      setEmail(prev => prev + '.com');
    } else if (key === 'space') {
      setEmail(prev => prev + ' ');
    } else {
      setEmail(prev => prev + key);
    }
  };

  const handleBackspace = () => {
    setEmail(prev => prev.slice(0, -1));
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Ionicons name="arrow-back" size={24} color="#2C3E50" />
          </TouchableOpacity>
          <Text style={styles.title}>Forgot Password</Text>
        </View>

        {/* Content */}
        <View style={styles.forgotContent}>
          <Text style={styles.subtitle}>
            Enter your email address and we'll send you a verification code to reset your password.
          </Text>

          {/* Email Input */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Email</Text>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              placeholder="Enter your email"
            />
          </View>

          {/* Send OTP Button */}
          <TouchableOpacity style={styles.sendButton} onPress={handleSendOTP}>
            <Text style={styles.sendButtonText}>Send OTP</Text>
          </TouchableOpacity>
        </View>

        {/* QWERTY Keyboard */}
        <View style={styles.keyboard}>
          <View style={styles.keyboardRow}>
            {['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'].map((key) => (
              <TouchableOpacity
                key={key}
                style={styles.keyboardKey}
                onPress={() => handleKeyPress(key.toLowerCase())}
              >
                <Text style={styles.keyboardKeyText}>{key}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <View style={styles.keyboardRow}>
            {['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'].map((key) => (
              <TouchableOpacity
                key={key}
                style={styles.keyboardKey}
                onPress={() => handleKeyPress(key.toLowerCase())}
              >
                <Text style={styles.keyboardKeyText}>{key}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <View style={styles.keyboardRow}>
            <TouchableOpacity
              style={styles.keyboardKey}
              onPress={() => handleKeyPress('@')}
            >
              <Text style={styles.keyboardKeyText}>@</Text>
            </TouchableOpacity>
            {['Z', 'X', 'C', 'V', 'B', 'N', 'M'].map((key) => (
              <TouchableOpacity
                key={key}
                style={styles.keyboardKey}
                onPress={() => handleKeyPress(key.toLowerCase())}
              >
                <Text style={styles.keyboardKeyText}>{key}</Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity
              style={styles.keyboardKey}
              onPress={() => handleKeyPress('.com')}
            >
              <Text style={styles.keyboardKeyText}>.com</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.keyboardRow}>
            <TouchableOpacity
              style={styles.keyboardKey}
              onPress={() => handleKeyPress('space')}
            >
              <Text style={styles.keyboardKeyText}>space</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.keyboardKey}
              onPress={handleBackspace}
            >
              <Ionicons name="backspace-outline" size={20} color="#2C3E50" />
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
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20,
    marginTop: 20,
  },
  backButton: {
    padding: 8,
    marginRight: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2C3E50',
  },
  forgotContent: {
    flex: 1,
    justifyContent: 'center',
    paddingVertical: 40,
  },
  subtitle: {
    fontSize: 16,
    color: '#7F8C8D',
    textAlign: 'center',
    marginBottom: 40,
    lineHeight: 24,
  },
  inputContainer: {
    marginBottom: 30,
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
    paddingVertical: 14,
    fontSize: 16,
    backgroundColor: '#F8F9FA',
  },
  sendButton: {
    backgroundColor: '#0D5543',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  sendButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  keyboard: {
    paddingBottom: 20,
  },
  keyboardRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 8,
  },
  keyboardKey: {
    minWidth: 30,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    borderRadius: 8,
    marginHorizontal: 2,
    paddingHorizontal: 8,
  },
  keyboardKeyText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#2C3E50',
  },
});
