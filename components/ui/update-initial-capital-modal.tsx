import { useGetCurrencies } from "@/hooks/use-currencies";
import { UpdateInitialCapitalInput, useUpdateInitialCapital } from "@/hooks/use-transaction";
import { useEffect, useState } from "react";
import { Alert, Modal, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { ComboboxOption } from "./combobox";
import CurrencyCombobox from "./currency-combobox";
import FormInput from "./form-input";

interface UpdateInitialCapitalModalProps {
  visible: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function UpdateInitialCapitalModal({ visible, onClose, onSuccess }: UpdateInitialCapitalModalProps) {
  const { executeUpdateInitialCapital, loading } = useUpdateInitialCapital();
  const { data: currencies, loading: currenciesLoading } = useGetCurrencies();
  const [currencyOptions, setCurrencyOptions] = useState<ComboboxOption[]>([]);
  const [formData, setFormData] = useState<UpdateInitialCapitalInput>({
    total: 0,
    currency: "USD",
  });

  useEffect(() => {
    if (currencies) {
      const options = currencies.map((currency) => ({
        value: currency.code,
        label: currency.code,
      }));
      setCurrencyOptions(options);
    }
  }, [currencies]);

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
      Alert.alert("Error", "Failed to update initial capital: " + err);
    }
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" presentationStyle="pageSheet">
      <View className="flex-1 bg-gray-50">
        <View className="border-b border-gray-200 bg-white px-4 py-3">
          <View className="flex-row items-center justify-between">
            <TouchableOpacity onPress={handleClose}>
              <Text className="text-lg text-blue-500">Cancel</Text>
            </TouchableOpacity>
            <Text className="text-lg font-semibold">Update Initial Capital</Text>
            <TouchableOpacity onPress={handleSubmit} disabled={loading}>
              <Text className="text-lg font-semibold text-blue-500">{loading ? "Updating..." : "Save"}</Text>
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView className="flex-1 p-4">
          <View className="space-y-6">
            <View>
              <FormInput
                label="Initial Capital Amount"
                value={formData.total.toString()}
                onChangeText={(text: string) => setFormData({ ...formData, total: parseFloat(text) || 0 })}
                placeholder="0.00"
                required
                keyboardType="numeric"
              />
              <Text className="mt-1 text-sm text-gray-500">Enter your starting investment amount</Text>
            </View>

            <View>
              <Text className="text-md mb-2 font-medium text-gray-700">Currency*</Text>
              <CurrencyCombobox
                options={currencyOptions}
                value={formData.currency}
                onValueChange={(value: string) => setFormData({ ...formData, currency: value })}
                placeholder="USD"
                loading={currenciesLoading}
                allowCustomValue={true}
              />
              <Text className="mt-1 text-sm text-gray-500">Enter the currency code (e.g., USD, EUR, GBP)</Text>
            </View>

            <View className="mt-6 rounded-lg bg-blue-50 p-4">
              <Text className="mb-2 text-lg font-medium text-blue-800">Summary</Text>
              <Text className="text-blue-700">
                Initial Capital: {formData.currency} {formData.total.toFixed(2)}
              </Text>
            </View>

            <View className="mt-4 rounded-lg bg-yellow-50 p-3">
              <Text className="text-sm text-yellow-800">{`⚠️This will update your portfolio's initial capital amount. Make sure this reflects your actual investment made.`}</Text>
            </View>
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
}
