import { Text, TextInput, View } from "react-native";
import { useColorScheme } from "nativewind";
import { NumericFormat } from "react-number-format";
import { Props } from "./types";

function InputMoney(props: any) {
  const { colorScheme } = useColorScheme();

  return (
    <View className={`flex ${props.className}`}>
      <Text className="text-black dark:text-white mb-1 text-base">
        {props.label}
      </Text>
      <NumericFormat
        value={props.value}
        displayType={"text"}
        thousandSeparator={"."}
        decimalSeparator={","}
        decimalScale={2}
        prefix={"R$ "}
        onValueChange={props.onValueChange}
        renderText={(value) => {
          return (
            <TextInput
              accessibilityLabel="Valor do registro"
              className={`text-base dark:text-white p-3 px-4 bg-white dark:bg-zinc-800 rounded-lg border-2 border-slate-600 dark:border-zinc-500 ${
                props.error && "border-red-500"
              }`}
              placeholder="R$"
              onChangeText={props.onChangeText}
              value={value}
              keyboardType="phone-pad"
              placeholderTextColor={colorScheme === "dark" ? "white" : "black"}
            />
          );
        }}
      />
    </View>
  );
}

export default InputMoney;
