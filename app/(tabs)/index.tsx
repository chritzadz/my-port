import PortfolioPieChart from "@/components/portfolio-pie-chart-new";
import IndexSkeleton from "@/components/skeleton/index-skeleton";
import InstrumentBox from "@/components/ui/instrument-box";
import GeneralView from "@/components/view/general-view";
import { useGetInstruments } from "@/hooks/use-instruments";
import { useGetTotalAsset } from "@/hooks/use-total-asset";
import { ActivityIndicator, FlatList, Text, View } from "react-native";

export default function HomeScreen() {
  const { loading, error, instruments: dataInstruments } = useGetInstruments("HKD");
  const { loading: totalAssetLoading, error: totalAssetError, data: totalAssetData } = useGetTotalAsset("HKD");

  if (error || totalAssetError) {
    return (
      <GeneralView title={"MyPort"}>
        <View className="flex-1 items-center justify-center">
          <Text className="text-red-600">Error loading data</Text>
        </View>
      </GeneralView>
    );
  }

  if (!loading && (!dataInstruments || dataInstruments.length === 0)) {
    return (
      <GeneralView title={"MyPort"}>
        <View className="flex-1 items-center justify-center">
          <Text className="text-gray-600">No instruments found</Text>
        </View>
      </GeneralView>
    );
  }

  return (
    <GeneralView className={"bg-off-white"} title={"MyPort"} scrollable={true}>
      <IndexSkeleton isLoading={loading}>
        {/* Pie Chart */}
        <View className="p-5">
          <PortfolioPieChart data={dataInstruments || []} />
        </View>

        {/* Total Asset Summary */}
        <View className="px-5 pb-3">
          {totalAssetLoading ? (
            <ActivityIndicator size="small" />
          ) : totalAssetData?.totalAsset ? (
            <View className="rounded-lg bg-pale-brown p-4">
              <Text className="mb-2 text-lg font-bold text-off-white">Portfolio Summary</Text>
              <View className="flex-row justify-between">
                <Text className="text-base text-off-white">Total Value:</Text>
                <Text className="text-base font-semibold text-off-white">
                  {totalAssetData.totalAsset.currency} ${Number(totalAssetData.totalAsset.totalValue).toFixed(2)}
                </Text>
              </View>
              <View className="mt-1 flex-row justify-between">
                <Text className="text-base text-off-white">Number of Equity:</Text>
                <Text className="text-base font-semibold text-off-white">{totalAssetData.totalAsset.transactionCount}</Text>
              </View>
              <View className="mt-1 flex-row justify-between">
                <Text className="text-base text-off-white">Total P&L:</Text>
                <Text className={`text-base font-semibold ${totalAssetData.totalAsset.totalPnl >= 0 ? "text-green-500" : "text-red-600"}`}>
                  {totalAssetData.totalAsset.totalPnl >= 0 ? "+" : ""}
                  {totalAssetData.totalAsset.currency} ${Number(totalAssetData.totalAsset.totalPnl).toFixed(2)}
                </Text>
              </View>
              <View className="mt-1 flex-row justify-between">
                <Text className="text-base text-off-white">Realized P&L:</Text>
                <Text className={`text-base font-semibold ${totalAssetData.totalAsset.totalRealizedPnl >= 0 ? "text-green-500" : "text-red-600"}`}>
                  {totalAssetData.totalAsset.totalRealizedPnl >= 0 ? "+" : ""}
                  {totalAssetData.totalAsset.currency} ${Number(totalAssetData.totalAsset.totalRealizedPnl).toFixed(2)}
                </Text>
              </View>
              <View className="mt-1 flex-row justify-between">
                <Text className="text-base text-off-white">Unrealized P&L:</Text>
                <Text className={`text-base font-semibold ${totalAssetData.totalAsset.totalUnrealizedPnl >= 0 ? "text-green-500" : "text-red-600"}`}>
                  {totalAssetData.totalAsset.totalUnrealizedPnl >= 0 ? "+" : ""}
                  {totalAssetData.totalAsset.currency} ${Number(totalAssetData.totalAsset.totalUnrealizedPnl).toFixed(2)}
                </Text>
              </View>
            </View>
          ) : (
            <Text className="text-center text-gray-500">No asset data</Text>
          )}
        </View>

        {/* List of instruments */}
        <View className="mt-2">
          <FlatList data={dataInstruments || []} keyExtractor={(item) => item.symbol} scrollEnabled={false} renderItem={({ item }) => <InstrumentBox instrument={item} />} />
        </View>
      </IndexSkeleton>
    </GeneralView>
  );
}
