import { memo, useEffect, useRef } from "react";
import { Text, View, Animated, TouchableOpacity } from "react-native";
import { NavigationProp, ParamListBase, useIsFocused, useNavigation } from "@react-navigation/native";
import { NumericFormat } from "react-number-format";
import { useColorScheme } from "nativewind";
import {
  FontAwesome,
  MaterialCommunityIcons,
  MaterialIcons,
  SimpleLineIcons,
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
    if (!isFocused) props.setOptionsShow(null);
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
      key={props.item.id}
      className="p-4 mx-3 mt-3 bg-white dark:bg-zinc-800 rounded-lg"
      onPress={() => navigation.navigate('Transaction', { id: props.item.id })}
    >
      <Text className="text-black dark:text-white text-xl">{props.item.name}</Text>
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
              {t("common.total")}
            </Text>
            <Text className="text-black dark:text-white font-bold text-xl">
              {utils.parseMoney(value, props.eyeStatus)}
            </Text>
          </View>
        )}
      />
      <View className="flex flex-row items-center">
        <FontAwesome
          name="calendar"
          size={20}
          color={colorScheme === "dark" ? "white" : "black"}
        />
        <Text className="ml-2 text-black dark:text-white text-base mr-2">
          Create: {props.item.date_create && formatDate(props.item.date_create)}
        </Text>
      </View>
      <View className="flex flex-row items-center">
        <FontAwesome
          name="calendar"
          size={20}
          color={colorScheme === "dark" ? "white" : "black"}
        />
        <Text className="ml-2 text-black dark:text-white text-base">
          End: {props.item.date_end && formatDate(props.item.date_end)}
        </Text>
      </View>
    <Button
      twClass="absolute top-[50%] -translate-y-3 right-2 z-20 w-10 h-10 my-2 rounded-full border-2 border-gray-300 dark:border-zinc-500 bg-white dark:bg-zinc-800"
      label="Actions"
      onPress={() => props.handlePressOptionsShow(props.item.id)}
      icon={
        <SimpleLineIcons
          name="options-vertical"
          size={18}
          color={colorScheme === "dark" ? "white" : "#888"}
        />
      }
    />
    <Animated.View
      className="flex flex-row items-center z-19 absolute top-0 right-10 bottom-0 bg-white"
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
