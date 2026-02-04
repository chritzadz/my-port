import { Instrument } from "@/graphql/__generated__/graphql";
import { useGetToday } from "@/hooks/use-today";
import React, { useEffect } from "react";
import { ActivityIndicator, Text, View } from "react-native";

interface InstrumentBoxProps {
  instrument: Instrument;
  index: number;
}

export default function InstrumentBox({
  instrument,
  index,
}: InstrumentBoxProps) {
  const { loading, data, executeGetToday } = useGetToday(instrument.symbol);

  useEffect(() => {
    // Add 3 second delay for each request free-tier limitting
    const delay = (index + 1) * 1500;

    const timer = setTimeout(() => {
      executeGetToday();
    }, delay);

    return () => clearTimeout(timer);
  }, [executeGetToday, index]);

  const todayData = data?.today;

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
      <View className="items-end flex-col">
        <Text className="text-base font-bold text-black">
          ${Number(instrument.value).toFixed(2)}
        </Text>
        {loading ? (
          <ActivityIndicator size="small" />
        ) : todayData ? (
          <View className="items-end">
            <Text className="text-sm text-gray-600">
              Close: ${Number(todayData.close).toFixed(2)}
            </Text>
            <Text
              className={`text-sm font-medium ${
                ((Number(todayData.close) - Number(instrument.value)) /
                  Number(instrument.value)) *
                  100 >=
                0
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {(
                ((Number(todayData.close) - Number(instrument.value)) /
                  Number(instrument.value)) *
                100
              ).toFixed(2)}
              %
            </Text>
            <Text
              className={`text-xs font-medium ${
                (Number(todayData.close) - Number(instrument.value)) *
                  Number(instrument.volume || 0) >=
                0
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {(
                (Number(todayData.close) - Number(instrument.value)) *
                Number(instrument.volume || 0)
              ).toFixed(2)}
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
