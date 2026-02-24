import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface CalendarGridProps {
  calendarDays: (number | null)[];
  selectedYear: number;
  selectedMonth: number;
  getExpenseForDate: (date: string) => { total: number; count: number } | null;
  formatDate: (year: number, month: number, day: number) => string;
  handleDayPress: (day: number) => void;
}

const CalendarGrid: React.FC<CalendarGridProps> = ({
  calendarDays,
  selectedYear,
  selectedMonth,
  getExpenseForDate,
  formatDate,
  handleDayPress,
}) => {
  return (
    <View className="flex-row flex-wrap">
      {calendarDays.map((day, index) => {
        if (day === null) {
          return (
            <View
              key={`empty-${index}`}
              className="bg-off-white"
              style={{ width: "14.28%", height: 64 }}
            />
          );
        }
        const date = formatDate(selectedYear, selectedMonth, day);
        const expenseInfo = getExpenseForDate(date);
        return (
          <TouchableOpacity
            key={day}
            onPress={() => handleDayPress(day)}
            className="border border-gray-300 items-center justify-center bg-off-white"
            style={{ width: "14.28%", height: 64 }}
          >
            <Text className="text-pale-brown font-medium">{day}</Text>
            {expenseInfo && (
              <Text className="text-xs text-red-600 font-bold">
                ${expenseInfo.total}
              </Text>
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default CalendarGrid;
