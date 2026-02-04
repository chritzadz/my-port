import PortfolioPieChart from "@/components/portfolio-pie-chart-new";
import InstrumentBox from "@/components/ui/instrument-box";
import GeneralView from "@/components/view/general-view";
import { useGetInstruments } from "@/hooks/use-instruments";
import { useGetTotalAsset } from "@/hooks/use-total-asset";
import { useEffect } from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";

export default function HomeScreen() {
  const { loading, error, executeGetInstruments, data } = useGetInstruments();
  const {
    loading: totalAssetLoading,
    data: totalAssetData,
    executeGetTotalAsset,
  } = useGetTotalAsset("HKD");

  useEffect(() => {
    executeGetInstruments();
    executeGetTotalAsset();
  }, [executeGetInstruments, executeGetTotalAsset]);

  if (loading) {
    return (
      <GeneralView title={"MyPort"}>
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" />
          <Text className="mt-2 text-gray-600">Loading portfolio...</Text>
        </View>
      </GeneralView>
    );
  }

  if (error) {
    return (
      <GeneralView title={"MyPort"}>
        <View className="flex-1 justify-center items-center">
          <Text className="text-red-600">Error loading data</Text>
        </View>
      </GeneralView>
    );
  }

  if (!data || !data.instruments || data.instruments.length === 0) {
    return (
      <GeneralView title={"MyPort"}>
        <View className="flex-1 justify-center items-center">
          <Text className="text-gray-600">No instruments found</Text>
        </View>
      </GeneralView>
    );
  }

  return (
    <GeneralView title={"MyPort"} scrollable={true}>
      {/* Pie Chart */}
      <View className="p-5">
        <PortfolioPieChart data={data.instruments} />
      </View>

      {/* Total Asset Summary */}
      <View className="px-5 pb-3">
        {totalAssetLoading ? (
          <ActivityIndicator size="small" />
        ) : totalAssetData?.totalAsset ? (
          <View className="bg-gray-50 p-4 rounded-lg">
            <Text className="text-lg font-bold text-gray-900 mb-2">
              Portfolio Summary
            </Text>
            <View className="flex-row justify-between">
              <Text className="text-base text-gray-600">Total Value:</Text>
              <Text className="text-base font-semibold text-gray-900">
                {totalAssetData.totalAsset.currency} $
                {Number(totalAssetData.totalAsset.totalValue).toFixed(2)}
              </Text>
            </View>
            <View className="flex-row justify-between mt-1">
              <Text className="text-base text-gray-600">Number of Equity:</Text>
              <Text className="text-base font-semibold text-gray-900">
                {totalAssetData.totalAsset.transactionCount}
              </Text>
            </View>
            <View className="flex-row justify-between mt-1">
              <Text className="text-base text-gray-600">Total P&L:</Text>
              <Text
                className={`text-base font-semibold ${
                  totalAssetData.totalAsset.totalPnl >= 0
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {totalAssetData.totalAsset.totalPnl >= 0 ? "+" : ""}
                {totalAssetData.totalAsset.currency} $
                {Number(totalAssetData.totalAsset.totalPnl).toFixed(2)}
              </Text>
            </View>
            <View className="flex-row justify-between mt-1">
              <Text className="text-base text-gray-600">Realized P&L:</Text>
              <Text
                className={`text-base font-semibold ${
                  totalAssetData.totalAsset.totalRealizedPnl >= 0
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {totalAssetData.totalAsset.totalRealizedPnl >= 0 ? "+" : ""}
                {totalAssetData.totalAsset.currency} $
                {Number(totalAssetData.totalAsset.totalRealizedPnl).toFixed(2)}
              </Text>
            </View>
            <View className="flex-row justify-between mt-1">
              <Text className="text-base text-gray-600">Unrealized P&L:</Text>
              <Text
                className={`text-base font-semibold ${
                  totalAssetData.totalAsset.totalUnrealizedPnl >= 0
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {totalAssetData.totalAsset.totalUnrealizedPnl >= 0 ? "+" : ""}
                {totalAssetData.totalAsset.currency} $
                {Number(totalAssetData.totalAsset.totalUnrealizedPnl).toFixed(
                  2,
                )}
              </Text>
            </View>
          </View>
        ) : (
          <Text className="text-gray-500 text-center">No asset data</Text>
        )}
      </View>

      {/* List of instruments */}
      <View className="mt-2">
        <FlatList
          data={data.instruments}
          keyExtractor={(item) => item.symbol}
          scrollEnabled={false}
          renderItem={({ item, index }) => (
            <InstrumentBox instrument={item} index={index} />
          )}
        />
      </View>
    </GeneralView>
  );
}
