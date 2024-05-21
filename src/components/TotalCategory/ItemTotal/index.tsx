import { Text, View } from "react-native";
import { NumericFormat } from "react-number-format";
import { useColorScheme } from "nativewind";
import { renderBorderType, types, parseMoney } from "../../../utils";
import { Props } from "./types";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import useOrientation from "../../../hooks/useOrientation";

export default function ItemTotal(props: Props) {
  const { colorScheme } = useColorScheme();
  const { landscape } = useOrientation();
  const iconConfig = {
    size: 35,
    color: colorScheme === "dark" ? "white" : "black",
  };

  const modalIcons: any = {
    liquid: <MaterialIcons name="attach-money" {...iconConfig} />,
    patrimony: <MaterialCommunityIcons name="gold" {...iconConfig} />,
    investiment: (
      <MaterialIcons
        name="trending-up"
        size={38}
        color={iconConfig.color}
        style={{
          transform: [{ translateY: 6 }],
        }}
      />
    ),
    entry: (
      <MaterialCommunityIcons
        name="cash-plus"
        {...iconConfig}
        style={{
          transform: [{ translateY: 3 }],
        }}
      />
    ),
    expense: (
      <MaterialCommunityIcons
        name="cash-remove"
        {...iconConfig}
        style={{
          transform: [{ translateY: 3 }],
        }}
      />
    ),
  };

  const renderModalIcon = (type: any) => modalIcons[type] || null;

  return (
    <View
      testID={props.testID}
      className={`flex flex-row items-center ${renderBorderType(props.type)} ${
        landscape
          ? "justify-end mr-20 pr-[75] border-r-2 border-gray-100 dark:border-zinc-700"
          : "justify-center px-8 pt-5 pb-6 bg-white dark:bg-zinc-800 shadow-lg"
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
              landscape ? "items-end justify-end" : "items-center"
            }`}
          >
            <Text className="text-sm text-black dark:text-white">
              Total {types[props.type]}
            </Text>
            <Text className={`text-black dark:text-white font-bold text-2xl ${props.value < 0 && "text-red-700"}`}>
              {parseMoney(value, props.eyeStatus)}
            </Text>
            {landscape && (
              <View className="flex justify-center items-center absolute -right-[50] bottom-[8]">
                <View className="flex">{renderModalIcon(props.type)}</View>
              </View>
            )}
          </View>
        )}
      />
    </View>
  );
}
