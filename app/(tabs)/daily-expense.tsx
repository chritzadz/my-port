import CalendarGrid from "@/components/calendar-grid";
import AddExpenseModal from "@/components/modal/add-expense-modal";
import DayModal from "@/components/modal/day-modal";
import { DailyExpense as DailyExpenseType } from "@/graphql/__generated__/graphql";
import { useAddExpense } from "@/hooks/use-add-expense";
import { useExpensesByDateRange } from "@/hooks/use-expenses-by-date-range";
import { formatDate, getDaysInMonth, getFirstDayOfMonth, parseDate, timestampToDateString } from "@/utils/date-util";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react-native";
import React, { useState } from "react";
import { Alert, Keyboard, ScrollView, Text, TouchableOpacity, View } from "react-native";

/* CONSTANTS */
const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function DailyExpense() {
  const [selectedDate, setSelectedDate] = useState<string | null>("");
  const [selectedDateModal, setSelectedDateModal] = useState<string | null>(selectedDate);
  const [showDayModal, setShowDayModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [item, setItem] = useState("");
  const [expenseAmount, setExpenseAmount] = useState("");
  const [currency, setCurrency] = useState("");
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const daysInMonth = getDaysInMonth(selectedYear, selectedMonth);
  const firstDay = getFirstDayOfMonth(selectedYear, selectedMonth);
  const queryFrom = formatDate(selectedYear, selectedMonth, 1);
  const queryTo = formatDate(selectedYear, selectedMonth, getDaysInMonth(selectedYear, selectedMonth));

  const { addExpense, loading, error } = useAddExpense();
  const { loading: expensesLoading, expenses, refetch } = useExpensesByDateRange(queryFrom, queryTo);

  const monthlyTotal = expenses.reduce((sum: number, e: DailyExpenseType) => sum + e.expense, 0).toPrecision(7);

  const getExpenseForDate = (date: string) => {
    const dayExpenses = expenses.filter((e: DailyExpenseType) => timestampToDateString(e.date) === date);
    if (dayExpenses.length === 0) return null;
    const total = dayExpenses.reduce((sum: number, e: DailyExpenseType) => sum + e.expense, 0);
    return { total, count: dayExpenses.length };
  };

  const getExpensesForDate = (date: string): DailyExpenseType[] => {
    return expenses.filter((e: DailyExpenseType) => timestampToDateString(e.date) === date);
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
      refetch();
      setShowAddModal(false);
      setItem("");
      setExpenseAmount("");
      setCurrency("");
      Alert.alert("Expense added!");
    } else {
      Alert.alert("Failed to add expense", res?.message || error?.message || "");
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
    <View className="flex-1 bg-off-white pt-16">
      <View className="mb-4 flex-row items-center justify-between px-4">
        <TouchableOpacity onPress={prevMonth} className="rounded-full bg-pale-green p-1">
          <ChevronLeft color="#FFFFFF" size={28} />
        </TouchableOpacity>
        <View className="items-center">
          <Text className="text-xl font-bold text-gray-900">
            {MONTHS[selectedMonth]} {selectedYear}
          </Text>
        </View>
        <TouchableOpacity onPress={nextMonth} className="rounded-full bg-pale-green p-1">
          <ChevronRight color="#FFFFFF" size={28} />
        </TouchableOpacity>
      </View>

      <View className="mb-4 flex-row justify-center">
        {[2026, 2027, 2028].map((year) => (
          <TouchableOpacity key={year} onPress={() => setSelectedYear(year)} className={`mx-1 rounded-full px-4 py-2 ${selectedYear === year ? "bg-pale-brown" : "bg-pale-green"}`}>
            <Text className={selectedYear === year ? "font-bold text-off-white" : "text-off-white"}>{year}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View className="mx-4 mb-4 rounded-xl bg-pink-white p-4 dark:bg-pale-brown">
        <Text className="text-center text-sm text-pale-brown dark:text-off-white">Monthly Total</Text>
        <Text className="text-center text-2xl font-bold text-pale-brown dark:text-off-white">{expensesLoading ? "Loading..." : `$${monthlyTotal}`}</Text>
      </View>

      <View className="flex-row px-2">
        {WEEKDAYS.map((day) => (
          <View key={day} className="flex-1 items-center py-2">
            <Text className="text-xs font-semibold text-pale-brown">{day}</Text>
          </View>
        ))}
      </View>

      <ScrollView className="flex-1 px-2">
        <CalendarGrid
          calendarDays={calendarDays}
          selectedYear={selectedYear}
          selectedMonth={selectedMonth}
          getExpenseForDate={getExpenseForDate}
          formatDate={formatDate}
          handleDayPress={handleDayPress}
        />
      </ScrollView>

      <TouchableOpacity
        onPress={() => {
          setSelectedDate(formatDate(selectedYear, selectedMonth, new Date().getDate()));
          setShowAddModal(true);
        }}
        className="absolute bottom-24 right-6 h-14 w-14 items-center justify-center rounded-full bg-pale-green shadow-lg"
      >
        <Plus color="#FFFFFF" size={28} />
      </TouchableOpacity>

      <DayModal
        visible={showDayModal}
        selectedDateModal={selectedDateModal}
        setShowDayModal={setShowDayModal}
        setShowDatePicker={setShowDatePicker}
        showDatePicker={showDatePicker}
        parseDate={parseDate}
        formatDate={formatDate}
        setSelectedDateModal={setSelectedDateModal}
        selectedDate={selectedDate}
        getExpensesForDate={getExpensesForDate}
        setSelectedDate={setSelectedDate}
        onAddExpense={() => setShowAddModal(true)}
      />

      <AddExpenseModal
        visible={showAddModal}
        loading={loading}
        selectedDate={selectedDate}
        item={item}
        setItem={setItem}
        expenseAmount={expenseAmount}
        setExpenseAmount={setExpenseAmount}
        currency={currency}
        setCurrency={setCurrency}
        onAddExpense={handleAddExpense}
        onClose={() => {
          Keyboard.dismiss();
          setShowAddModal(false);
        }}
      />
    </View>
  );
}
