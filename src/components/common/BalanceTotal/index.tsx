import { memo, useMemo, useCallback } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useAppSelector } from "@store/hooks";
import { useBalance } from "@hooks/useBalance";
import { RootState } from "@store";
import { Props } from "./types";
import utils from "@utils";
import { useTranslation } from "react-i18next";
import { useColorScheme } from "nativewind";
import useOrientation from "@hooks/useOrientation";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { NumericFormat } from "react-number-format";
import { currencySymbol } from "@utils/locale";

function TotalCategory(props: Props) {
  const { t } = useTranslation();
  const { colorScheme } = useColorScheme();
  const common = useAppSelector((state: RootState) => state.commonState);
  const { getTotal, getPatrimonyTotal, getFilteredTotal } = useBalance();
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
      />
    ),
    entry: (
      <MaterialCommunityIcons
        name="cash-plus"
        {...iconConfig}
      />
    ),
    expense: (
      <MaterialCommunityIcons
        name="cash-remove"
        {...iconConfig}
      />
    ),
  };

  const renderModalIcon = (type: any) => modalIcons[type] || null;

  const isFilterEmpty = useMemo(
    () =>
      props.type !== "patrimony"
        ? utils.isObjectEmpty(props.filter)
        : true,
    [props.filter]
  );

  const getTotalValue = useCallback((): number => {
    return props.type === "patrimony"
      ? getPatrimonyTotal()
      : getTotal(props.type);
  }, [getPatrimonyTotal, getTotal, props.type]);

  const totalValue = useMemo((): number => {
    if (props.filtered && props.type !== "patrimony" && !isFilterEmpty) {
      return getFilteredTotal(props.filtered);
    }
    return getTotalValue();
  }, [isFilterEmpty, getTotalValue, props.filtered, getFilteredTotal]);

  return (
    <TouchableOpacity
      testID={props.testID ? props.testID : "balance-total"}
      className={props.drawer ? "w-auto" : "w-full"}
      onPress={props.onPress}
    >
      <View
        className={`flex flex-row items-center justify-start bg-white dark:bg-zinc-800 shadow-lg ${utils.renderBorderType(
          props.type
        )} ${props.drawer ? "border-r-2 border-gray-100 dark:border-zinc-700 pr-4 h-12" : "px-8 pt-4 pb-6"} ${props.twClass}`}
      >
        <NumericFormat
          value={totalValue}
          displayType={"text"}
          thousandSeparator={"."}
          decimalSeparator={","}
          decimalScale={2}
          fixedDecimalScale
          prefix={`${currencySymbol} `}
          renderText={(value: string) => (
            <View
              className={`flex ${props.drawer ? "flex-row-reverse" : "flex-row"}`}
            >
              <View className={`flex justify-center items-center ${props.drawer ? "ml-2" : "mr-2"}`}>
                <View className="flex">{renderModalIcon(props.type)}</View>
              </View>
              <View
                className={`flex flex-col`}
              >
                <Text className={`text-xs text-black dark:text-white ${props.drawer && "text-right"}`}>
                  {t("common.total")} {t(`common.${props.type}`)}{" "}
                  {!isFilterEmpty ? t("common.filtered") : ""}
                </Text>
                <Text
                  className={`text-black dark:text-white font-bold text-lg ${totalValue < 0 && "text-red-700"
                    } ${props.drawer && "text-right"}`}
                >
                  {utils.parseMoney(value, common.eyeStatus)}
                </Text>
              </View>
            </View>
          )}
        />
      </View>
    </TouchableOpacity>
  );
}

export default memo(TotalCategory);
