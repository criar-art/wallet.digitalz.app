import React, { useState } from "react";
import { Text, View } from "react-native";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import { renderBorderType } from "../../utils";
import { Props } from "./types";
import Button from "../Button";

import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { RootState } from '../../store';
import { setRegister } from "../../store/commonSlice";

export default function ListRegisters(props: Props) {
  const dispatch = useAppDispatch();
  const store = useAppSelector((state: RootState) => state);
  const common = store.commonState;

  function remove(target: string) {
    const filter = common.registers.filter(({ id }) => id !== target);
    dispatch(setRegister(filter))
  }

  return (
    <View testID="list-register">
      {common.registers.length ? (
        common.registers.map((item: any) => (
          <View
            key={item.id}
            className={`border-l-4 text-black mt-5 bg-white p-4 rounded-lg shadow-lg ${renderBorderType(
              item.type
            )}`}
          >
            <Button
              backgroundColor="bg-gray-100"
              className="scale-75 z-20 absolute top-0 right-0 m-2 rounded-full p-2 w-10"
              onPress={() => remove(item.id)}
              icon={
                <MaterialCommunityIcons
                  name="trash-can-outline"
                  size={24}
                  color="red"
                />
              }
            />
            <Text className="text-black">Tipo: {item.type}</Text>
            <Text className="text-black">Nome: {item.name}</Text>
            <Text className="text-black">Valor: {item.value}</Text>
            <View className="flex flex-row items-center">
              <MaterialIcons name="calendar-month" size={22} color="black" />
              <Text className="ml-2 text-black">Data: {item.date}</Text>
            </View>
          </View>
        ))
      ) : (
        <View className="py-5">
          <Text className="text-black">Nenhum registro cadastrado.</Text>
        </View>
      )}
    </View>
  );
}
