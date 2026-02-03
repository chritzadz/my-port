import classNames from "@/utils/classnames";
import { tw } from "@/utils/tailwind-styles";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Platform, Pressable, ScrollView, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type GeneralViewProps = {
  children?: React.ReactNode;
  className?: string;
  handleBack?: () => void;
  headerTitle?: string;
  showOnlyBackButton?: boolean;
  scrollable?: boolean;
  contentPadding?: boolean;
  title?: string; // Keep for backward compatibility
};

export default function GeneralView({
  children,
  className,
  handleBack,
  headerTitle,
  title, // backward compatibility
  showOnlyBackButton = false,
  scrollable = true,
  contentPadding = false,
}: GeneralViewProps) {
  const insets = useSafeAreaInsets();
  const displayTitle = headerTitle || title;

  // Simple header for backward compatibility (no back button)
  if (!handleBack) {
    return (
      <View className="flex-1 bg-white">
        {displayTitle && (
          <View
            className="bg-white px-6 pb-4"
            style={{ paddingTop: insets.top + 24 }}
          >
            <Text className="text-3xl font-bold text-gray-900">
              {displayTitle}
            </Text>
          </View>
        )}
        {scrollable ? (
          <ScrollView
            className={`flex-1 ${className || "bg-white"}`}
            contentContainerStyle={{
              flexGrow: 1,
              ...(contentPadding && {
                paddingHorizontal: 16,
                paddingVertical: 16,
              }),
            }}
            showsVerticalScrollIndicator={false}
          >
            <View className="flex-1">{children}</View>
          </ScrollView>
        ) : (
          <View
            className={`flex-1 ${className || "bg-white"} ${contentPadding ? "px-4 py-4" : ""}`}
          >
            {children}
          </View>
        )}
      </View>
    );
  }

  return (
    <View className="flex-1 bg-white">
      {/* Fixed Sticky Header with Manual Safe Area */}
      {showOnlyBackButton ? (
        <View
          className={classNames(
            "bg-white px-6 pb-4 border-b border-gray-200 shadow-sm",
            {
              "shadow-sm": Platform.OS === "android",
              "shadow-lg": Platform.OS === "ios",
            },
          )}
          style={{ paddingTop: insets.top + 24 }}
        >
          <View className="flex-row items-center">
            <Pressable onPress={handleBack} className="p-2">
              <Ionicons
                name="chevron-back-outline"
                size={24}
                color={tw("text-primary-red").color}
              />
            </Pressable>
          </View>
        </View>
      ) : (
        <View
          className="bg-white px-6 pb-4 border-b border-gray-200 shadow-md"
          style={{ paddingTop: insets.top + 24 }}
        >
          <View className="flex-row items-center">
            <Pressable onPress={handleBack} className="p-2">
              <Ionicons
                name="chevron-back-outline"
                size={24}
                color={tw("text-primary-red").color}
              />
            </Pressable>
            <Text className="text-2xl font-bold text-gray-900 ml-2">
              {displayTitle}
            </Text>
          </View>
        </View>
      )}

      {/* Content Area */}
      {scrollable ? (
        <ScrollView
          className={`flex-1 ${className || "bg-white"}`}
          contentContainerStyle={{
            flexGrow: 1,
            ...(contentPadding && {
              paddingHorizontal: 16,
              paddingVertical: 16,
            }),
          }}
          showsVerticalScrollIndicator={false}
        >
          <View className="flex-1">{children}</View>
        </ScrollView>
      ) : (
        <View
          className={`flex-1 ${className || "bg-white"} ${contentPadding ? "px-4 py-4" : ""}`}
        >
          {children}
        </View>
      )}
    </View>
  );
}
