import { Stack } from 'expo-router';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SplashScreen from '@/components/SplashScreen';

export default function RootLayout() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const token = await AsyncStorage.getItem('authToken');
      setIsAuthenticated(!!token);
    } catch (error) {
      console.error('Error checking auth status:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <SplashScreen onFinish={() => setIsLoading(false)} />;
  }

  return <RootLayoutNav isAuthenticated={isAuthenticated} />;
}

function RootLayoutNav({ isAuthenticated }: { isAuthenticated: boolean }) {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        headerTitle: '',
        headerStyle: { height: 0 },
        headerBackTitleVisible: false,
        headerLeft: () => null,
        headerRight: () => null,
      }}
    >
      {isAuthenticated ? (
        <>
          <Stack.Screen 
            name="(tabs)" 
            options={{ 
              headerShown: false,
              headerTitle: '',
              headerStyle: {
                height: 0,
              },
            }} 
          />
          <Stack.Screen 
            name="modal" 
            options={{ 
              presentation: 'modal',
              headerShown: false,
              headerTitle: '',
            }} 
          />
        </>
      ) : (
        <Stack.Screen 
          name="auth" 
          options={{ 
            headerShown: false,
            headerTitle: '',
            headerStyle: { height: 0 },
          }} 
        />
      )}
    </Stack>
  );
}