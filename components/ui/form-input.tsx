import React from "react";
import { Text, TextInput, View } from "react-native";

interface FormInputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  required?: boolean;
  className?: string;
  inputClassName?: string;
  keyboardType?: "default" | "numeric" | "email-address" | "phone-pad";
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
  maxLength?: number;
}

export default function FormInput({
  label,
  value,
  onChangeText,
  placeholder,
  required = false,
  className = "",
  inputClassName = "",
  keyboardType = "default",
  autoCapitalize = "none",
  maxLength,
}: FormInputProps) {
  return (
    <View className={className}>
      {required ? <Text className="mb-2 font-medium text-gray-700">{label + "*"}</Text> : <Text className="mb-2 font-medium text-gray-700">{label}</Text>}
      <TextInput
        className={`rounded-lg border border-gray-300 bg-white px-3 py-2 ${inputClassName}`}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        maxLength={maxLength}
      />
    </View>
  );
}
