import * as Haptics from "expo-haptics";
import { Tabs } from "expo-router";
import React from "react";
import { Pressable, View } from "react-native";

import classNames from "classnames";
import { Compass, Home, Wallet } from "lucide-react-native";

export default function TabLayout() {
  return (
    <Tabs
      tabBar={({ state, descriptors, navigation }) => (
        <View className="absolute bottom-8 left-0 right-0 items-center">
          <View className="bg-charcoal h-[60px] w-[200px] flex-row items-center justify-evenly rounded-full shadow-lg">
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
                    if (process.env.EXPO_OS === "ios") {
                      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                    }
                  }}
                  className="items-center justify-center rounded-full"
                >
                  {options.tabBarIcon?.({
                    focused: isFocused,
                    color: "white",
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
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <View className={classNames("h-12 w-14 items-center justify-center rounded-full", { "bg-muted": focused })}>
              <Home color={focused ? "white" : "white"} size={24} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="transaction-list"
        options={{
          title: "Transaction",
          tabBarIcon: ({ color, focused }) => (
            <View className={classNames("h-12 w-12 items-center justify-center rounded-full", { "bg-muted": focused })}>
              <Compass color={focused ? "white" : "white"} size={24} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="daily-expense"
        options={{
          title: "Daily Expense",
          tabBarIcon: ({ color, focused }) => (
            <View className={classNames("h-12 w-12 items-center justify-center rounded-full", { "bg-muted": focused })}>
              <Wallet color={focused ? "white" : "white"} size={24} />
            </View>
          ),
        }}
      />
    </Tabs>
  );
}
