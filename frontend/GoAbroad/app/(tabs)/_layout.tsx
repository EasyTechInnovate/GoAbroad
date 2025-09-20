import React from 'react';
import { Tabs } from 'expo-router';
import CustomTabBar from '@/components/CustomTabBar';

export default function TabLayout() {
  return (
    <Tabs
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
        headerTitle: '',
        headerStyle: {
          height: 0,
        },
        headerBackTitleVisible: false,
        headerLeft: () => null,
        headerRight: () => null,
        headerTitleStyle: {
          display: 'none',
        },
      }}
    >
      <Tabs.Screen
        name="tab1"
        options={{
          title: 'Home',
          headerShown: false,
          headerTitle: '',
          headerStyle: { height: 0 },
        }}
      />
      <Tabs.Screen
        name="tab2"
        options={{
          title: 'Courses',
          headerShown: false,
          headerTitle: '',
          headerStyle: { height: 0 },
        }}
      />
      <Tabs.Screen
        name="tab3"
        options={{
          title: 'News',
          headerShown: false,
          headerTitle: '',
          headerStyle: { height: 0 },
        }}
      />
      <Tabs.Screen
        name="tab4"
        options={{
          title: 'Blogs',
          headerShown: false,
          headerTitle: '',
          headerStyle: { height: 0 },
        }}
      />
      <Tabs.Screen
        name="tab5"
        options={{
          title: 'Profile',
          headerShown: false,
          headerTitle: '',
          headerStyle: { height: 0 },
        }}
      />
    </Tabs>
  );
}
