import {
  AddTransactionInput,
  TransactionType,
} from "@/graphql/__generated__/graphql";
import { useAddTransaction } from "@/hooks/use-transaction";
import { useState } from "react";
import {
  Alert,
  Modal,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

interface AddTransactionModalProps {
  visible: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function AddTransactionModal({
  visible,
  onClose,
  onSuccess,
}: AddTransactionModalProps) {
  const { executeAddTransaction, loading } = useAddTransaction();
  const [formData, setFormData] = useState<AddTransactionInput>({
    instrumentSymbol: "",
    instrumentType: "",
    type: TransactionType.Buy,
    price: 0,
    quantity: 0,
    currency: "USD",
    transactionDate: new Date().toISOString().split("T")[0],
  });

  const resetForm = () => {
    setFormData({
      instrumentSymbol: "",
      instrumentType: "",
      type: TransactionType.Buy,
      price: 0,
      quantity: 0,
      currency: "USD",
      transactionDate: new Date().toISOString().split("T")[0],
    });
  };

  const handleSubmit = async () => {
    try {
      if (
        !formData.instrumentSymbol ||
        !formData.instrumentType ||
        !formData.price ||
        !formData.quantity
      ) {
        Alert.alert("Error", "Please fill in all required fields");
        return;
      }

      const result = await executeAddTransaction(formData);
      if (result.success) {
        Alert.alert("Success", result.message);
        resetForm();
        onSuccess();
        onClose();
      } else {
        Alert.alert("Error", result.message);
      }
    } catch (err) {
      Alert.alert("Error", "Failed to add transaction: " + err);
    }
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
    >
      <View className="flex-1 bg-gray-50">
        <View className="bg-white px-4 py-3 border-b border-gray-200">
          <View className="flex-row justify-between items-center">
            <TouchableOpacity onPress={handleClose}>
              <Text className="text-blue-500 text-lg">Cancel</Text>
            </TouchableOpacity>
            <Text className="text-lg font-semibold">Add Transaction</Text>
            <TouchableOpacity onPress={handleSubmit} disabled={loading}>
              <Text className="text-blue-500 text-lg font-semibold">
                {loading ? "Adding..." : "Save"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView className="flex-1 p-4">
          <View className="space-y-4">
            <View>
              <Text className="text-gray-700 font-medium mb-2">Symbol *</Text>
              <TextInput
                className="border border-gray-300 rounded-lg px-3 py-2 bg-white"
                value={formData.instrumentSymbol}
                onChangeText={(text) =>
                  setFormData({
                    ...formData,
                    instrumentSymbol: text.toUpperCase(),
                  })
                }
                placeholder="e.g., AAPL"
                autoCapitalize="characters"
              />
            </View>

            <View>
              <Text className="text-gray-700 font-medium mb-2">
                Instrument Type *
              </Text>
              <TextInput
                className="border border-gray-300 rounded-lg px-3 py-2 bg-white"
                value={formData.instrumentType}
                onChangeText={(text) =>
                  setFormData({ ...formData, instrumentType: text })
                }
                placeholder="e.g., Stock, Bond, ETF"
              />
            </View>

            <View>
              <Text className="text-gray-700 font-medium mb-2">
                Transaction Type
              </Text>
              <View className="flex-row space-x-2">
                <TouchableOpacity
                  className={`flex-1 py-2 px-4 rounded-lg border ${
                    formData.type === TransactionType.Buy
                      ? "bg-green-500 border-green-500"
                      : "bg-gray-200 border-gray-300"
                  }`}
                  onPress={() =>
                    setFormData({ ...formData, type: TransactionType.Buy })
                  }
                >
                  <Text
                    className={`text-center font-medium ${
                      formData.type === TransactionType.Buy
                        ? "text-white"
                        : "text-gray-700"
                    }`}
                  >
                    BUY
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  className={`flex-1 py-2 px-4 rounded-lg border ${
                    formData.type === TransactionType.Sell
                      ? "bg-red-500 border-red-500"
                      : "bg-gray-200 border-gray-300"
                  }`}
                  onPress={() =>
                    setFormData({ ...formData, type: TransactionType.Sell })
                  }
                >
                  <Text
                    className={`text-center font-medium ${
                      formData.type === TransactionType.Sell
                        ? "text-white"
                        : "text-gray-700"
                    }`}
                  >
                    SELL
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            <View>
              <Text className="text-gray-700 font-medium mb-2">Quantity *</Text>
              <TextInput
                className="border border-gray-300 rounded-lg px-3 py-2 bg-white"
                value={formData.quantity.toString()}
                onChangeText={(text) =>
                  setFormData({ ...formData, quantity: parseFloat(text) || 0 })
                }
                placeholder="0"
                keyboardType="numeric"
              />
            </View>

            <View>
              <Text className="text-gray-700 font-medium mb-2">Price *</Text>
              <TextInput
                className="border border-gray-300 rounded-lg px-3 py-2 bg-white"
                value={formData.price.toString()}
                onChangeText={(text) =>
                  setFormData({ ...formData, price: parseFloat(text) || 0 })
                }
                placeholder="0.00"
                keyboardType="numeric"
              />
            </View>

            <View>
              <Text className="text-gray-700 font-medium mb-2">Currency</Text>
              <TextInput
                className="border border-gray-300 rounded-lg px-3 py-2 bg-white"
                value={formData.currency}
                onChangeText={(text) =>
                  setFormData({ ...formData, currency: text.toUpperCase() })
                }
                placeholder="USD"
                autoCapitalize="characters"
              />
            </View>

            <View>
              <Text className="text-gray-700 font-medium mb-2">
                Transaction Date
              </Text>
              <TextInput
                className="border border-gray-300 rounded-lg px-3 py-2 bg-white"
                value={formData.transactionDate || ""}
                onChangeText={(text) =>
                  setFormData({ ...formData, transactionDate: text })
                }
                placeholder="YYYY-MM-DD"
              />
            </View>

            <View className="mt-4 p-3 bg-blue-50 rounded-lg">
              <Text className="text-sm text-gray-600">
                Total: {formData.currency}{" "}
                {(formData.price * formData.quantity).toFixed(2)}
              </Text>
            </View>
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
}
