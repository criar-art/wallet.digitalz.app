import React from "react";
import { Text, TextInput, View } from "react-native";
import { Props } from "./types";
import { useColorScheme } from "nativewind";

function InputText(props: Props) {
  const { colorScheme } = useColorScheme();

  return (
    <View testID={props.testID} className={`flex ${props.className}`}>
      {props.label && (
        <Text
          testID="input-text-label"
          className="text-black dark:text-white mb-1 text-base"
        >
          {props.label}
        </Text>
      )}
      <TextInput
        testID="input-text-textinput"
        accessibilityLabel={props.accessibilityLabel}
        className={`text-base dark:text-white p-3 px-4 bg-white dark:bg-zinc-800 rounded-lg border-2 border-slate-600 dark:border-zinc-500 ${
          props.inputClassName
        } ${props.error ? "border-red-500" : ""}`}
        onChangeText={props.onChangeText}
        value={props.value}
        placeholder={props.placeholder}
        placeholderTextColor={colorScheme === "dark" ? "white" : "black"}
      />
    </View>
  );
}

export default InputText;
