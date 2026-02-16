import { useThemeColor } from "@/hooks/use-theme-color";
import React from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

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

const AddExpenseModal: React.FC<AddExpenseModalProps> = ({
  visible,
  loading,
  selectedDate,
  item,
  setItem,
  expenseAmount,
  setExpenseAmount,
  currency,
  setCurrency,
  onAddExpense,
  onClose,
}) => {
  const bgColor = useThemeColor({}, "background");
  const textColor = useThemeColor({}, "text");
  const modalBg = useThemeColor(
    { light: "#fff", dark: "#1f2937" },
    "background",
  );
  const borderColor = useThemeColor(
    { light: "#e5e7eb", dark: "#374151" },
    "background",
  );
  const buttonBg = useThemeColor({ light: "#0a7ea4", dark: "#fff" }, "tint");
  const buttonText = useThemeColor({ light: "#fff", dark: "#0a7ea4" }, "tint");
  const closeText = useThemeColor({ light: "#0a7ea4", dark: "#fff" }, "tint");
  const labelText = useThemeColor(
    { light: "#6b7280", dark: "#d1d5db" },
    "text",
  );
  const inputBg = useThemeColor(
    { light: "#fff", dark: "#374151" },
    "background",
  );
  const inputText = useThemeColor({}, "text");
  const inputBorder = useThemeColor(
    { light: "#d1d5db", dark: "#4b5563" },
    "background",
  );
  const placeholderText = useThemeColor(
    { light: "#999", dark: "#6b7280" },
    "text",
  );
  const disabledBg = useThemeColor(
    { light: "#d1d5db", dark: "#374151" },
    "background",
  );

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={() => {
        Keyboard.dismiss();
        onClose();
      }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{
            flex: 1,
            justifyContent: "flex-end",
            backgroundColor: "rgba(0,0,0,0.5)",
          }}
        >
          <TouchableWithoutFeedback>
            <View
              style={{
                backgroundColor: modalBg,
                borderTopLeftRadius: 24,
                borderTopRightRadius: 24,
                padding: 24,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 16,
                }}
              >
                <Text
                  style={{ fontSize: 18, fontWeight: "bold", color: textColor }}
                >
                  Add Expense
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    Keyboard.dismiss();
                    onClose();
                  }}
                >
                  <Text style={{ color: closeText, fontWeight: "600" }}>
                    Close
                  </Text>
                </TouchableOpacity>
              </View>
              <Text style={{ marginBottom: 8, color: labelText }}>
                Date: {selectedDate}
              </Text>
              <TextInput
                placeholder="Item (e.g., MTR, Food)"
                value={item}
                onChangeText={setItem}
                style={{
                  borderWidth: 1,
                  borderColor: inputBorder,
                  borderRadius: 8,
                  paddingHorizontal: 12,
                  paddingVertical: 8,
                  marginBottom: 12,
                  color: inputText,
                  backgroundColor: inputBg,
                }}
                placeholderTextColor={placeholderText}
              />
              <TextInput
                placeholder="Expense Amount"
                value={expenseAmount}
                onChangeText={setExpenseAmount}
                keyboardType="numeric"
                style={{
                  borderWidth: 1,
                  borderColor: inputBorder,
                  borderRadius: 8,
                  paddingHorizontal: 12,
                  paddingVertical: 8,
                  marginBottom: 12,
                  color: inputText,
                  backgroundColor: inputBg,
                }}
                placeholderTextColor={placeholderText}
              />
              <TextInput
                placeholder="Currency (e.g., USD)"
                value={currency}
                onChangeText={setCurrency}
                style={{
                  borderWidth: 1,
                  borderColor: inputBorder,
                  borderRadius: 8,
                  paddingHorizontal: 12,
                  paddingVertical: 8,
                  marginBottom: 16,
                  color: inputText,
                  backgroundColor: inputBg,
                }}
                placeholderTextColor={placeholderText}
              />
              <TouchableOpacity
                onPress={onAddExpense}
                disabled={loading}
                style={{
                  borderRadius: 8,
                  paddingVertical: 12,
                  alignItems: "center",
                  backgroundColor: loading ? disabledBg : buttonBg,
                }}
              >
                <Text style={{ color: buttonText, fontWeight: "bold" }}>
                  {loading ? "Adding..." : "Add Expense"}
                </Text>
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default AddExpenseModal;
