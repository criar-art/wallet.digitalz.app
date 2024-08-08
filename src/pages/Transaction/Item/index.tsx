import { memo, useEffect, useRef } from "react";
import { Text, View, Animated, TouchableOpacity } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { NumericFormat } from "react-number-format";
import { useColorScheme } from "nativewind";
import {
  MaterialIcons,
  MaterialCommunityIcons,
  FontAwesome,
} from "@expo/vector-icons";
import utils from "@utils";
import Button from "@components/common/Button";
import { currencySymbol } from "@utils/locale";
import { Props } from "./types";
import { formatDate } from "@utils/date";

function ItemTransaction(props: Props) {
  const { colorScheme } = useColorScheme();
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
      testID={props.testID}
      onPress={() => props.handlePressOptionsShow(props.item.id)}
      className="p-4 mx-5 mb-4 bg-white dark:bg-zinc-800 rounded-lg"
    >
      <Text className="text-black dark:text-white text-base">
        {props.item.name}
      </Text>
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
            <Text className="text-black dark:text-white font-bold text-base">
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
          {props.item.date && formatDate(props.item.date)}
        </Text>
      </View>
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

export default memo(ItemTransaction);
