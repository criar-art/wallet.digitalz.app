import React, { useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";
import { NumericFormat } from "react-number-format";
import { renderBorderType, types } from "../../utils";
import { Props } from "./types";
import FadeView from "../FadeView";
import ItemList from "../ItemList";

import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { RootState } from "../../store";
import {
  setModalRegister,
  setModalDelete,
  setRegisterData,
} from "../../store/commonSlice";
import { parseMoney } from "../../utils";

export default function ListRegisters(props: Props) {
  const dispatch = useAppDispatch();
  const common = useAppSelector((state: RootState) => state.commonState);
  const [entryTotal, setEntryTotal] = useState(getTotal("entry"));
  const [expensesTotal, setExpensesTotal] = useState(getTotal("expense"));
  const [investTotal, setInvestTotal] = useState(getTotal("investiment"));

  function edit(target: any) {
    dispatch(setModalRegister("edit"));
    dispatch(setRegisterData({ ...target }));
  }

  function remove(target: string) {
    dispatch(setModalDelete(target));
  }

  function getTotal(type: string) {
    return common.registers
      .filter((item: any) => item.type == type)
      .reduce((a: number, { value }: any) => {
        return Number(value) + Number(a);
      }, 0);
  }

  function getEmpty(type: string) {
    return common.registers.filter((item: any) => item.type == type).length > 1;
  }

  useEffect(() => {
    setEntryTotal(getTotal("entry"));
    setExpensesTotal(getTotal("expense"));
    setInvestTotal(getTotal("investiment"));
  }, [common.registers]);

  const ItemListFull = (props: any) => (
    <View
      className={`flex flex-row justify-between items-center border-b-2 text-black bg-white pt-2 pb-4 px-8 shadow-lg ${renderBorderType(
        props.type
      )}`}
    >
      <NumericFormat
        value={props.value}
        displayType={"text"}
        thousandSeparator={"."}
        decimalSeparator={","}
        decimalScale={2}
        fixedDecimalScale
        prefix={"R$ "}
        renderText={(value: string) => (
          <View className="flex">
            <Text className="text-black">Total {types[props.type]}</Text>
            <Text className="font-bold">
              {parseMoney(value, common.eyeStatus)}
            </Text>
          </View>
        )}
      />
    </View>
  );

  return (
    <FadeView testID="list-register">
      {common.registers.filter((item: any) => item.type == props.type)
        .length ? (
        <FlatList
          data={common.registers.filter((item: any) => item.type == props.type)}
          renderItem={({ item }: any) => (
            <ItemList
              item={item}
              eyeStatus={common.eyeStatus}
              edit={() => edit(item)}
              remove={() => remove(item.id)}
            />
          )}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingBottom: 20 }}
          ListHeaderComponent={() => (
            <>
              {props.type == "entry" && getEmpty("entry") && (
                <ItemListFull type="entry" value={entryTotal} />
              )}
              {props.type == "investiment" && getEmpty("investiment") && (
                <ItemListFull type="investiment" value={investTotal} />
              )}
              {props.type == "expense" && getEmpty("expense") && (
                <ItemListFull type="expense" value={expensesTotal} />
              )}
            </>
          )}
          stickyHeaderIndices={[0]}
        />
      ) : (
        <Text className="text-black text-center p-5">
          Nenhum registro cadastrado.
        </Text>
      )}
    </FadeView>
  );
}
