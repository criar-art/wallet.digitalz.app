import { Text, View } from "react-native";
import { NumericFormat } from "react-number-format";
import { renderBorderType, types, parseMoney } from "../../utils";
import { Props } from "./types";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";

export default function ItemTotal(props: Props) {
  const modalIcons: any = {
    liquid: <MaterialIcons name="attach-money" size={35} color="#000" />,
    patrimony: <MaterialCommunityIcons name="gold" size={35} color="#000" />,
    investiment: <MaterialIcons name="trending-up" size={35} color="#000" />,
    entry: <MaterialCommunityIcons name="cash-plus" size={35} color="#000" />,
    expense: (
      <MaterialCommunityIcons name="cash-remove" size={35} color="#000" />
    ),
  };

  const renderModalIcon = (type: any) => modalIcons[type] || null;
  return (
    <View
      testID={props.testID}
      className={`flex flex-row items-center${renderBorderType(props.type)} ${
        props.orientation === 4 || props.orientation === 3
          ? "justify-end mr-36"
          : "justify-center px-8 pt-5 pb-6  bg-white dark:bg-zinc-800 shadow-lg"
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
          <View
            className={`flex flex-col ${
              props.orientation === 4 || props.orientation === 3
                ? "items-end justify-end"
                : "items-center"
            }`}
          >
            <Text className="text-sm text-black dark:text-white">
              Total {types[props.type]}
            </Text>
            <Text className="text-black dark:text-white font-bold text-2xl">
              {parseMoney(value, props.eyeStatus)}
            </Text>
            {(props.orientation === 4 || props.orientation === 3) && (
              <View className="absolute -right-[50] bottom-[4]">{renderModalIcon(props.type)}</View>
            )}
          </View>
        )}
      />
    </View>
  );
}
