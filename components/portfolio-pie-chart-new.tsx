import { Instrument } from "@/graphql/__generated__/graphql";
import React from "react";
import { Text, View } from "react-native";
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
    value: Number(item.value) || 0,
    color: colors[index % colors.length],
  }));

  return (
    <View style={{ alignItems: "center" }}>
      <PieChart widthAndHeight={widthAndHeight} series={series} />
    </View>
  );
}
