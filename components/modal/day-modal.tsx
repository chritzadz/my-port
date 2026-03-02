import DateTimePicker from "@react-native-community/datetimepicker";
import React from "react";
import { Modal, Platform, ScrollView, Text, TouchableOpacity, View } from "react-native";

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
  const handleClose = () => {
    setShowDayModal(false);
    setSelectedDateModal(selectedDate || "");
  };

  return (
    <Modal visible={visible} animationType="slide" presentationStyle="pageSheet">
      <View className="flex-1 bg-gray-50">
        <View className="border-b border-gray-200 bg-white px-4 py-3">
          <View className="flex-row items-center justify-between">
            <TouchableOpacity onPress={handleClose}>
              <Text className="text-lg text-blue-500">Close</Text>
            </TouchableOpacity>
            <Text className="text-lg font-semibold">Expenses</Text>
            <TouchableOpacity
              onPress={() => {
                setShowDayModal(false);
                onAddExpense();
              }}
            >
              <Text className="text-lg font-semibold text-blue-500">Add</Text>
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView className="flex-1 p-4">
          <View className="space-y-4">
            {/* Date Picker */}
            <View>
              <Text className="mb-2 font-medium text-gray-700">Date</Text>
              <TouchableOpacity onPress={() => setShowDatePicker(true)} className="rounded-lg bg-gray-200 px-4 py-3">
                <Text className="text-gray-700">{selectedDateModal || "Select Date"}</Text>
              </TouchableOpacity>
              {showDatePicker && (
                <DateTimePicker
                  value={parseDate(selectedDateModal)}
                  mode="date"
                  display="default"
                  onChange={(event, date) => {
                    setShowDatePicker(Platform.OS === "ios");
                    if (date) {
                      const dateStr = formatDate(date.getFullYear(), date.getMonth(), date.getDate());
                      setSelectedDateModal(dateStr);
                    }
                  }}
                />
              )}
            </View>

            {/* Expenses List */}
            {selectedDate && getExpensesForDate(selectedDate).length > 0 ? (
              <View>
                {getExpensesForDate(selectedDate).map((exp) => (
                  <View key={exp.id} className="flex-row items-center justify-between border-b border-gray-200 py-3">
                    <Text className="text-base text-gray-900">{exp.item}</Text>
                    <Text className="text-base font-bold text-red-500">
                      {exp.expense} {exp.currency}
                    </Text>
                  </View>
                ))}
              </View>
            ) : (
              <Text className="mt-8 text-center text-gray-500">No expenses for this day</Text>
            )}
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
};

export default DayModal;
