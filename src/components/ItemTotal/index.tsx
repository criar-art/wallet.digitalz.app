import { Text, View } from "react-native";
import { NumericFormat } from "react-number-format";
import { renderBorderType, types, parseMoney } from "../../utils";
import { Props } from "./types";

export default function ItemTotal(props: Props) {
  return (
    <View
      testID={props.testID}
      className={`flex flex-row justify-between items-center text-black bg-white pt-5 pb-6 px-8 shadow-lg ${renderBorderType(
        props.type
      )}`}
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
          <View className="flex">
            <Text className="text-black">Total {types[props.type]}</Text>
            <Text className="font-bold text-2xl">
              {parseMoney(value, props.eyeStatus)}
            </Text>
          </View>
        )}
      />
    </View>
  );
}
