import { Transaction } from "@/graphql/__generated__/graphql";
import { Alert, Text, TouchableOpacity, View } from "react-native";

interface TransactionBoxProps {
  transaction: Transaction;
}

export default function TransactionBox({ transaction }: TransactionBoxProps) {
  const formatDate = (dateString: string) => {
    // Handle timestamp format - convert to number if it's a timestamp
    const date = isNaN(Number(dateString))
      ? new Date(dateString)
      : new Date(Number(dateString));
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
    <TouchableOpacity
      className="bg-white rounded-lg p-4 mb-3 shadow-sm border border-gray-200"
      onPress={handlePress}
    >
      <View className="flex-row justify-between items-center mb-2">
        <Text className="font-bold text-lg">
          {transaction.instrumentSymbol}
        </Text>
        <Text
          className={`font-semibold ${getTransactionTypeColor(transaction.type)}`}
        >
          {transaction.type}
        </Text>
      </View>

      <View className="flex-row justify-between items-center mb-1">
        <Text className="text-gray-600">Quantity:</Text>
        <Text className="font-medium">{transaction.quantity}</Text>
      </View>

      <View className="flex-row justify-between items-center mb-1">
        <Text className="text-gray-600">Price:</Text>
        <Text className="font-medium">
          {formatCurrency(transaction.price, transaction.currency)}
        </Text>
      </View>

      <View className="flex-row justify-between items-center mb-1">
        <Text className="text-gray-600">Total:</Text>
        <Text className="font-medium">
          {formatCurrency(
            transaction.price * transaction.quantity,
            transaction.currency,
          )}
        </Text>
      </View>

      <View className="flex-row justify-between items-center mb-1">
        <Text className="text-gray-600">Type:</Text>
        <Text className="text-sm">{transaction.instrumentType}</Text>
      </View>

      <View className="flex-row justify-between items-center">
        <Text className="text-gray-600">Date:</Text>
        <Text className="text-sm">
          {formatDate(transaction.transactionDate)}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
