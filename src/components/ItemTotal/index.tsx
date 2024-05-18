import { Text, View } from "react-native";
import { NumericFormat } from "react-number-format";
import { renderBorderType, types, parseMoney } from "../../utils";
import { Props } from "./types";

export default function ItemTotal(props: Props) {
  return (
    <View
      testID={props.testID}
      className={`flex flex-row justify-center items-center bg-white dark:bg-zinc-800 px-8 shadow-lg ${renderBorderType(
        props.type
      )} ${
        props.orientation === 4 || props.orientation === 3
          ? "justify-center py-2"
          : "pt-5 pb-6"
      }`}
    >
      <NumericFormat
        value={props.value}
        displayType={"text"}
        thousandSeparator={"."}
        decimalSeparator={","}
        decimalScale={2}
        fixedDecimalScale
        prefix={"R$ "}
        renderText={(value: string) => (
          <View className="flex flex-row items-center">
            <Text className="text-black dark:text-white mr-2">
              Total {types[props.type]}
            </Text>
            <Text className="text-black dark:text-white font-bold text-2xl">
              {parseMoney(value, props.eyeStatus)}
            </Text>
          </View>
        )}
      />
    </View>
  );
}
