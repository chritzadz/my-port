import { DailyExpense as DailyExpenseType } from "@/graphql/__generated__/graphql";
import { useAddExpense } from "@/hooks/use-add-expense";
import { useExpensesByDateRange } from "@/hooks/use-expenses-by-date-range";
import DateTimePicker from "@react-native-community/datetimepicker";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay();
}

function formatDate(year: number, month: number, day: number) {
  return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

// Convert timestamp string to YYYY-MM-DD format
function timestampToDateString(timestamp: string): string {
  const date = new Date(parseInt(timestamp, 10));
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

// Parse "YYYY-MM-DD" string to Date (local timezone)
function parseDate(dateString: string | null): Date {
  if (!dateString) return new Date();
  const [year, month, day] = dateString.split("-").map(Number);
  return new Date(year, month - 1, day);
}

export default function DailyExpense() {
  const { addExpense, loading, error } = useAddExpense();
  const {
    getExpensesByDateRange,
    loading: expensesLoading,
    expenses,
  } = useExpensesByDateRange();
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());

  useEffect(() => {
    const from = formatDate(selectedYear, selectedMonth, 1);
    const lastDay = getDaysInMonth(selectedYear, selectedMonth);
    const to = formatDate(selectedYear, selectedMonth, lastDay);
    console.log("CALLING getExpensesByDateRange:", from, to);
    getExpensesByDateRange(from, to);
  }, [selectedYear, selectedMonth, getExpensesByDateRange]);

  const monthlyTotal = expenses
    .reduce((sum: number, e: DailyExpenseType) => sum + e.expense, 0)
    .toPrecision(7);

  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedDateModal, setSelectedDateModal] = useState<string | null>(
    selectedDate,
  );
  const [showDayModal, setShowDayModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const [item, setItem] = useState("");
  const [expenseAmount, setExpenseAmount] = useState("");
  const [currency, setCurrency] = useState("");

  const daysInMonth = getDaysInMonth(selectedYear, selectedMonth);
  const firstDay = getFirstDayOfMonth(selectedYear, selectedMonth);

  const getExpenseForDate = (date: string) => {
    const dayExpenses = expenses.filter(
      (e: DailyExpenseType) => timestampToDateString(e.date) === date,
    );
    if (dayExpenses.length === 0) return null;
    const total = dayExpenses.reduce(
      (sum: number, e: DailyExpenseType) => sum + e.expense,
      0,
    );
    return { total, count: dayExpenses.length };
  };

  const getExpensesForDate = (date: string): DailyExpenseType[] => {
    return expenses.filter(
      (e: DailyExpenseType) => timestampToDateString(e.date) === date,
    );
  };

  const handleDayPress = (day: number) => {
    const date = formatDate(selectedYear, selectedMonth, day);
    setSelectedDate(date);
    setSelectedDateModal(date);
    setShowDayModal(true);
  };

  const handleAddExpense = async () => {
    if (!item || !expenseAmount || !currency || !selectedDate) {
      Alert.alert("All fields are required");
      return;
    }
    const input = {
      item,
      expense: parseFloat(parseFloat(expenseAmount).toFixed(2)),
      currency,
      date: selectedDate,
    };

    const res = await addExpense(input as any);
    if (res?.success) {
      // Refetch expenses
      const from = formatDate(selectedYear, selectedMonth, 1);
      const lastDay = getDaysInMonth(selectedYear, selectedMonth);
      const to = formatDate(selectedYear, selectedMonth, lastDay);
      getExpensesByDateRange(from, to);
      setShowAddModal(false);
      setItem("");
      setExpenseAmount("");
      setCurrency("");
      Alert.alert("Expense added!");
    } else {
      Alert.alert(
        "Failed to add expense",
        res?.message || error?.message || "",
      );
    }
  };

  const prevMonth = () => {
    if (selectedMonth === 0) {
      setSelectedMonth(11);
      setSelectedYear(selectedYear - 1);
    } else {
      setSelectedMonth(selectedMonth - 1);
    }
  };

  const nextMonth = () => {
    if (selectedMonth === 11) {
      setSelectedMonth(0);
      setSelectedYear(selectedYear + 1);
    } else {
      setSelectedMonth(selectedMonth + 1);
    }
  };

  const calendarDays: (number | null)[] = [];
  for (let i = 0; i < firstDay; i++) {
    calendarDays.push(null);
  }
  for (let d = 1; d <= daysInMonth; d++) {
    calendarDays.push(d);
  }

  return (
    <View className="flex-1 bg-white dark:bg-black pt-12">
      {/* Header: Year & Month selector */}
      <View className="flex-row items-center justify-between px-4 mb-4">
        <TouchableOpacity onPress={prevMonth}>
          <ChevronLeft color="#333" size={28} />
        </TouchableOpacity>
        <View className="items-center">
          <Text className="text-xl font-bold text-black dark:text-white">
            {MONTHS[selectedMonth]} {selectedYear}
          </Text>
        </View>
        <TouchableOpacity onPress={nextMonth}>
          <ChevronRight color="#333" size={28} />
        </TouchableOpacity>
      </View>

      {/* Year quick selector */}
      <View className="flex-row justify-center mb-4">
        {[2026, 2027, 2028].map((year) => (
          <TouchableOpacity
            key={year}
            onPress={() => setSelectedYear(year)}
            className={`px-4 py-2 mx-1 rounded-full ${selectedYear === year ? "bg-blue-500" : "bg-gray-200"}`}
          >
            <Text
              className={
                selectedYear === year ? "text-white font-bold" : "text-black"
              }
            >
              {year}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Monthly Total */}
      <View className="bg-gray-100 dark:bg-gray-800 mx-4 mb-4 p-4 rounded-xl">
        <Text className="text-center text-gray-600 dark:text-gray-300 text-sm">
          Monthly Total
        </Text>
        <Text className="text-center text-2xl font-bold text-red-500">
          {expensesLoading ? "Loading..." : `$${monthlyTotal}`}
        </Text>
      </View>

      {/* Weekday headers */}
      <View className="flex-row px-2">
        {WEEKDAYS.map((day) => (
          <View key={day} className="flex-1 items-center py-2">
            <Text className="text-gray-500 font-semibold text-xs">{day}</Text>
          </View>
        ))}
      </View>

      {/* Calendar grid */}
      <ScrollView className="flex-1 px-2">
        <View className="flex-row flex-wrap">
          {calendarDays.map((day, index) => {
            if (day === null) {
              return (
                <View key={`empty-${index}`} className="w-[14.28%] h-16" />
              );
            }
            const date = formatDate(selectedYear, selectedMonth, day);
            const expenseInfo = getExpenseForDate(date);
            return (
              <TouchableOpacity
                key={day}
                onPress={() => handleDayPress(day)}
                className="w-[14.28%] h-16 border border-gray-100 items-center justify-center"
              >
                <Text className="text-black dark:text-white font-medium">
                  {day}
                </Text>
                {expenseInfo && (
                  <Text className="text-xs text-red-500 font-bold">
                    ${expenseInfo.total}
                  </Text>
                )}
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>

      {/* Floating Add Button */}
      <TouchableOpacity
        onPress={() => {
          setSelectedDate(
            formatDate(selectedYear, selectedMonth, new Date().getDate()),
          );
          setShowAddModal(true);
        }}
        className="absolute bottom-24 right-6 w-14 h-14 bg-blue-500 rounded-full items-center justify-center shadow-lg"
      >
        <Plus color="white" size={28} />
      </TouchableOpacity>

      {/* Day Expense Modal */}
      <Modal visible={showDayModal} transparent animationType="slide">
        <View className="flex-1 justify-end bg-black/50">
          <View className="bg-white dark:bg-gray-800 rounded-t-3xl p-6 max-h-[800px]">
            <View className="flex-row justify-between items-center mb-4">
              <View className="gap-2">
                <Text className="text-lg font-bold text-black dark:text-white">
                  Expenses for {selectedDateModal}
                </Text>
                <TouchableOpacity
                  onPress={() => setShowDatePicker(true)}
                  className="bg-gray-200 dark:bg-gray-700 px-4 py-2 rounded-lg"
                >
                  <Text className="text-black dark:text-white">
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
                <Text className="text-blue-500 font-semibold">Close</Text>
              </TouchableOpacity>
            </View>
            {selectedDate && getExpensesForDate(selectedDate).length > 0 ? (
              <ScrollView>
                {getExpensesForDate(selectedDate).map((exp) => (
                  <View
                    key={exp.id}
                    className="flex-row justify-between py-2 border-b border-gray-200"
                  >
                    <Text className="text-black dark:text-white">
                      {exp.item}
                    </Text>
                    <Text className="text-red-500 font-bold">
                      {exp.expense} {exp.currency}
                    </Text>
                  </View>
                ))}
              </ScrollView>
            ) : (
              <Text className="text-gray-500 text-center mt-8">
                No expenses for this day
              </Text>
            )}
            <TouchableOpacity
              onPress={() => {
                setShowDayModal(false);
                setShowAddModal(true);
              }}
              className="mt-4 bg-blue-500 rounded-lg py-3 items-center"
            >
              <Text className="text-white font-bold">Add Expense</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Add Expense Modal */}
      <Modal
        visible={showAddModal}
        transparent
        animationType="slide"
        onRequestClose={() => {
          Keyboard.dismiss();
          setShowAddModal(false);
        }}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            className="flex-1 justify-end bg-black/50"
          >
            <TouchableWithoutFeedback>
              <View className="bg-white dark:bg-gray-800 rounded-t-3xl p-6">
                <View className="flex-row justify-between items-center mb-4">
                  <Text className="text-lg font-bold text-black dark:text-white">
                    Add Expense
                  </Text>
                  <TouchableOpacity
                    onPress={() => {
                      Keyboard.dismiss();
                      setShowAddModal(false);
                    }}
                  >
                    <Text className="text-blue-500 font-semibold">Close</Text>
                  </TouchableOpacity>
                </View>
                <Text className="mb-2 text-gray-600 dark:text-gray-300">
                  Date: {selectedDate}
                </Text>
                <TextInput
                  placeholder="Item (e.g., MTR, Food)"
                  value={item}
                  onChangeText={setItem}
                  className="border border-gray-300 rounded-lg px-3 py-2 mb-3 text-black dark:text-white"
                  placeholderTextColor="#999"
                />
                <TextInput
                  placeholder="Expense Amount"
                  value={expenseAmount}
                  onChangeText={setExpenseAmount}
                  keyboardType="numeric"
                  className="border border-gray-300 rounded-lg px-3 py-2 mb-3 text-black dark:text-white"
                  placeholderTextColor="#999"
                />
                <TextInput
                  placeholder="Currency (e.g., USD)"
                  value={currency}
                  onChangeText={setCurrency}
                  className="border border-gray-300 rounded-lg px-3 py-2 mb-4 text-black dark:text-white"
                  placeholderTextColor="#999"
                />
                <TouchableOpacity
                  onPress={handleAddExpense}
                  disabled={loading}
                  className={`rounded-lg py-3 items-center ${loading ? "bg-gray-400" : "bg-blue-500"}`}
                >
                  <Text className="text-white font-bold">
                    {loading ? "Adding..." : "Add Expense"}
                  </Text>
                </TouchableOpacity>
              </View>
            </TouchableWithoutFeedback>
          </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
}
