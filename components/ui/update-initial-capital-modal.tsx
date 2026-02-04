import {
  UpdateInitialCapitalInput,
  useUpdateInitialCapital,
} from "@/hooks/use-transaction";
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

interface UpdateInitialCapitalModalProps {
  visible: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function UpdateInitialCapitalModal({
  visible,
  onClose,
  onSuccess,
}: UpdateInitialCapitalModalProps) {
  const { executeUpdateInitialCapital, loading } = useUpdateInitialCapital();
  const [formData, setFormData] = useState<UpdateInitialCapitalInput>({
    total: 0,
    currency: "USD",
  });

  const resetForm = () => {
    setFormData({
      total: 0,
      currency: "USD",
    });
  };

  const handleSubmit = async () => {
    try {
      if (!formData.total || formData.total <= 0) {
        Alert.alert("Error", "Please enter a valid total amount");
        return;
      }

      if (!formData.currency.trim()) {
        Alert.alert("Error", "Please enter a currency");
        return;
      }

      const result = await executeUpdateInitialCapital(formData);
      if (result.success) {
        Alert.alert("Success", result.message);
        resetForm();
        onSuccess();
        onClose();
      } else {
        Alert.alert("Error", result.message);
      }
    } catch (err) {
      Alert.alert("Error", "Failed to update initial capital");
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
            <Text className="text-lg font-semibold">
              Update Initial Capital
            </Text>
            <TouchableOpacity onPress={handleSubmit} disabled={loading}>
              <Text className="text-blue-500 text-lg font-semibold">
                {loading ? "Updating..." : "Save"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView className="flex-1 p-4">
          <View className="space-y-6">
            <View>
              <Text className="text-gray-700 font-medium mb-2 text-lg">
                Initial Capital Amount *
              </Text>
              <TextInput
                className="border border-gray-300 rounded-lg px-4 py-3 bg-white text-lg"
                value={formData.total.toString()}
                onChangeText={(text) =>
                  setFormData({ ...formData, total: parseFloat(text) || 0 })
                }
                placeholder="0.00"
                keyboardType="numeric"
                autoFocus
              />
              <Text className="text-gray-500 text-sm mt-1">
                Enter your starting investment amount
              </Text>
            </View>

            <View>
              <Text className="text-gray-700 font-medium mb-2 text-lg">
                Currency *
              </Text>
              <TextInput
                className="border border-gray-300 rounded-lg px-4 py-3 bg-white text-lg"
                value={formData.currency}
                onChangeText={(text) =>
                  setFormData({ ...formData, currency: text.toUpperCase() })
                }
                placeholder="USD"
                autoCapitalize="characters"
                maxLength={3}
              />
              <Text className="text-gray-500 text-sm mt-1">
                Enter the currency code (e.g., USD, EUR, GBP)
              </Text>
            </View>

            <View className="mt-6 p-4 bg-blue-50 rounded-lg">
              <Text className="text-lg font-medium text-blue-800 mb-2">
                Summary
              </Text>
              <Text className="text-blue-700">
                Initial Capital: {formData.currency} {formData.total.toFixed(2)}
              </Text>
            </View>

            <View className="mt-4 p-3 bg-yellow-50 rounded-lg">
              <Text className="text-sm text-yellow-800">
                ⚠️ This will update your portfolio's initial capital amount.
                Make sure this reflects your actual starting investment.
              </Text>
            </View>
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
}
