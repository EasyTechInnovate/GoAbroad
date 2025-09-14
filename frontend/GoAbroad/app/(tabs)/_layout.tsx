import React from 'react';
import { Tabs } from 'expo-router';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="tab1"
        options={{
           headerShown: false ,
          title: 'Home',
            tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="tab2"

        options={{
              headerShown: false ,
          title: 'Courses',
           tabBarIcon: ({ color, size }) => (
            <Ionicons name="book-outline" size={size} color={color} />
          ),
        }}
      />
       <Tabs.Screen
        name="tab3"
        options={{
              headerShown: false ,
          title: 'News',
           tabBarIcon: ({ color, size }) => (
            <Ionicons name="calendar-outline" size={size} color={color} />
          ),
        }}
      />
       <Tabs.Screen
        name="tab4"
        options={{
          title: 'Blogs',
              headerShown: false ,
            tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="chat-bubble-outline" size={size} color={color} />
          ),
        }}
      />
       <Tabs.Screen
        name="tab5"
        options={{
          title: 'Profile',
              headerShown: false ,
            tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
