import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, TextInput, Keyboard } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

export default function OTPVerificationScreen() {
  const [otp, setOtp] = useState(['5', '6', '3', '1', '9', '']);
  const [timeLeft, setTimeLeft] = useState(60);
  const [isResendDisabled, setIsResendDisabled] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setIsResendDisabled(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleOTPChange = (value: string, index: number) => {
    // Only allow single digit input
    if (value.length > 1) {
      value = value.slice(-1);
    }
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-verify when all 6 digits are entered
    if (value && index === 5) {
      const isComplete = newOtp.every(digit => digit !== '');
      if (isComplete) {
        // Auto-verify after a short delay
        setTimeout(() => {
          handleVerify();
        }, 500);
      }
    }
  };

  const handleVerify = () => {
    // Check if OTP is complete (all 6 digits filled)
    const isOTPComplete = otp.every(digit => digit !== '');
    
    if (!isOTPComplete) {
      // Show error or alert
      alert('Please enter the complete OTP code');
      return;
    }
    
    // Here you would typically verify the OTP with your backend
    // For now, we'll simulate a successful verification
    const enteredOTP = otp.join('');
    
    // Multiple valid OTPs for testing (replace with actual API call)
    const validOTPs = ['563190', '123456', '000000', '111111', '999999'];
    
    if (validOTPs.includes(enteredOTP)) {
      // Successful verification - redirect to tab screen
      router.replace('/(tabs)/tab1' as any);
    } else {
      // Invalid OTP
      alert('Invalid OTP. Please try again.');
      // Clear the OTP inputs
      setOtp(['', '', '', '', '', '']);
    }
  };

  const handleResend = () => {
    setTimeLeft(60);
    setIsResendDisabled(true);
    // Handle resend OTP logic here
  };

  const handleKeyPress = (key: string) => {
    const emptyIndex = otp.findIndex(digit => digit === '');
    if (emptyIndex !== -1) {
      handleOTPChange(key, emptyIndex);
    }
  };

  const handleBackspace = () => {
    const lastFilledIndex = otp.findLastIndex(digit => digit !== '');
    if (lastFilledIndex !== -1) {
      const newOtp = [...otp];
      newOtp[lastFilledIndex] = '';
      setOtp(newOtp);
    }
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
          <Text style={styles.title}>Verification</Text>
        </View>

        {/* Content */}
        <View style={styles.verificationContent}>
          <Text style={styles.subtitle}>
            We have sent a verification code to{'\n'}
            <Text style={styles.email}>riead2562@gmail.com</Text>
          </Text>

          {/* OTP Input */}
          <View style={styles.otpContainer}>
            {otp.map((digit, index) => (
              <TextInput
                key={index}
                style={styles.otpInput}
                value={digit}
                onChangeText={(value) => handleOTPChange(value, index)}
                keyboardType="numeric"
                maxLength={1}
                textAlign="center"
              />
            ))}
          </View>

          {/* Timer and Resend */}
          <View style={styles.timerContainer}>
            <Text style={styles.timerText}>
              {isResendDisabled ? formatTime(timeLeft) : '00:00'}
            </Text>
            <TouchableOpacity 
              onPress={handleResend}
              disabled={isResendDisabled}
            >
              <Text style={[
                styles.resendText,
                isResendDisabled && styles.resendDisabled
              ]}>
                Resend Code
              </Text>
            </TouchableOpacity>
          </View>

          {/* Verify Button */}
          <TouchableOpacity style={styles.verifyButton} onPress={handleVerify}>
            <Text style={styles.verifyButtonText}>Verify</Text>
          </TouchableOpacity>

        </View>

        {/* Numeric Keypad */}
        <View style={styles.keypad}>
          <View style={styles.keypadRow}>
            {['1', '2', '3'].map((key) => (
              <TouchableOpacity
                key={key}
                style={styles.keypadKey}
                onPress={() => handleKeyPress(key)}
              >
                <Text style={styles.keypadKeyText}>{key}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <View style={styles.keypadRow}>
            {['4', '5', '6'].map((key) => (
              <TouchableOpacity
                key={key}
                style={styles.keypadKey}
                onPress={() => handleKeyPress(key)}
              >
                <Text style={styles.keypadKeyText}>{key}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <View style={styles.keypadRow}>
            {['7', '8', '9'].map((key) => (
              <TouchableOpacity
                key={key}
                style={styles.keypadKey}
                onPress={() => handleKeyPress(key)}
              >
                <Text style={styles.keypadKeyText}>{key}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <View style={styles.keypadRow}>
            <View style={styles.keypadKey} />
            <TouchableOpacity
              style={styles.keypadKey}
              onPress={() => handleKeyPress('0')}
            >
              <Text style={styles.keypadKeyText}>0</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.keypadKey}
              onPress={handleBackspace}
            >
              <Ionicons name="backspace-outline" size={24} color="#2C3E50" />
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
  verificationContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#7F8C8D',
    textAlign: 'center',
    marginBottom: 40,
    lineHeight: 24,
  },
  email: {
    fontWeight: '600',
    color: '#2C3E50',
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  otpInput: {
    width: 45,
    height: 55,
    borderWidth: 2,
    borderColor: '#E5E5E5',
    borderRadius: 12,
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2C3E50',
    backgroundColor: '#F8F9FA',
  },
  timerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  timerText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0D5543',
    marginRight: 16,
  },
  resendText: {
    fontSize: 16,
    color: '#0D5543',
    fontWeight: '500',
  },
  resendDisabled: {
    color: '#BDC3C7',
  },
  verifyButton: {
    backgroundColor: '#0D5543',
    paddingVertical: 16,
    paddingHorizontal: 60,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 40,
  },
  verifyButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  keypad: {
    paddingBottom: 20,
  },
  keypadRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  keypadKey: {
    width: 80,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
  },
  keypadKeyText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2C3E50',
  },
});
