import AddTransactionModal from "@/components/ui/add-transaction-modal";
import TransactionBox from "@/components/ui/transaction-box";
import UpdateInitialCapitalModal from "@/components/ui/update-initial-capital-modal";
import GeneralView from "@/components/view/general-view";
import { Transaction } from "@/graphql/__generated__/graphql";
import { useGetTransactions } from "@/hooks/use-transaction";
import { DollarSign, Plus } from "lucide-react-native";
import { useEffect, useState } from "react";
import { Alert, ScrollView, Text, TouchableOpacity, View } from "react-native";

export default function TransactionListScreen() {
  const { executeGetTransactions, loading, error } = useGetTransactions();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [capitalModalVisible, setCapitalModalVisible] = useState(false);

  useEffect(() => {
    const loadTransactions = async () => {
      try {
        const result = await executeGetTransactions();
        if (result) {
          setTransactions(result);
        }
      } catch (err) {
        Alert.alert("Error", "Failed to load transactions: " + err);
      }
    };
    loadTransactions();
  }, [executeGetTransactions]);

  const handleAddSuccess = () => {
    const loadTransactions = async () => {
      try {
        const result = await executeGetTransactions();
        if (result) {
          setTransactions(result);
        }
      } catch (err) {
        Alert.alert("Error", "Failed to load transactions: " + err);
      }
    };
    loadTransactions();
  };

  const handleCapitalUpdateSuccess = () => {
    // You might want to refresh some data here if needed
  };

  return (
    <GeneralView title={"Transaction List"}>
      <View className="flex-1">
        {/* Action Buttons */}
        <View className="px-4 py-2 space-y-2">
          <TouchableOpacity
            className="bg-blue-500 rounded-lg py-3 px-4 flex-row items-center justify-center"
            onPress={() => setAddModalVisible(true)}
          >
            <Plus color="white" size={20} />
            <Text className="text-white font-semibold ml-2">
              Add Transaction
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="bg-green-500 rounded-lg py-3 px-4 flex-row items-center justify-center"
            onPress={() => setCapitalModalVisible(true)}
          >
            <DollarSign color="white" size={20} />
            <Text className="text-white font-semibold ml-2">
              Update Initial Capital
            </Text>
          </TouchableOpacity>
        </View>

        <ScrollView className="mt-2 flex-1">
          {loading && (
            <Text className="text-center">Loading transactions...</Text>
          )}
          {error && (
            <Text className="text-center text-red-500">
              Error loading transactions
            </Text>
          )}

          {transactions.length === 0 && !loading && (
            <Text className="text-center text-gray-500 mt-4">
              No transactions found
            </Text>
          )}

          {transactions.map((transaction) => (
            <View className="p-2" key={transaction.id}>
              <TransactionBox key={transaction.id} transaction={transaction} />
            </View>
          ))}
        </ScrollView>
      </View>

      <AddTransactionModal
        visible={addModalVisible}
        onClose={() => setAddModalVisible(false)}
        onSuccess={handleAddSuccess}
      />

      <UpdateInitialCapitalModal
        visible={capitalModalVisible}
        onClose={() => setCapitalModalVisible(false)}
        onSuccess={handleCapitalUpdateSuccess}
      />
    </GeneralView>
  );
}
