import classNames from "@/utils/classnames";
import { ChevronDown } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import { FlatList, Modal, Pressable, Text, TextInput, TouchableOpacity, View } from "react-native";

export interface ComboboxOption {
  value: string;
  label: string;
}

interface CurrencyComboboxProps {
  options: ComboboxOption[];
  value?: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  allowCustomValue?: boolean;
  loading?: boolean;
  error?: string;
}

export default function CurrencyCombobox({
  options,
  value,
  onValueChange,
  placeholder = "Select currency...",
  className = "",
  disabled = false,
  allowCustomValue = true,
  loading = false,
  error,
}: CurrencyComboboxProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [customValue, setCustomValue] = useState(value || "");

  const filteredOptions = options.filter((option) => option.label.toLowerCase().includes(searchText.toLowerCase()));
  const selectedOption = options.find((opt) => opt.value === value);

  useEffect(() => {
    setCustomValue(value || "");
  }, [value]);

  const handleSelect = (optionValue: string) => {
    onValueChange(optionValue);
    setCustomValue(optionValue);
    setIsOpen(false);
    setSearchText("");
  };

  const handleCustomValueChange = (text: string) => {
    const upperText = text.toUpperCase();
    setCustomValue(upperText);
    if (allowCustomValue) {
      onValueChange(upperText);
    }
  };

  const openDropdown = () => {
    if (!disabled) {
      setIsOpen(true);
    }
  };

  return (
    <View className={className}>
      {/* Main Input */}
      <TouchableOpacity
        className={classNames("flex-row items-center justify-between rounded-lg border bg-white px-4 py-3", {
          "border-gray-300": !error,
          "border-red-500": error != null,
          "bg-gray-100": disabled,
        })}
        onPress={openDropdown}
        disabled={disabled}
      >
        {allowCustomValue ? (
          <TextInput
            className="flex-1"
            value={customValue}
            onChangeText={handleCustomValueChange}
            placeholder={placeholder}
            autoCapitalize="characters"
            maxLength={3}
            editable={!disabled}
            onFocus={openDropdown}
          />
        ) : (
          <Text
            className={classNames("flex-1", {
              "text-gray-900": selectedOption != null,
              "text-gray-400": !selectedOption,
            })}
          >
            {selectedOption ? selectedOption.label : placeholder}
          </Text>
        )}

        <ChevronDown
          size={20}
          color={disabled ? "#9CA3AF" : "#6B7280"}
          style={{
            transform: [{ rotate: isOpen ? "180deg" : "0deg" }],
          }}
        />
      </TouchableOpacity>

      {error && <Text className="mt-1 text-sm text-red-500">{error}</Text>}

      {/* Dropdown Modal */}
      <Modal visible={isOpen} transparent animationType="fade" onRequestClose={() => setIsOpen(false)}>
        <Pressable className="flex-1 bg-black/50" onPress={() => setIsOpen(false)}>
          <View className="flex-1 items-center justify-center p-4">
            <Pressable className="max-h-96 w-full max-w-sm rounded-lg bg-white" onPress={(e) => e.stopPropagation()}>
              {/* Search Input */}
              <View className="border-b border-gray-200 p-4">
                <TextInput className="rounded-lg border border-gray-300 bg-white px-3 py-2" value={searchText} onChangeText={setSearchText} placeholder="Search currencies..." autoFocus />
              </View>

              {/* Options List */}
              <View className="max-h-60">
                {loading ? (
                  <View className="p-4">
                    <Text className="text-center text-gray-500">Loading currencies...</Text>
                  </View>
                ) : filteredOptions.length > 0 ? (
                  <FlatList
                    data={filteredOptions}
                    keyExtractor={(item) => item.value}
                    renderItem={({ item }) => (
                      <TouchableOpacity
                        className={classNames("border-b border-gray-100 px-4 py-3", {
                          "bg-blue-50": item.value === value,
                        })}
                        onPress={() => handleSelect(item.value)}
                      >
                        <Text
                          className={classNames({
                            "font-medium text-blue-600": item.value === value,
                            "text-gray-900": item.value !== value,
                          })}
                        >
                          {item.label}
                        </Text>
                      </TouchableOpacity>
                    )}
                  />
                ) : (
                  <View className="p-4">
                    <Text className="text-center text-gray-500">No currencies found</Text>
                    {allowCustomValue && searchText && (
                      <TouchableOpacity className="mt-2 rounded bg-blue-50 p-2" onPress={() => handleSelect(searchText.toUpperCase())}>
                        <Text className="text-center text-blue-600">{`Use "${searchText.toUpperCase()}"`}</Text>
                      </TouchableOpacity>
                    )}
                  </View>
                )}
              </View>

              {/* Close Button */}
              <View className="border-t border-gray-200 p-4">
                <TouchableOpacity className="rounded-lg bg-gray-500 px-4 py-2" onPress={() => setIsOpen(false)}>
                  <Text className="text-center font-medium text-white">Close</Text>
                </TouchableOpacity>
              </View>
            </Pressable>
          </View>
        </Pressable>
      </Modal>
    </View>
  );
}
