import PortfolioPieChart from "@/components/portfolio-pie-chart-new";
import InstrumentBox from "@/components/ui/instrument-box";
import GeneralView from "@/components/view/general-view";
import { useGetInstruments } from "@/hooks/use-instruments";
import { useEffect } from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";

export default function HomeScreen() {
  const { loading, error, executeGetInstruments, data } = useGetInstruments();

  useEffect(() => {
    executeGetInstruments();
  }, [executeGetInstruments]);

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
    <GeneralView title={"MyPort"}>
      {/* Pie Chart */}
      <View className="p-5">
        <PortfolioPieChart data={data.instruments} />
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
