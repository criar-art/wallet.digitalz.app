import { useEffect, useRef, useState } from "react";
import { Text, View, Animated, TouchableOpacity } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { NumericFormat } from "react-number-format";
import {
  MaterialIcons,
  MaterialCommunityIcons,
  FontAwesome5,
} from "@expo/vector-icons";
import { renderBorderType, parseMoney } from "../../utils";
import Button from "../Button";
import { Props } from "./types";

export default function ItemList(props: Props) {
  const isFocused = useIsFocused();
  const [optionsShow, setOptionsShow] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!isFocused) setOptionsShow(false);
  }, [isFocused]);

  useEffect(() => {
    if (optionsShow) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }

    return () => {
      fadeAnim.setValue(0);
    };
  }, [optionsShow, fadeAnim]);

  return (
    <TouchableOpacity
      key={props.item.id}
      testID={props.testID}
      onPress={() => setOptionsShow(!optionsShow)}
      className={`border-l-4 text-black mt-5 mx-5 bg-white p-6 pt-3 pb-4 rounded-lg shadow-lg ${renderBorderType(
        props.item.type
      )}`}
    >
      <Text className="text-black text-xl mb-1">{props.item.name}</Text>
      <View className="flex flex-row items-center mb-1">
        <FontAwesome5 name="money-bill-wave" size={16} color="black" />
        <Text className="ml-2 text-black">
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
        <MaterialIcons name="calendar-month" size={22} color="black" />
        <Text className="ml-2 text-black text-base">{props.item.date}</Text>
      </View>
      <Animated.View
        className="flex flex-row items-center z-20 absolute top-0 right-0 bottom-0"
        style={{ opacity: fadeAnim }}
        pointerEvents={!optionsShow ? "none" : "auto"}
      >
        <Button
          className="z-20 w-14 h-14 my-5 rounded-full border-2 border-gray-200 bg-white"
          onPress={props.edit}
          label={`Editar registro ${props.item.name}`}
          icon={<MaterialIcons name="edit" size={22} color="black" />}
        />
        <Button
          className="z-20 w-14 h-14 m-5 rounded-full border-2 border-red-200 bg-white"
          onPress={props.remove}
          label={`Excluir registro ${props.item.name}`}
          icon={
            <MaterialCommunityIcons
              name="trash-can-outline"
              size={22}
              color="red"
            />
          }
        />
      </Animated.View>
    </TouchableOpacity>
  );
}
