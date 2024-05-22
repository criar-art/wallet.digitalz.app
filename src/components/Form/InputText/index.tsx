import { Text, TextInput, View } from "react-native";
import { Props } from "./types";

function InputText(props: any) {
  return (
    <View testID={props.testID} className={`flex ${props.className}`}>
      <Text className="text-black dark:text-white mb-1 text-base">
        {props.label}
      </Text>
      <TextInput
        accessibilityLabel={props.accessibilityLabel}
        className={`text-base dark:text-white p-3 px-4 bg-white dark:bg-zinc-800 rounded-lg border-2 border-slate-600 dark:border-zinc-500 ${
          !props.error && "border-red-500"
        }`}
        onChangeText={props.onChangeText}
        value={props.value}
      />
    </View>
  );
}

export default InputText;
