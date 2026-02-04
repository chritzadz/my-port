import classNames from "@/utils/classnames";
import { ChevronDown } from "lucide-react-native";
import React, { useState } from "react";
import {
  FlatList,
  Modal,
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export interface ComboboxOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface GenericComboboxProps {
  options: ComboboxOption[];
  value?: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  searchable?: boolean;
  allowCustomValue?: boolean;
  loading?: boolean;
  error?: string;
  emptyMessage?: string;
  searchPlaceholder?: string;
}

export default function GenericCombobox({
  options,
  value,
  onValueChange,
  placeholder = "Select an option...",
  className = "",
  disabled = false,
  searchable = true,
  allowCustomValue = false,
  loading = false,
  error,
  emptyMessage = "No options found",
  searchPlaceholder = "Search...",
}: GenericComboboxProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchText, setSearchText] = useState("");

  const filteredOptions = searchable
    ? options.filter((option) =>
        option.label.toLowerCase().includes(searchText.toLowerCase()),
      )
    : options;

  const selectedOption = options.find((opt) => opt.value === value);

  const handleSelect = (optionValue: string) => {
    onValueChange(optionValue);
    setIsOpen(false);
    setSearchText("");
  };

  const openDropdown = () => {
    if (!disabled) {
      setIsOpen(true);
    }
  };

  return (
    <View className={className}>
      {/* Main Trigger */}
      <TouchableOpacity
        className={classNames(
          "border rounded-lg px-4 py-3 bg-white flex-row justify-between items-center",
          {
            "border-gray-300": !error,
            "border-red-500": error != null,
            "bg-gray-100": disabled,
          },
        )}
        onPress={openDropdown}
        disabled={disabled}
      >
        <Text
          className={classNames("flex-1 text-md", {
            "text-gray-900": selectedOption != null,
            "text-gray-400": !selectedOption,
          })}
        >
          {selectedOption ? selectedOption.label : placeholder}
        </Text>

        <ChevronDown
          size={20}
          color={disabled ? "#9CA3AF" : "#6B7280"}
          style={{
            transform: [{ rotate: isOpen ? "180deg" : "0deg" }],
          }}
        />
      </TouchableOpacity>

      {error && <Text className="text-red-500 text-sm mt-1">{error}</Text>}

      {/* Dropdown Modal */}
      <Modal
        visible={isOpen}
        transparent
        animationType="fade"
        onRequestClose={() => setIsOpen(false)}
      >
        <Pressable
          className="flex-1 bg-black/50"
          onPress={() => setIsOpen(false)}
        >
          <View className="flex-1 justify-center items-center p-4">
            <Pressable
              className="bg-white rounded-lg w-full max-w-sm max-h-96"
              onPress={(e) => e.stopPropagation()}
            >
              {/* Search Input */}
              {searchable && (
                <View className="p-4 border-b border-gray-200">
                  <TextInput
                    className="border border-gray-300 rounded-lg px-3 py-2 bg-white"
                    value={searchText}
                    onChangeText={setSearchText}
                    placeholder={searchPlaceholder}
                    autoFocus
                  />
                </View>
              )}

              {/* Options List */}
              <View className="max-h-60">
                {loading ? (
                  <View className="p-4">
                    <Text className="text-center text-gray-500">
                      Loading...
                    </Text>
                  </View>
                ) : filteredOptions.length > 0 ? (
                  <FlatList
                    data={filteredOptions}
                    keyExtractor={(item) => item.value}
                    renderItem={({ item }) => (
                      <TouchableOpacity
                        className={classNames(
                          "px-4 py-3 border-b border-gray-100",
                          {
                            "bg-blue-50": item.value === value,
                            "opacity-50":
                              item.disabled != null && item.disabled,
                          },
                        )}
                        onPress={() =>
                          !item.disabled && handleSelect(item.value)
                        }
                        disabled={item.disabled}
                      >
                        <Text
                          className={classNames("text-md", {
                            "text-blue-600 font-medium": item.value === value,
                            "text-gray-900":
                              item.value !== value && !item.disabled,
                            "text-gray-400":
                              item.disabled != null && item.disabled,
                          })}
                        >
                          {item.label}
                        </Text>
                      </TouchableOpacity>
                    )}
                  />
                ) : (
                  <View className="p-4">
                    <Text className="text-center text-gray-500">
                      {emptyMessage}
                    </Text>
                    {allowCustomValue && searchText && (
                      <TouchableOpacity
                        className="mt-2 p-2 bg-blue-50 rounded"
                        onPress={() => handleSelect(searchText)}
                      >
                        <Text className="text-center text-blue-600">
                          {`Use \"${searchText}\"`}
                        </Text>
                      </TouchableOpacity>
                    )}
                  </View>
                )}
              </View>

              {/* Close Button */}
              <View className="p-4 border-t border-gray-200">
                <TouchableOpacity
                  className="bg-gray-500 rounded-lg py-2 px-4"
                  onPress={() => setIsOpen(false)}
                >
                  <Text className="text-white text-center font-medium">
                    Close
                  </Text>
                </TouchableOpacity>
              </View>
            </Pressable>
          </View>
        </Pressable>
      </Modal>
    </View>
  );
}
