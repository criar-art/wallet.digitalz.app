import React, { useEffect, useRef, useState } from "react";
import { Text, View, Animated, TouchableOpacity } from "react-native";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import { NumericFormat } from "react-number-format";
import { renderBorderType } from "../../utils";
import { Props } from "./types";
import Button from "../Button";

import { parseMoney } from "../../utils";

export default function ItemList(props: Props) {
  const [optionsShow, setOptionsShow] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;

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
      testID={props.testID}
      onPress={() => setOptionsShow(!optionsShow)}
    >
      <View
        key={props.item.id}
        className={`border-l-4 text-black mt-5 mx-5 bg-white p-4 rounded-lg shadow-lg ${renderBorderType(
          props.item.type
        )}`}
      >
        <Animated.View
          className="flex flex-row z-20 absolute top-0 right-0 bottom-0"
          style={{ opacity: fadeAnim }}
          pointerEvents={!optionsShow ? "none" : "auto"}
        >
          <Button
            backgroundColor="bg-gray-100"
            className="z-20 w-16 my-5 rounded-full"
            onPress={props.edit}
            label={`Editar registro ${props.item.name}`}
            icon={<MaterialIcons name="edit" size={22} color="black" />}
          />
          <Button
            backgroundColor="bg-gray-100"
            className="z-20 w-16 m-5 rounded-full"
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
        <Text className="mb-2 text-black">{props.item.name}</Text>
        <Text className="mb-2 text-black">
          Valor:{" "}
          <NumericFormat
            value={props.item.value}
            displayType={"text"}
            thousandSeparator={"."}
            decimalSeparator={","}
            decimalScale={2}
            fixedDecimalScale
            prefix={"R$ "}
            renderText={(value: string) => (
              <Text>{parseMoney(value, props.eyeStatus)}</Text>
            )}
          />
        </Text>
        <View className="flex flex-row items-center">
          <MaterialIcons name="calendar-month" size={22} color="black" />
          <Text className="ml-2 text-black">Data: {props.item.date}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
