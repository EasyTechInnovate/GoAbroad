import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';

export default function CustomTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  return (
    <View style={styles.container}>
      <View style={styles.tabBar}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label = options.tabBarLabel !== undefined 
            ? options.tabBarLabel 
            : options.title !== undefined 
            ? options.title 
            : route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name, route.params);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          const getIconName = () => {
            switch (route.name) {
              case 'tab1':
                return isFocused ? 'home' : 'home-outline';
              case 'tab2':
                return isFocused ? 'book' : 'book-outline';
              case 'tab3':
                return isFocused ? 'newspaper' : 'newspaper-outline';
              case 'tab4':
                return isFocused ? 'document-text' : 'document-text-outline';
              case 'tab5':
                return isFocused ? 'person' : 'person-outline';
              default:
                return 'circle-outline';
            }
          };

          return (
            <TouchableOpacity
              key={route.key}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={[
                styles.tabItem,
                isFocused && styles.activeTabItem,
              ]}
            >
              <View style={[
                styles.iconContainer,
                isFocused && styles.activeIconContainer,
              ]}>
                <Ionicons
                  name={getIconName()}
                  size={isFocused ? 26 : 24}
                  color={isFocused ? '#FFFFFF' : '#95A5A6'}
                />
              </View>
              <Text style={[
                styles.label,
                isFocused && styles.activeLabel,
              ]}>
                {label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 10,
    paddingBottom: Platform.OS === 'ios' ? 20 : 10,
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 10,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 4,
    borderRadius: 16,
    marginHorizontal: 2,
  },
  activeTabItem: {
    backgroundColor: '#0D5543',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
  activeIconContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  label: {
    fontSize: 11,
    fontWeight: '600',
    color: '#95A5A6',
  },
  activeLabel: {
    color: '#FFFFFF',
  },
});


