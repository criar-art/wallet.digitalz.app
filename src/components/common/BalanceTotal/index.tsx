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
  const { landscape, portrait } = useOrientation();
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
      testID="balance-total"
      className={props.twClass}
      onPress={props.onPress}
    >
      <View
        testID={props.testID}
        className={`flex flex-row items-center ${utils.renderBorderType(
          props.type
        )} ${landscape
          ? "justify-end"
          : "justify-start px-8 pt-5 pb-6 bg-white dark:bg-zinc-800 shadow-lg"
          }`}
      >
        {portrait && (
          <View className="flex mr-2">{renderModalIcon(props.type)}</View>
        )}
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
              className={`flex flex-col ${landscape ? "items-end justify-end" : "items-start"
                }`}
            >
              <Text className="text-sm text-black dark:text-white">
                {t("common.total")} {t(`common.${props.type}`)}{" "}
                {!isFilterEmpty ? t("common.filtered") : ""}
              </Text>
              <Text
                className={`text-black dark:text-white font-bold text-2xl ${totalValue < 0 && "text-red-700"
                  }`}
              >
                {utils.parseMoney(value, common.eyeStatus)}
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
    </TouchableOpacity>
  );
}

export default memo(TotalCategory);
