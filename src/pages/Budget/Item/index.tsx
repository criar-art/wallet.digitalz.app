import { memo, useEffect, useRef } from "react";
import { Text, View, Animated, TouchableOpacity } from "react-native";
import { NavigationProp, ParamListBase, useIsFocused, useNavigation } from "@react-navigation/native";
import { NumericFormat } from "react-number-format";
import { useColorScheme } from "nativewind";
import {
  FontAwesome,
  MaterialCommunityIcons,
  MaterialIcons
} from "@expo/vector-icons";
import utils from "@utils";
import Button from "@components/common/Button";
import { currencySymbol } from "@utils/locale";
import { Props } from "./types";
import { formatDate } from "@utils/date";
import { useTranslation } from "react-i18next";

function ItemBudget(props: Props) {
  const { colorScheme } = useColorScheme();
  const navigation: NavigationProp<ParamListBase> = useNavigation();
  const { t } = useTranslation();
  const isFocused = useIsFocused();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const optionsShow = props.optionsShow === props.item.id;

  useEffect(() => {
    if (!isFocused && props?.setOptionsShow) props?.setOptionsShow(null);
  }, [isFocused]);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: optionsShow ? 1 : 0,
      duration: 500,
      useNativeDriver: true,
    }).start();

    return () => {
      fadeAnim.setValue(0);
    };
  }, [optionsShow, fadeAnim]);

  // Ensure totalTransactionsValue and remainingBudget are numbers
  const totalTransactionsValue = typeof props.item.totalTransactionsValue === 'number' ? props.item.totalTransactionsValue : 0;
  const remainingBudget = typeof props.item.remainingBudget === 'number' ? props.item.remainingBudget : 0;
  const isOverBudget = typeof props.item.isOverBudget === 'boolean' ? props.item.isOverBudget : false;

  return (
    <TouchableOpacity
      key={props.item.id}
      className="p-4 mx-3 mt-3 bg-white dark:bg-zinc-800 rounded-lg"
      onPress={() => {
        if(props?.setOptionsShow) {
          props.handlePressOptionsShow(props.item.id)
        } else{
          navigation.navigate('Transaction', { id: props.item.id })
        }
      }}
    >
      <Text className="text-black dark:text-white text-xl">{props.item.name}</Text>
      {props.setOptionsShow && props.item.description && (
        <Text className="text-black dark:text-white text-base">{props.item.description}</Text>
      )}
      <NumericFormat
        value={props.item.value}
        displayType={"text"}
        thousandSeparator={"."}
        decimalSeparator={","}
        decimalScale={2}
        fixedDecimalScale
        prefix={`${currencySymbol} `}
        renderText={(value: string) => (
          <View className="flex flex-row items-center">
            <Text className="text-black dark:text-white mr-2">
              {t("common.totalBudget")}
            </Text>
            <Text className="text-black dark:text-white font-bold text-xl">
              {utils.parseMoney(value, props.eyeStatus)}
            </Text>
          </View>
        )}
      />
      <NumericFormat
        value={totalTransactionsValue}
        displayType={"text"}
        thousandSeparator={"."}
        decimalSeparator={","}
        decimalScale={2}
        fixedDecimalScale
        prefix={`${currencySymbol} `}
        renderText={(value: string) => (
          <View className="flex flex-row items-center">
            <Text className="text-black dark:text-white mr-2">
              {t("common.totalTransactionsValue")}:
            </Text>
            <Text className="text-black dark:text-white font-bold text-base">
              {utils.parseMoney(value, props.eyeStatus)}
            </Text>
          </View>
        )}
      />
      <NumericFormat
        value={remainingBudget}
        displayType={"text"}
        thousandSeparator={"."}
        decimalSeparator={","}
        decimalScale={2}
        fixedDecimalScale
        prefix={`${currencySymbol} `}
        renderText={(value: string) => (
          <View className="flex flex-row items-center">
            <Text className="text-black dark:text-white mr-2">
            {t("common.remainingBudget")}:
            </Text>
            <Text className={`text-base ${isOverBudget ? 'text-red-500' : 'text-green-500'}`}>
              {utils.parseMoney(value, props.eyeStatus)}
            </Text>
          </View>
        )}
      />
      <Text className={`text-xl ${isOverBudget ? 'text-red-500' : 'text-green-500'}`}>
        {isOverBudget ? t("common.budgetExceeded") : t("common.withinBudget")}
      </Text>
      {props.setOptionsShow && (
        <>
          <View className="flex flex-row items-center mt-2">
            <FontAwesome
              name="calendar"
              size={20}
              color={colorScheme === "dark" ? "white" : "black"}
            />
            <Text className="ml-2 text-black dark:text-white text-base mr-2">
              {t("common.createDate")}: {props.item.date_create && formatDate(props.item.date_create)}
            </Text>
          </View>
          <View className="flex flex-row items-center mt-2">
            <FontAwesome
              name="calendar"
              size={20}
              color={colorScheme === "dark" ? "white" : "black"}
            />
            <Text className="ml-2 text-black dark:text-white text-base">
              {t("common.endDate")}: {props.item.date_end && formatDate(props.item.date_end)}
            </Text>
          </View>
        </>
      )}
      <Animated.View
        className="flex flex-row items-center z-20 absolute top-0 right-0 bottom-0"
        style={{ opacity: fadeAnim }}
        pointerEvents={!optionsShow ? "none" : "auto"}
      >
        <Button
          twClass="z-20 w-14 h-14 my-2 rounded-full border-2 border-gray-300 dark:border-zinc-500 bg-white dark:bg-zinc-800"
          onPress={props.edit}
          label={`Editar registro ${props.item.name}`}
          icon={
            <MaterialIcons
              name="edit"
              size={22}
              color={colorScheme === "dark" ? "white" : "black"}
            />
          }
        />
        <Button
          twClass="z-20 w-14 h-14 m-2 mr-4 rounded-full border-2 border-red-300 bg-white dark:bg-zinc-800"
          onPress={props.remove}
          label={`Excluir registro ${props.item.name}`}
          icon={
            <MaterialCommunityIcons
              name="trash-can-outline"
              size={22}
              color={colorScheme === "dark" ? "rgb(252 165 165)" : "red"}
            />
          }
        />
      </Animated.View>
    </TouchableOpacity>
  );
}

export default memo(ItemBudget);
