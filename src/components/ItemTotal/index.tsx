import React from "react";
import { Text, View } from "react-native";
import { NumericFormat } from "react-number-format";

import { renderBorderType, types } from "../../utils";
import { Props } from "./types";
import { parseMoney } from "../../utils";

export default function ItemTotal(props: Props) {
  return (
    <View
      testID={props.testID}
      className={`flex flex-row justify-between items-center border-b-2 text-black bg-white pt-2 pb-4 px-8 shadow-lg ${renderBorderType(
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
            <Text className="font-bold">
              {parseMoney(value, props.eyeStatus)}
            </Text>
          </View>
        )}
      />
    </View>
  );
}
