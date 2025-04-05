import React from "react";
import { Text, TextInput, View } from "react-native";
import { useColorScheme } from "nativewind";
import { Props } from "./types";

function InputText(props: Props) {
  const { colorScheme } = useColorScheme();

  return (
    <View testID={props.testID} className={`flex ${props.twClass}`}>
      {props.label && (
        <Text
          testID="input-text-label"
          className="text-black dark:text-white mb-1 text-base"
        >
          {props.label}
        </Text>
      )}
      {props.icon && (
        <View className="absolute z-10 top-3 left-3" pointerEvents="none">
          {props.icon}
        </View>
      )}
      <TextInput
        testID="input-text-textinput"
        accessibilityLabel={props.accessibilityLabel}
        accessibilityRole={props.accessibilityRole ? props.accessibilityRole : 'none'}
        className={`h-[54px] text-base dark:text-white p-3 px-4 bg-white dark:bg-zinc-800 rounded-lg border-2 border-slate-600 dark:border-zinc-500 ${
          props.inputClassName
        } ${props.error ? "border-red-500" : ""} ${props.icon && "pl-12"}`}
        onChangeText={props.onChangeText}
        value={props.value}
        placeholder={props.placeholder}
        placeholderTextColor={colorScheme === "dark" ? "white" : "black"}
        keyboardType={props.keyboardType}
      />
    </View>
  );
}

export default InputText;
