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

export default function IndexSkeleton({
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
      {/* Circle for Pie Chart */}
      <View style={{ alignItems: "center", marginBottom: 30 }}>
        <Animated.View
          style={{
            width: 200,
            height: 200,
            borderRadius: 100,
            backgroundColor: shimmerColor,
            opacity,
          }}
        />
      </View>

      {/* Portfolio Summary Box */}
      <SkeletonBox
        width="100%"
        height={200}
        borderRadius={12}
        marginBottom={20}
      />

      {/* List of Instrument Boxes */}
      {[...Array(6)].map((_, index) => (
        <SkeletonBox
          key={index}
          width="100%"
          height={60}
          borderRadius={8}
          marginBottom={8}
        ></SkeletonBox>
      ))}
    </View>
  );
}
