import { Instrument } from "@/graphql/__generated__/graphql";
import React from "react";
import { Text, View } from "react-native";

interface InstrumentBoxProps {
  instrument: Instrument;
  index: number;
}

export default function InstrumentBox({
  instrument,
  index,
}: InstrumentBoxProps) {
  return (
    <View className="flex-row justify-between items-center p-4 my-1 mx-2">
      <View className="flex-row items-center">
        <Text className="text-sm font-medium text-gray-500 mr-2">
          {index + 1}.
        </Text>
        <Text className="text-base font-semibold text-gray-900">
          {instrument.symbol}
        </Text>
      </View>
      <View className="items-end">
        <Text className="text-base font-bold text-black">
          ${Number(instrument.value).toFixed(2)}
        </Text>
      </View>
    </View>
  );
}
