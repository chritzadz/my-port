import { Instrument } from "@/graphql/__generated__/graphql";
import React from "react";
import { ScrollView, Text, View } from "react-native";
import PieChart from "react-native-pie-chart";

type Slice = {
  value: number;
  color: string;
};

export default function PortfolioPieChart({ data }: { data: Instrument[] }) {
  console.log("PieChart data:", JSON.stringify(data, null, 2));

  if (!data || !Array.isArray(data) || data.length === 0) {
    console.log("PieChart: Invalid data received");
    return (
      <View style={{ height: 200 }}>
        <Text>No chart data</Text>
      </View>
    );
  }

  const widthAndHeight = 200;
  const colors = [
    "#4F8EF7",
    "#F78E4F",
    "#4FF78E",
    "#F74F8E",
    "#8E4FF7",
    "#FF6B6B",
    "#4ECDC4",
  ];

  const series: Slice[] = data.map((item, index) => ({
    value: Number(item.value) * Number(item.currentPosition) || 0,
    color: colors[index % colors.length],
  }));

  return (
    <ScrollView contentContainerStyle={{ alignItems: "center", padding: 16 }}>
      <PieChart widthAndHeight={widthAndHeight} series={series} />

      {/* Legend */}
      <View style={{ marginTop: 20, width: "100%" }}>
        <Text
          style={{
            fontSize: 16,
            fontWeight: "bold",
            marginBottom: 12,
            textAlign: "center",
          }}
        >
          Portfolio Breakdown
        </Text>
        {data.map((item, index) => {
          const percentage = (
            ((Number(item.value) * Number(item.currentPosition)) /
              series.reduce((sum, slice) => sum + slice.value, 0)) *
            100
          ).toFixed(1);
          return (
            <View
              key={item.symbol}
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 8,
                paddingHorizontal: 16,
              }}
            >
              <View
                style={{
                  width: 16,
                  height: 16,
                  backgroundColor: colors[index % colors.length],
                  marginRight: 12,
                  borderRadius: 8,
                }}
              />
              <Text style={{ flex: 1, fontSize: 14 }}>{item.symbol}</Text>
              <Text style={{ fontSize: 14, fontWeight: "500" }}>
                {percentage}%
              </Text>
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
}
