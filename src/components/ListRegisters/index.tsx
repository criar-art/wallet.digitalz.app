import React, { useState } from "react";
import { Text, View } from "react-native";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import * as SecureStore from "expo-secure-store";
import { renderBorderType } from "../../utils";
import { Props } from "./types";
import Button from "../Button";

export default function ListRegisters(props: Props) {
  const [result, setResult] = useState([]);

  async function save(key: string, value: any) {
    await SecureStore.setItemAsync(key, value);
  }

  async function getValueFor(key: string) {
    let result = await SecureStore.getItemAsync(key);

    if (result) {
      setResult(JSON.parse(result));
      console.log("🔐 Here's your value 🔐 \n" + result);
    } else {
      console.log("No values stored under that key.");
    }
  }

  function remove(target: string) {
    const filter = result.filter(({ id }) => id !== target);
    save("wallet", JSON.stringify(filter));
    getValueFor("wallet");
  }
  return (
    <View testID="list-register">
      {result.length ? (
        result.map((item: any) => (
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
