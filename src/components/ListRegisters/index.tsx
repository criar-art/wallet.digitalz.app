import React from "react";
import { FlatList, Text, View } from "react-native";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import { NumericFormat } from "react-number-format";
import { renderBorderType, types } from "../../utils";
import { Props } from "./types";
import Button from "../Button";

import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { RootState } from "../../store";
import { setModalRegister, setRegister } from "../../store/commonSlice";

export default function ListRegisters(props: Props) {
  const dispatch = useAppDispatch();
  const common = useAppSelector((state: RootState) => state.commonState);

  // function edit(target: string) {
  //   const itemIndex = common.registers.findIndex(({ id }) => id == target)
  //   dispatch(setModalRegister(true));
  // }

  function remove(target: string) {
    const filter = common.registers.filter(({ id }) => id !== target);
    dispatch(setRegister(filter));
  }

  const ItemList = ({ item }: any) => (
    <View
      key={item.id}
      className={`border-l-4 text-black mt-5 bg-white p-4 rounded-lg shadow-lg ${renderBorderType(
        item.type
      )}`}
    >
      {/* <Button
        backgroundColor="bg-gray-100"
        className="scale-75 z-20 absolute top-0 right-0 m-2 rounded-full p-2 w-10"
        onPress={() => edit(item.id)}
        icon={
          <MaterialIcons
            name="edit"
            size={24}
            color="black"
          />
        }
      /> */}
      <Button
        backgroundColor="bg-gray-100"
        className="scale-75 z-20 absolute bottom-0 right-0 m-2 rounded-full p-2 w-10"
        onPress={() => remove(item.id)}
        icon={
          <MaterialCommunityIcons
            name="trash-can-outline"
            size={24}
            color="red"
          />
        }
      />
      <Text className="mb-2 text-black">
        {types[item.type]} {item.name}
      </Text>
      <Text className="mb-2 text-black">
        Valor:{" "}
        <NumericFormat
          value={item.value}
          displayType={"text"}
          thousandSeparator={"."}
          decimalSeparator={","}
          decimalScale={2}
          fixedDecimalScale
          prefix={"R$ "}
          renderText={(value: string) => <Text>{value}</Text>}
        />
      </Text>
      <View className="flex flex-row items-center">
        <MaterialIcons name="calendar-month" size={22} color="black" />
        <Text className="ml-2 text-black">Data: {item.date}</Text>
      </View>
    </View>
  );

  return (
    <View testID="list-register">
      {common.registers.filter((item: any) => item.type == props.type)
        .length ? (
        <FlatList
          data={common.registers.filter((item: any) => item.type == props.type)}
          renderItem={ItemList}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      ) : (
        <Text className="text-black text-center p-5">Nenhum registro cadastrado.</Text>
      )}
    </View>
  );
}
