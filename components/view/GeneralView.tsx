import classNames from 'classnames';
import React from "react";
import { Text, View } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";

interface GeneralViewProps {
	title?: string;
  children?: React.ReactNode;
}

export default function GeneralView({ title, children }: GeneralViewProps) {
	const header: boolean = title != null;
	const insets = useSafeAreaInsets();
	
  return (
    <SafeAreaView edges={['top', 'left', 'right']} className={classNames("flex-1", {"bg-off-white": !header}, { "bg-pale-brown": header })}>
      {
				header && (
					<View className="m-4">
						<Text className="text-3xl font-bold text-white">{title}</Text>
					</View>
				)
			}
      <View className="flex-1 bg-off-white" style={{ paddingBottom: insets.bottom }}>
				{children}
			</View>
    </SafeAreaView>
  );
}