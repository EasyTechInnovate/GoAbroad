import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

interface BackButtonProps {
  onPress?: () => void;
  color?: string;
  size?: number;
  style?: any;
}

export default function BackButton({ 
  onPress, 
  color = '#2C3E50', 
  size = 24, 
  style 
}: BackButtonProps) {
  const handlePress = () => {
    if (onPress) {
      onPress();
    } else {
      router.back();
    }
  };

  return (
    <TouchableOpacity 
      style={[styles.backButton, style]} 
      onPress={handlePress}
      accessibilityLabel="Go back"
      accessibilityRole="button"
    >
      <Ionicons name="arrow-back" size={size} color={color} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  backButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
  },
});


