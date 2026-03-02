import TransactionListSkeleton from "@/components/skeleton/transaction-list-skeleton";
import AddTransactionModal from "@/components/ui/add-transaction-modal";
import TransactionBox from "@/components/ui/transaction-box";
import UpdateInitialCapitalModal from "@/components/ui/update-initial-capital-modal";
import GeneralView from "@/components/view/general-view";
import { useGetTransactions } from "@/hooks/use-transaction";
import { DollarSign, Plus } from "lucide-react-native";
import { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

export default function TransactionListScreen() {
  const { transactions, loading, error, refetch } = useGetTransactions();
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [capitalModalVisible, setCapitalModalVisible] = useState(false);

  const handleAddSuccess = () => {
    refetch();
  };

  const handleCapitalUpdateSuccess = () => {
    refetch();
  };

  return (
    <>
      <GeneralView className={"bg-off-white"} title={"Transaction List"}>
        <TransactionListSkeleton isLoading={loading}>
          <View className="flex-1">
            <ScrollView className="mt-2 flex-1">
              {loading && <Text className="text-center">Loading transactions...</Text>}
              {error && <Text className="text-center text-red-500">Error loading transactions</Text>}

              {transactions.length === 0 && !loading && <Text className="mt-4 text-center text-gray-500">No transactions found</Text>}

              {transactions.map((transaction) => (
                <View className="p-2" key={transaction.id}>
                  <TransactionBox key={transaction.id} transaction={transaction} />
                </View>
              ))}
            </ScrollView>
          </View>

          <AddTransactionModal visible={addModalVisible} onClose={() => setAddModalVisible(false)} onSuccess={handleAddSuccess} />

          <UpdateInitialCapitalModal visible={capitalModalVisible} onClose={() => setCapitalModalVisible(false)} onSuccess={handleCapitalUpdateSuccess} />
        </TransactionListSkeleton>
      </GeneralView>
      {/* Floating Action Buttons */}
      <View className="absolute bottom-24 right-6 items-center gap-3">
        <TouchableOpacity className="h-14 w-14 items-center justify-center rounded-full bg-pale-green shadow-lg" onPress={() => setCapitalModalVisible(true)}>
          <DollarSign color="white" size={24} />
        </TouchableOpacity>
        <TouchableOpacity className="h-14 w-14 items-center justify-center rounded-full bg-pale-green shadow-lg" onPress={() => setAddModalVisible(true)}>
          <Plus color="white" size={24} />
        </TouchableOpacity>
      </View>
    </>
  );
}
