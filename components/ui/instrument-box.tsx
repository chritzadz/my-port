import { Instrument } from "@/graphql/__generated__/graphql";
import { useGetToday } from "@/hooks/use-today";
import React from "react";
import { ActivityIndicator, Text, View } from "react-native";

interface InstrumentBoxProps {
  instrument: Instrument;
}

export default function InstrumentBox({ instrument }: InstrumentBoxProps) {
  const { loading, data } = useGetToday(instrument.symbol);

  const todayData = data?.today;

  return (
    <View className="mx-2 my-1 flex-row items-center justify-between p-4">
      <View className="flex-row items-center">
        <Text className="text-base font-semibold text-gray-900">{instrument.symbol}</Text>
      </View>
      <View className="flex-col items-end">
        <Text className="text-base font-bold text-black">${Number(instrument.value).toFixed(2)}</Text>
        <Text className="text-base font-bold text-black">{Number(instrument.currentPosition)}</Text>
        {loading ? (
          <ActivityIndicator size="small" />
        ) : todayData ? (
          <View className="items-end">
            <Text className="text-sm text-gray-600">Close: ${Number(todayData.close).toFixed(2)}</Text>
            <Text className={`text-sm font-medium ${((Number(todayData.close) - Number(instrument.value)) / Number(instrument.value)) * 100 >= 0 ? "text-green-600" : "text-red-600"}`}>
              {(((Number(todayData.close) - Number(instrument.value)) / Number(instrument.value)) * 100).toFixed(2)}%
            </Text>
            <Text className={`text-xs font-medium ${(Number(todayData.close) - Number(instrument.value)) * Number(instrument.volume || 0) >= 0 ? "text-green-600" : "text-red-600"}`}>
              {((Number(todayData.close) - Number(instrument.value)) * Number(instrument.volume || 0)).toFixed(2)}
              {"HKD"}
            </Text>
          </View>
        ) : (
          <Text className="text-sm text-gray-500">No data</Text>
        )}
      </View>
    </View>
  );
}
