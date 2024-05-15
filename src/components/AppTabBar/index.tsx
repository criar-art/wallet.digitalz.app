import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import { useAppDispatch } from "../../store/hooks";
import { setModalRegister } from "../../store/commonSlice";
import Button from "../../components/Button";

import { Props } from "./types";

export default function AppTabBar(props: Props) {
  const dispatch = useAppDispatch();

  return (
    <View className="flex flex-row">
      <Button
        pressableButton
        label="Criar novo registro"
        textColor="text-white"
        className="z-10 rounded-full absolute bottom-[60] left-1/2 -translate-x-7 w-18 h-18 border-2 border-white bg-green-600"
        onPress={() => dispatch(setModalRegister("register"))}
        icon={<MaterialIcons name="add" size={35} color="white" />}
      />
      {props.state.routes.map((route: any, index: number) => {
        const { options } = props.descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = props.state.index === index;

        const onPress = () => {
          const event = props.navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            props.navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          props.navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            key={index}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            className="flex flex-1 items-center py-5 border-y-2 border-l-2 border-gray-200"
            style={{ backgroundColor: !isFocused ? "white" : "#eee" }}
          >
            <View
              className={`flex items-center ${
                !isFocused ? "scale-100" : "scale-125"
              }`}
            >
              {<options.tabBarIcon size={28} color="black" />}
            </View>
            <Text className="text-black text-xs">{label}</Text>
            {!!options.tabBarBadge && (
              <Text className="scale-[.85] text-xs bg-red-400 font-bold text-white px-2 py-1 absolute -top-3 rounded-full">
                {options.tabBarBadge}
              </Text>
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
