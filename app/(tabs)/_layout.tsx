import * as Haptics from 'expo-haptics';
import { Tabs } from 'expo-router';
import React from 'react';
import { Pressable, View } from 'react-native';

import { useColorScheme } from '@/hooks/use-color-scheme';
import classNames from 'classnames';
import { Compass, Home } from 'lucide-react-native';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      tabBar={({ state, descriptors, navigation }) => (
        <View className="absolute bottom-8 left-0 right-0 items-center">
          <View className="flex-row bg-pale-brown rounded-full shadow-lg w-[200px] h-[60px] items-center justify-evenly">
            {state.routes.map((route, index) => {
              const { options } = descriptors[route.key];
              const isFocused = state.index === index;

              const onPress = () => {
                if (!isFocused) {
                  navigation.navigate(route.name, route.params);
                }
              };

              return (
                <Pressable
                  key={route.key}
                  onPress={onPress}
                  onPressIn={() => {
                    if (process.env.EXPO_OS === 'ios') {
                      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                    }
                  }}
                  className="items-center justify-center rounded-full"
                >
                  {options.tabBarIcon?.({
                    focused: isFocused,
                    color: 'white',
                    size: 24,
                  })}
                </Pressable>
              );
            })}
          </View>
        </View>
      )}
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <View className={classNames("items-center justify-center w-14 h-12 rounded-full", { "bg-pale-green": focused })}>
              <Home color={focused ? 'white' : 'white'} size={24} />
            </View>
          )
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color, focused }) => (
            <View className={classNames("items-center justify-center w-12 h-12 rounded-full", {"bg-pale-green": focused} )}>
              <Compass color={focused ? 'white' : 'white'} size={24} />
            </View>
          )
        }}
      />
    </Tabs>
  );
}
