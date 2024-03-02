import React, { useEffect, useState } from "react";
import { TouchableOpacity, Text, View } from "react-native";
import { NumericFormat } from "react-number-format";
import { MaterialIcons, MaterialCommunityIcons  } from "@expo/vector-icons";
import {
  useNavigation,
  ParamListBase,
  NavigationProp,
} from "@react-navigation/native";

import {
  renderBorderType,
  types,
  capitalize,
  ckeckTypeTouchable,
} from "../../utils";
import { Props } from "./types";
import { useAppSelector } from "../../store/hooks";
import { RootState } from "../../store";

export default function PanelsRegisters(props: Props) {
  const navigation: NavigationProp<ParamListBase> = useNavigation();
  const common = useAppSelector((state: RootState) => state.commonState);

  const getTotal = (type: string) =>
    common.registers
      .filter((item: any) => item.type == type)
      .reduce((a: number, { value }: any) => {
        return Number(value) + Number(a);
      }, 0);

  const getLiquidTotal = () => getTotal("entry") - getTotal("expense");
  const getPatrimonyTotal = () => getLiquidTotal() + getTotal("investiment");
  const [liquidTotal, setLiquidTotal] = useState(getLiquidTotal());
  const [patrimonyTotal, setPatrimonyTotal] = useState(getPatrimonyTotal());
  const [entryTotal, setEntryTotal] = useState(getTotal("entry"));
  const [expensesTotal, setExpensesTotal] = useState(getTotal("expense"));
  const [investTotal, setInvestTotal] = useState(getTotal("investiment"));

  useEffect(() => {
    setLiquidTotal(getLiquidTotal());
    setPatrimonyTotal(getPatrimonyTotal());
    setEntryTotal(getTotal("entry"));
    setExpensesTotal(getTotal("expense"));
    setInvestTotal(getTotal("investiment"));
  }, [common.registers]);

  const ItemList = (props: any) => (
    <TouchableOpacity
      onPress={() =>
        ckeckTypeTouchable(props.type)
          ? navigation.navigate(capitalize(props.type))
          : null
      }
      activeOpacity={ckeckTypeTouchable(props.type) ? 0.5 : 1}
      className={`flex flex-row justify-between items-center border-l-4 text-black mt-5 bg-white p-4 rounded-lg shadow-lg ${renderBorderType(
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
            <Text className="font-bold">{value}</Text>
          </View>
        )}
      />
      {props.type == 'liquid' && (
        <MaterialIcons name="attach-money" size={30} color="#aaa" />
      )}
      {props.type == 'patrimony' && (
        <MaterialCommunityIcons name="gold" size={30} color="#aaa" />
      )}
      {ckeckTypeTouchable(props.type) && (
        <MaterialIcons name="navigate-next" size={30} color="black" />
      )}
    </TouchableOpacity>
  );

  return (
    <View testID="panels-registers">
      {common.registers.length ? (
        <>
          {liquidTotal > 0 && <ItemList type="liquid" value={liquidTotal} />}
          {patrimonyTotal > 0 && (
            <ItemList type="patrimony" value={patrimonyTotal} />
          )}
          {entryTotal > 0 && <ItemList type="entry" value={entryTotal} />}
          {investTotal > 0 && (
            <ItemList type="investiment" value={investTotal} />
          )}
          {expensesTotal > 0 && (
            <ItemList type="expense" value={expensesTotal} />
          )}
        </>
      ) : (
        <Text className="text-black mt-5">Nenhum registro cadastrado.</Text>
      )}
    </View>
  );
}
