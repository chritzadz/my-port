import { Instrument } from "@/graphql/__generated__/graphql";
import React from "react";
import { Text, View } from "react-native";

export default function PortfolioPieChart({ data }: { data: Instrument[] }) {
  console.log("PieChart data:", JSON.stringify(data, null, 2));

  const pieData = data.map((item, index) => ({
    key: String(item.symbol || `item-${index}`),
    value: Number(item.value) || 0,
    svg: {
      fill: String(
        [
          "#4F8EF7",
          "#F78E4F",
          "#4FF78E",
          "#F74F8E",
          "#8E4FF7",
          "#FF6B6B",
          "#4ECDC4",
        ][index % 7],
      ),
    },
  }));

  if (!data || !Array.isArray(data) || data.length === 0) {
    console.log("PieChart: Invalid data received");
    return (
      <View style={{ height: 200 }}>
        <Text>No chart data</Text>
      </View>
    );
  }

  return (
    <View style={{ height: 200 }}>
      {/* //<PieChart style={{ height: 200 }} data={pieData} /> */}
    </View>
  );
}
