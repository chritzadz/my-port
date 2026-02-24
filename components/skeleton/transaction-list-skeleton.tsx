import React, { useEffect, useRef } from "react";
import { Animated, View, ViewStyle } from "react-native";

interface ShimmerViewProps {
  isLoading: boolean;
  children: React.ReactNode;
  shimmerColor?: string;
  highlightColor?: string;
  duration?: number;
  style?: ViewStyle;
}

export default function TransactionListSkeleton({
  isLoading,
  children,
  shimmerColor = "#E1E9EE",
  highlightColor = "#F2F8FC",
  duration = 1500,
  style,
}: ShimmerViewProps) {
  const shimmerAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isLoading) {
      const animation = Animated.loop(
        Animated.timing(shimmerAnim, {
          toValue: 1,
          duration: duration,
          useNativeDriver: false,
        }),
      );
      animation.start();
      return () => animation.stop();
    }
  }, [isLoading, shimmerAnim, duration]);

  if (!isLoading) {
    return <>{children}</>;
  }

  const opacity = shimmerAnim.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0.3, 1, 0.3],
  });

  const SkeletonBox = ({
    width,
    height,
    borderRadius = 8,
    marginBottom = 12,
  }: {
    width: number | string;
    height: number;
    borderRadius?: number;
    marginBottom?: number;
  }) => (
    <Animated.View
      style={{
        width,
        height,
        backgroundColor: shimmerColor,
        borderRadius,
        marginBottom,
        opacity,
      }}
    />
  );

  return (
    <View style={[style, { padding: 20 }]}>
      {/* Portfolio Summary Box */}
      <SkeletonBox
        width="100%"
        height={120}
        borderRadius={12}
        marginBottom={20}
      />
      <SkeletonBox
        width="100%"
        height={120}
        borderRadius={12}
        marginBottom={20}
      />
      <SkeletonBox
        width="100%"
        height={120}
        borderRadius={12}
        marginBottom={20}
      />
      <SkeletonBox
        width="100%"
        height={120}
        borderRadius={12}
        marginBottom={20}
      />
      <SkeletonBox
        width="100%"
        height={120}
        borderRadius={12}
        marginBottom={20}
      />
      <SkeletonBox
        width="100%"
        height={120}
        borderRadius={12}
        marginBottom={20}
      />
      <SkeletonBox
        width="100%"
        height={120}
        borderRadius={12}
        marginBottom={20}
      />
      <SkeletonBox
        width="100%"
        height={120}
        borderRadius={12}
        marginBottom={20}
      />
      <SkeletonBox
        width="100%"
        height={120}
        borderRadius={12}
        marginBottom={20}
      />
    </View>
  );
}
