import { Tabs, usePathname } from 'expo-router';
import React, { useEffect } from 'react';
import { View } from 'react-native';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { top } = useSafeAreaInsets();

  useEffect(() => {
    // createDatabase('ama').then(async (db) => {
    //   const res = db.execAsync(`
    //     PRAGMA journal_mode = WAL;
    //     CREATE TABLE IF NOT EXISTS user (
    //       id INTEGER PRIMARY KEY NOT NULL,
    //       username TEXT NOT NULL,
    //       password TEXT NOT NULL,
    //       token TEXT,
    //   `);
    // });
  }, []);

  return (
    <View style={{ paddingTop: top, height: '100%', backgroundColor: '#fff' }}>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
          headerShown: false,
          tabBarLabel: () => null,
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon
                name={focused ? 'home' : 'home-outline'}
                color={focused ? '#1e7ed4' : '#aad3f8'}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="explore"
          options={{
            title: '',
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon
                name={focused ? 'add-circle' : 'add-circle-outline'}
                color={focused ? '#1e7ed4' : '#aad3f8'}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="me"
          options={{
            title: '',
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon
                name={focused ? 'accessibility' : 'accessibility-outline'}
                color={focused ? '#1e7ed4' : '#aad3f8'}
              />
            ),
          }}
        />
      </Tabs>
    </View>
  );
}
