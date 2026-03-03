import { Transaction } from "@/graphql/__generated__/graphql";
import { Alert, Text, TouchableOpacity, View } from "react-native";

interface TransactionBoxProps {
  transaction: Transaction;
}

export default function TransactionBox({ transaction }: TransactionBoxProps) {
  const formatDate = (dateString: string) => {
    const date = isNaN(Number(dateString)) ? new Date(dateString) : new Date(Number(dateString));
    return date.toLocaleDateString();
  };

  const formatCurrency = (amount: number, currency: string) => {
    return `${currency} ${amount.toFixed(2)}`;
  };

  const getTransactionTypeColor = (type: string) => {
    return type === "BUY" ? "text-green-600" : "text-red-600";
  };

  const handlePress = () => {
    Alert.alert(
      "Transaction Details",
      `ID: ${transaction.id}\nSymbol: ${transaction.instrumentSymbol}\nType: ${transaction.type}\nQuantity: ${transaction.quantity}\nPrice: ${formatCurrency(transaction.price, transaction.currency)}\nDate: ${formatDate(transaction.transactionDate)}`,
    );
  };

  return (
    <TouchableOpacity className="border-stone bg-charcoal mb-1 rounded-lg border p-4 shadow-sm" onPress={handlePress}>
      <View className="mb-2 flex-row items-center justify-between">
        <Text className="text-ivory text-lg font-bold">{transaction.instrumentSymbol}</Text>
        <Text className={`font-semibold ${getTransactionTypeColor(transaction.type)}`}>{transaction.type}</Text>
      </View>

      <View className="">
        <View className="mb-1 flex-row items-center justify-between">
          <View className="justify-left mb-1 flex-row items-center">
            <Text className="text-ivory font-medium">{transaction.quantity + " | "}</Text>
            <Text className="text-ivory font-medium">{formatCurrency(transaction.price, transaction.currency)}</Text>
          </View>
          <Text className="text-ivory font-medium">{formatCurrency(transaction.price * transaction.quantity, transaction.currency)}</Text>
        </View>
      </View>

      <View className="mb-1 flex-row items-center justify-between">
        <Text className="text-ivory text-md text-bold">{transaction.instrumentType}</Text>
        <Text className="text-ivory text-sm">{formatDate(transaction.transactionDate)}</Text>
      </View>
    </TouchableOpacity>
  );
}
