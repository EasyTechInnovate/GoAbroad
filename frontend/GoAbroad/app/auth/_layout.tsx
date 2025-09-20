import React from 'react';
import { Stack } from 'expo-router';

export default function AuthLayout() {
  return (
    <Stack>
      <Stack.Screen 
        name="SplashScreen" 
        options={{ 
          headerShown: false,
          animation: 'fade'
        }} 
      />
      <Stack.Screen 
        name="OnboardingScreen" 
        options={{ 
          headerShown: false,
          animation: 'slide_from_right'
        }} 
      />
      <Stack.Screen 
        name="WelcomeScreen" 
        options={{ 
          headerShown: false,
          animation: 'slide_from_right'
        }} 
      />
      <Stack.Screen 
        name="LoginScreen" 
        options={{ 
          headerShown: false,
          animation: 'slide_from_right'
        }} 
      />
      <Stack.Screen 
        name="SignUpScreen" 
        options={{ 
          headerShown: false,
          animation: 'slide_from_right'
        }} 
      />
      <Stack.Screen 
        name="OTPVerificationScreen" 
        options={{ 
          headerShown: false,
          animation: 'slide_from_right'
        }} 
      />
      <Stack.Screen 
        name="ForgotPasswordScreen" 
        options={{ 
          headerShown: false,
          animation: 'slide_from_right'
        }} 
      />
    </Stack>
  );
}
