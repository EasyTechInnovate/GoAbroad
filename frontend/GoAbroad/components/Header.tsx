import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import BackButton from './BackButton';

interface HeaderProps {
  title: string;
  onBackPress?: () => void;
  showBackButton?: boolean;
  rightComponent?: React.ReactNode;
}

export default function Header({ 
  title, 
  onBackPress, 
  showBackButton = true, 
  rightComponent 
}: HeaderProps) {
  return (
    <View style={styles.header}>
      <View style={styles.leftSection}>
        {showBackButton ? <BackButton onPress={onBackPress} /> : <View style={styles.backButtonPlaceholder} />}
      </View>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.rightSection}>
        {rightComponent || <View style={styles.rightComponentPlaceholder} />}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 40, // Fixed width for back button area
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2C3E50',
    flex: 1,
    textAlign: 'center',
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 40, // Fixed width for right component area
  },
  backButtonPlaceholder: {
    width: 40,
    height: 40,
  },
  rightComponentPlaceholder: {
    width: 40,
    height: 40,
  },
});