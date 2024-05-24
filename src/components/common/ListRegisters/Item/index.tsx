import { useEffect, useRef, useState } from "react";
import { Text, View, Animated, TouchableOpacity } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { NumericFormat } from "react-number-format";
import { useColorScheme } from "nativewind";
import {
  MaterialIcons,
  MaterialCommunityIcons,
  FontAwesome5,
} from "@expo/vector-icons";
import {
  renderBorderType,
  parseMoney,
  isDatePast,
  isDateToday,
  renderBackgroundClass,
  isDateTomorrow,
} from "@utils";
import useOrientation from "@hooks/useOrientation";
import Button from "@components/common/Button";
import useIsTablet from "@hooks/useIsTablet";
import { Props } from "./types";

export const renderBadge = (type: string, date: string, isPaid: boolean) => {
  let badgeText = "";
  let badgeColor = "";

  if (isPaid) {
    badgeText = "PAGO";
    badgeColor = "bg-green-500";
  } else if (isDateToday(date)) {
    badgeText = type === "expense" ? "VENCE HOJE" : "DISPONÍVEL HOJE";
    badgeColor = type === "expense" ? "bg-red-500" : "bg-green-500";
  } else if (isDateTomorrow(date)) {
    badgeText = type === "expense" ? "VENCE AMANHÃ" : "DISPONÍVEL AMANHÃ";
    badgeColor = type === "expense" ? "bg-red-500" : "bg-green-500";
  } else if (isDatePast(date)) {
    badgeText = type === "expense" ? "VENCIDO" : "DISPONÍVEL";
    badgeColor = type === "expense" ? "bg-red-500" : "bg-green-500";
  } else {
    return null;
  }

  return (
    <View
      className={`${badgeColor} p-1 px-2 rounded-full absolute z-10 left-2 -top-3`}
    >
      <Text className="text-white text-center font-black text-xs">
        {badgeText}
      </Text>
    </View>
  );
};

export default function ItemList(props: Props) {
  const { colorScheme } = useColorScheme();
  const { landscape } = useOrientation();
  const isTablet = useIsTablet();
  const isFocused = useIsFocused();
  const [optionsShow, setOptionsShow] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!isFocused) setOptionsShow(false);
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

  return (
    <TouchableOpacity
      testID={props.testID}
      onPress={() => setOptionsShow(!optionsShow)}
      className={`border-l-4 bg-white dark:bg-zinc-800 p-6 pt-3 pb-4 mt-6 rounded-lg shadow-lg ${renderBorderType(
        props.item.type
      )} ${renderBackgroundClass(
        props.item.type,
        props.item.date,
        props.item.pay
      )} ${landscape || isTablet ? "mx-3" : "mx-5"}`}
    >
      {renderBadge(props.item.type, props.item.date, props.item.pay)}
      <Text className="text-black dark:text-white text-xl mb-1">
        {props.item.name}
      </Text>
      <View className="flex flex-row items-center mb-1">
        <FontAwesome5
          name="money-bill-wave"
          size={16}
          color={colorScheme === "dark" ? "white" : "black"}
        />
        <Text className="ml-2 text-black dark:text-white">
          <NumericFormat
            value={props.item.value}
            displayType={"text"}
            thousandSeparator={"."}
            decimalSeparator={","}
            decimalScale={2}
            fixedDecimalScale
            prefix={"R$ "}
            renderText={(value: string) => (
              <Text className="text-xl">
                {parseMoney(value, props.eyeStatus)}
              </Text>
            )}
          />
        </Text>
      </View>
      <View className="flex flex-row items-center">
        <MaterialIcons
          name="calendar-month"
          size={22}
          color={colorScheme === "dark" ? "white" : "black"}
        />
        <Text className="ml-2 text-black dark:text-white text-base">
          {props.item.date}
        </Text>
      </View>
      <Animated.View
        className="flex flex-row items-center z-20 absolute top-0 right-0 bottom-0"
        style={{ opacity: fadeAnim }}
        pointerEvents={!optionsShow ? "none" : "auto"}
      >
        {!props.item.pay && props.item.type == "expense" && (
          <Button
            twClass="z-20 w-14 h-14 m-5 rounded-full border-2 border-green-500 dark:border-green-500 bg-white dark:bg-zinc-800"
            onPress={props.handlePay}
            label={`Pagar ${props.item.name}`}
            icon={
              <MaterialIcons name="check" size={30} color="rgb(34 197 94)" />
            }
          />
        )}
        <Button
          twClass="z-20 w-14 h-14 my-5 rounded-full border-2 border-gray-300 dark:border-zinc-500 bg-white dark:bg-zinc-800"
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
          twClass="z-20 w-14 h-14 m-5 rounded-full border-2 border-red-300 bg-white dark:bg-zinc-800"
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
