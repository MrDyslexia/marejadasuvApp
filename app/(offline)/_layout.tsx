import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';
import { Home, Waves, ChartSpline, FolderOpen } from "lucide-react-native";
import { HapticTab } from '@/components/ui/HapticTab';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarShowLabel: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: 'absolute',
          },
          default: {justifyContent: 'center', alignItems: 'center'},
        }),
        tabBarLabelStyle: { display: "none" },
      }}>
      <Tabs.Screen
        name="Home"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <Home size={28} color={color} />,
        }}
      />
      <Tabs.Screen
        name="Categorias"
        options={{
          title: 'Categorias',
          tabBarIcon: ({ color }) => <FolderOpen size={28} color={color} />,
        }}
      />
      <Tabs.Screen
        name="po"
        options={{
          title: 'Pronóstico Oceánico',
          tabBarIcon: ({ color }) => <ChartSpline size={28} color={color} />,
        }}
      />
      <Tabs.Screen
        name="pc"
        options={{
          title: 'Pronóstico Costero',
          tabBarIcon: ({ color }) => <Waves size={28} color={color} />,
        }}
      />      
    </Tabs>
  );
}