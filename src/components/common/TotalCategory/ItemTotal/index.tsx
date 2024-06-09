import { Text, View } from "react-native";
import { NumericFormat } from "react-number-format";
import { useColorScheme } from "nativewind";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import utils from "@utils";
import useOrientation from "@hooks/useOrientation";
import { Props } from "./types";
import { useTranslation } from "react-i18next";

export default function ItemTotal(props: Props) {
  const {
    t,
    i18n: { language },
  } = useTranslation();
  const { colorScheme } = useColorScheme();
  const { landscape, portrait } = useOrientation();
  const iconConfig = {
    size: 35,
    color: colorScheme === "dark" ? "white" : "black",
  };

  const modalIcons: any = {
    liquid: <MaterialIcons name="attach-money" {...iconConfig} />,
    patrimony: <MaterialCommunityIcons name="gold" {...iconConfig} />,
    investment: (
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
      className={`flex flex-row items-center ${utils.renderBorderType(
        props.type
      )} ${
        landscape
          ? "justify-end"
          : "justify-start px-8 pt-5 pb-6 bg-white dark:bg-zinc-800 shadow-lg"
      }`}
    >
      {portrait && (
        <View className="flex mr-2">{renderModalIcon(props.type)}</View>
      )}
      <NumericFormat
        value={props.value}
        displayType={"text"}
        thousandSeparator={"."}
        decimalSeparator={","}
        decimalScale={2}
        fixedDecimalScale
        prefix={language == "pt-BR" ? "R$ " : "$ "}
        renderText={(value: string) => (
          <View
            className={`flex flex-col ${
              landscape ? "items-end justify-end" : "items-start"
            }`}
          >
            <Text className="text-sm text-black dark:text-white">
              {t("common.total")} {t(`common.${props.type}`)}{" "}
              {!props.isFilterEmpty ? t("common.filtered") : ""}
            </Text>
            <Text
              className={`text-black dark:text-white font-bold text-2xl ${
                props.value < 0 && "text-red-700"
              }`}
            >
              {utils.parseMoney(value, props.eyeStatus)}
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
