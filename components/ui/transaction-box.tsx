import { Transaction } from "@/graphql/__generated__/graphql";
import { Alert, Text, TouchableOpacity, View } from "react-native";

interface TransactionBoxProps {
  transaction: Transaction;
}

export default function TransactionBox({ transaction }: TransactionBoxProps) {
  const formatDate = (dateString: string) => {
    // Handle timestamp format - convert to number if it's a timestamp
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
    <TouchableOpacity className="mb-3 rounded-lg border border-gray-200 bg-pale-brown p-4 shadow-sm" onPress={handlePress}>
      <View className="mb-2 flex-row items-center justify-between">
        <Text className="text-lg font-bold text-off-white">{transaction.instrumentSymbol}</Text>
        <Text className={`font-semibold ${getTransactionTypeColor(transaction.type)}`}>{transaction.type}</Text>
      </View>

      <View className="mb-1 flex-row items-center justify-between">
        <Text className="text-off-white">Quantity:</Text>
        <Text className="font-medium text-off-white">{transaction.quantity}</Text>
      </View>

      <View className="mb-1 flex-row items-center justify-between">
        <Text className="text-off-white">Price:</Text>
        <Text className="font-medium text-off-white">{formatCurrency(transaction.price, transaction.currency)}</Text>
      </View>

      <View className="mb-1 flex-row items-center justify-between">
        <Text className="text-off-white ">Total:</Text>
        <Text className="font-medium text-off-white">{formatCurrency(transaction.price * transaction.quantity, transaction.currency)}</Text>
      </View>

      <View className="mb-1 flex-row items-center justify-between">
        <Text className="text-off-white">Type:</Text>
        <Text className="text-sm text-off-white">{transaction.instrumentType}</Text>
      </View>

      <View className="flex-row items-center justify-between">
        <Text className="text-off-white">Date:</Text>
        <Text className="text-sm text-off-white">{formatDate(transaction.transactionDate)}</Text>
      </View>
    </TouchableOpacity>
  );
}
