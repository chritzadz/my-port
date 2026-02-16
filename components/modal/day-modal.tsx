import { useThemeColor } from "@/hooks/use-theme-color";
import DateTimePicker from "@react-native-community/datetimepicker";
import React from "react";
import {
  Modal,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface DayModalProps {
  visible: boolean;
  selectedDateModal: string | null;
  setShowDayModal: (show: boolean) => void;
  setShowDatePicker: (show: boolean) => void;
  showDatePicker: boolean;
  parseDate: (dateString: string | null) => Date;
  formatDate: (year: number, month: number, day: number) => string;
  setSelectedDateModal: (date: string) => void;
  selectedDate: string | null;
  getExpensesForDate: (date: string) => any[];
  setSelectedDate: (date: string | null) => void;
  onAddExpense: () => void;
}

const DayModal: React.FC<DayModalProps> = ({
  visible,
  selectedDateModal,
  setShowDayModal,
  setShowDatePicker,
  showDatePicker,
  parseDate,
  formatDate,
  setSelectedDateModal,
  selectedDate,
  getExpensesForDate,
  setSelectedDate,
  onAddExpense,
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
  // Use a more vivid red for expenses
  const expenseColor = useThemeColor(
    { light: "#dc2626", dark: "#f43f5e" },
    "tint",
  );
  const secondaryBg = useThemeColor(
    { light: "#f3f4f6", dark: "#374151" },
    "background",
  );
  const secondaryText = useThemeColor(
    { light: "#374151", dark: "#d1d5db" },
    "text",
  );

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View
        style={{
          flex: 1,
          justifyContent: "flex-end",
          backgroundColor: "rgba(0,0,0,0.5)",
        }}
      >
        <View
          style={{
            backgroundColor: modalBg,
            borderTopLeftRadius: 24,
            borderTopRightRadius: 24,
            padding: 24,
            maxHeight: 800,
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
            <View style={{ gap: 8 }}>
              <Text
                style={{ fontSize: 18, fontWeight: "bold", color: textColor }}
              >
                Expenses for {selectedDateModal}
              </Text>
              <TouchableOpacity
                onPress={() => setShowDatePicker(true)}
                style={{
                  backgroundColor: secondaryBg,
                  paddingHorizontal: 16,
                  paddingVertical: 8,
                  borderRadius: 8,
                }}
              >
                <Text style={{ color: secondaryText }}>
                  {selectedDateModal || "Select Date"}
                </Text>
              </TouchableOpacity>
              {showDatePicker && (
                <DateTimePicker
                  value={parseDate(selectedDateModal)}
                  mode="date"
                  display="default"
                  onChange={(event, date) => {
                    setShowDatePicker(Platform.OS === "ios");
                    if (date) {
                      const dateStr = formatDate(
                        date.getFullYear(),
                        date.getMonth(),
                        date.getDate(),
                      );
                      setSelectedDateModal(dateStr);
                    }
                  }}
                />
              )}
            </View>
            <TouchableOpacity
              onPress={() => {
                setShowDayModal(false);
                setSelectedDateModal(selectedDate);
              }}
            >
              <Text style={{ color: closeText, fontWeight: "600" }}>Close</Text>
            </TouchableOpacity>
          </View>
          {selectedDate && getExpensesForDate(selectedDate).length > 0 ? (
            <ScrollView>
              {getExpensesForDate(selectedDate).map((exp) => (
                <View
                  key={exp.id}
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    paddingVertical: 8,
                    borderBottomWidth: 1,
                    borderBottomColor: borderColor,
                  }}
                >
                  <Text style={{ color: textColor }}>{exp.item}</Text>
                  <Text style={{ color: expenseColor, fontWeight: "bold" }}>
                    {exp.expense} {exp.currency}
                  </Text>
                </View>
              ))}
            </ScrollView>
          ) : (
            <Text
              style={{
                color: secondaryText,
                textAlign: "center",
                marginTop: 32,
              }}
            >
              No expenses for this day
            </Text>
          )}
          <TouchableOpacity
            onPress={() => {
              setShowDayModal(false);
              onAddExpense();
            }}
            style={{
              marginTop: 16,
              backgroundColor: buttonBg,
              borderRadius: 8,
              paddingVertical: 12,
              alignItems: "center",
            }}
          >
            <Text style={{ color: buttonText, fontWeight: "bold" }}>
              Add Expense
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default DayModal;
