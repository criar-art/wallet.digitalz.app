import React, { useEffect, useState } from "react";
import { Pressable, Text, View } from "react-native";
import { NumericFormat } from "react-number-format";
import {
  useNavigation,
  ParamListBase,
  NavigationProp,
} from "@react-navigation/native";

import { renderBorderType, types, capitalize } from "../../utils";
import { Props } from "./types";
import { useAppSelector } from "../../store/hooks";
import { RootState } from "../../store";

export default function ListRegisters(props: Props) {
  const navigation: NavigationProp<ParamListBase> = useNavigation();
  const store = useAppSelector((state: RootState) => state);
  const common = store.commonState;

  const getTotal = (type: string) =>
    common.registers
      .filter((item: any) => item.type == type)
      .reduce((a: number, { value }: any) => {
        return Number(value) + Number(a);
      }, 0);

  const [expensesTotal, setExpensesTotal] = useState(getTotal("expense"));
  const [investTotal, setInvestTotal] = useState(getTotal("investiment"));
  const [entryTotal, setEntryTotal] = useState(getTotal("entry"));

  useEffect(() => {
    setExpensesTotal(getTotal("expense"));
    setEntryTotal(getTotal("investiment"));
    setInvestTotal(getTotal("entry"));
  }, [common.registers]);

  const ItemList = (props: any) => (
    <Pressable
      onPress={() => navigation.navigate(capitalize(props.type))}
      className={`border-l-4 text-black mt-5 bg-white p-4 rounded-lg shadow-lg ${renderBorderType(
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
          <Text className="text-black">
            Total {types[props.type]}:{" "}
            <Text className="font-bold">{value}</Text>
          </Text>
        )}
      />
    </Pressable>
  );

  return (
    <View testID="list-register">
      {common.registers.length ? (
        <>
          {entryTotal > 0 && <ItemList type="entry" value={entryTotal} />}
          {investTotal > 0 && <ItemList type="investiment" value={investTotal} />}
          {expensesTotal > 0 && <ItemList type="expense" value={expensesTotal} />}
        </>
      ) : (
        <Text className="text-black mt-5">Nenhum registro cadastrado.</Text>
      )}
    </View>
  );
}
