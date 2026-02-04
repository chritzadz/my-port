import TransactionBox from "@/components/ui/transaction-box";
import GeneralView from "@/components/view/general-view";
import { Transaction } from "@/graphql/__generated__/graphql";
import { useGetTransactions } from "@/hooks/use-transaction";
import { useEffect, useState } from "react";
import { Alert, ScrollView, Text, View } from "react-native";

export default function TransactionListScreen() {
  const { executeGetTransactions, loading, error } = useGetTransactions();
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    const loadTransactions = async () => {
      try {
        const result = await executeGetTransactions();
        if (result) {
          setTransactions(result);
        }
      } catch (err) {
        Alert.alert("Error", "Failed to load transactions");
      }
    };

    loadTransactions();
  }, [executeGetTransactions]);

  return (
    <GeneralView title={"Transaction List"}>
      <ScrollView className="mt-2">
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
    </GeneralView>
  );
}
