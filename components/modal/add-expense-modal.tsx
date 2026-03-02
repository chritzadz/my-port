import React from "react";
import { Keyboard, Modal, ScrollView, Text, TouchableOpacity, View } from "react-native";
import FormInput from "../ui/form-input";

interface AddExpenseModalProps {
  visible: boolean;
  loading: boolean;
  selectedDate: string | null;
  item: string;
  setItem: (item: string) => void;
  expenseAmount: string;
  setExpenseAmount: (amount: string) => void;
  currency: string;
  setCurrency: (currency: string) => void;
  onAddExpense: () => void;
  onClose: () => void;
}

const AddExpenseModal: React.FC<AddExpenseModalProps> = ({ visible, loading, selectedDate, item, setItem, expenseAmount, setExpenseAmount, currency, setCurrency, onAddExpense, onClose }) => {
  const handleClose = () => {
    Keyboard.dismiss();
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
            <Text className="text-lg font-semibold">Add Expense</Text>
            <TouchableOpacity onPress={onAddExpense} disabled={loading}>
              <Text className="text-lg font-semibold text-blue-500">{loading ? "Adding..." : "Save"}</Text>
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView className="flex-1 p-4">
          <View className="space-y-4">
            <View className="mb-2 rounded-lg bg-blue-50 p-3">
              <Text className="text-sm text-gray-600">Date: {selectedDate}</Text>
            </View>

            <FormInput className="my-2" label="Item" value={item} onChangeText={setItem} placeholder="e.g., MTR, Food" required />

            <FormInput className="my-2" label="Expense Amount" value={expenseAmount} onChangeText={setExpenseAmount} placeholder="0.00" required keyboardType="numeric" />

            <FormInput className="my-2" label="Currency" value={currency} onChangeText={setCurrency} placeholder="e.g., USD, HKD" required autoCapitalize="characters" />
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
};

export default AddExpenseModal;
