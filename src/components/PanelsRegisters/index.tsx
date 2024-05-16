import { useEffect, useState } from "react";
import { TouchableOpacity, Text, View, ScrollView } from "react-native";
import { NumericFormat } from "react-number-format";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
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
  parseMoney,
} from "../../utils";
import { useAppSelector } from "../../store/hooks";
import { RootState } from "../../store";
import FadeView from "../FadeView";
import EmptyRegisters from "../EmptyRegisters";
import { Props } from "./types";

export default function PanelsRegisters(props: Props) {
  const navigation: NavigationProp<ParamListBase> = useNavigation();
  const common = useAppSelector((state: RootState) => state.commonState);

  const getCountRegisters = (type: string) => {
    return common.registers.filter((item: any) => item.type == type).length;
  };

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
      className={`flex flex-row justify-between items-center border-l-4 text-black mb-5 bg-white p-6 rounded-lg shadow-lg ${renderBorderType(
        props.type
      )} ${props.value < 0 ? "bg-red-100 border-red-600" : ""}`}
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
            <Text className="font-bold text-xl">
              {parseMoney(value, common.eyeStatus)}
            </Text>
          </View>
        )}
      />
      {!!getCountRegisters(props.type) && (
        <View
          className={`bg-black p-2 py-1 absolute -bottom-3 left-2 rounded-full flex flex-nowrap`}
        >
          <Text className="text-white text-xs uppercase">
            Quantidade {getCountRegisters(props.type)}
          </Text>
        </View>
      )}
      {props.type == "liquid" && (
        <MaterialIcons
          name="attach-money"
          size={30}
          color={props.value < 0 ? "#f00" : "#aaa"}
        />
      )}
      {props.type == "patrimony" && (
        <MaterialCommunityIcons name="gold" size={30} color="#aaa" />
      )}
      {ckeckTypeTouchable(props.type) && (
        <MaterialIcons name="navigate-next" size={30} color="black" />
      )}
    </TouchableOpacity>
  );

  return (
    <FadeView testID="panels-registers">
      {common.registers.length ? (
        <ScrollView
          className="p-5"
          contentContainerStyle={{
            paddingBottom: 20,
          }}
        >
          {!!liquidTotal && <ItemList type="liquid" value={liquidTotal} />}
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
        </ScrollView>
      ) : (
        <EmptyRegisters />
      )}
    </FadeView>
  );
}
