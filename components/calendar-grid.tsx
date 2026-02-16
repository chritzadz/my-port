import { useThemeColor } from "@/hooks/use-theme-color";
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
  // Use theme colors
  const textColor = useThemeColor({}, "text");
  const borderColor = useThemeColor(
    { light: "#e5e7eb", dark: "#374151" },
    "background",
  );
  const expenseColor = useThemeColor(
    { light: "#ef4444", dark: "#f87171" },
    "tint",
  );
  const bgColor = useThemeColor({}, "background");

  return (
    <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
      {calendarDays.map((day, index) => {
        if (day === null) {
          return (
            <View
              key={`empty-${index}`}
              style={{ width: "14.28%", height: 64, backgroundColor: bgColor }}
            />
          );
        }
        const date = formatDate(selectedYear, selectedMonth, day);
        const expenseInfo = getExpenseForDate(date);
        return (
          <TouchableOpacity
            key={day}
            onPress={() => handleDayPress(day)}
            style={{
              width: "14.28%",
              height: 64,
              borderWidth: 1,
              borderColor: borderColor,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: bgColor,
            }}
          >
            <Text style={{ color: textColor, fontWeight: "500" }}>{day}</Text>
            {expenseInfo && (
              <Text
                style={{
                  fontSize: 12,
                  color: expenseColor,
                  fontWeight: "bold",
                }}
              >
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
