import { useEffect, useState } from "react";
import { TouchableOpacity, Text, View, ScrollView } from "react-native";
import { NumericFormat } from "react-number-format";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import {
  useNavigation,
  ParamListBase,
  NavigationProp,
} from "@react-navigation/native";
import { useColorScheme } from "nativewind";
import {
  renderBorderType,
  types,
  capitalize,
  checkTypeTouchable,
  parseMoney,
} from "../../utils";
import useOrientation from "../../hooks/useOrientation";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { RootState } from "../../store";
import { setModalInfo } from "../../store/commonSlice";
import FadeView from "../FadeView";
import { Props } from "./types";

export default function PanelsRegisters(props: Props) {
  const orientation = useOrientation();
  const dispatch = useAppDispatch();
  const navigation: NavigationProp<ParamListBase> = useNavigation();
  const common = useAppSelector((state: RootState) => state.commonState);
  const { colorScheme } = useColorScheme();

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
  const getPatrimonyTotal = () =>
    getLiquidTotal() > 0
      ? getTotal("investiment") + getLiquidTotal()
      : getTotal("investiment");
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
        checkTypeTouchable(props.type)
          ? navigation.navigate(capitalize(props.type))
          : dispatch(setModalInfo(props.type))
      }
      className={`flex flex-row justify-between items-center border-l-4 mb-5 bg-white dark:bg-zinc-800 p-6 rounded-lg shadow-lg ${renderBorderType(
        props.type
      )} ${
        props.value < 0 ? "bg-red-100 dark:bg-red-900 border-red-600" : ""
      } ${
        orientation === 4 || orientation === 3
          ? "flex-auto basis-1/3 mr-2 ml-3"
          : "w-full"
      }`}
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
            <Text className="text-black dark:text-white">
              Total {types[props.type]}
            </Text>
            <Text className="text-black dark:text-white font-bold text-xl">
              {parseMoney(value, common.eyeStatus)}
            </Text>
          </View>
        )}
      />
      {props.type == "liquid" && props.value < 0 && (
        <View
          className={`bg-red-600 p-2 py-1 absolute -top-3 left-2 rounded-full flex flex-nowrap`}
        >
          <Text className="text-white text-xs">Carteira Negativa</Text>
        </View>
      )}
      {!!getCountRegisters(props.type) && (
        <View
          className={`bg-black dark:bg-white p-2 py-1 absolute -top-3 left-2 rounded-full flex flex-nowrap`}
        >
          <Text className="text-white dark:text-black text-xs">
            {getCountRegisters(props.type)} Registro
            {`${getCountRegisters(props.type) > 1 ? "s" : ""}`}
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
      {checkTypeTouchable(props.type) && (
        <MaterialIcons
          name="navigate-next"
          size={30}
          color={colorScheme === "dark" ? "white" : "black"}
        />
      )}
    </TouchableOpacity>
  );

  return (
    <FadeView testID="panels-registers">
      <ScrollView
        className="p-4"
        contentContainerStyle={{
          paddingBottom: orientation === 4 || orientation === 3 ? 80 : 20,
          paddingTop: orientation === 4 || orientation === 3 ? 15 : 4,
        }}
      >
        <View className="flex flex-row flex-wrap">
          {(orientation === 1 || orientation === 2) && (
            <ItemList type="patrimony" value={patrimonyTotal} />
          )}
          <ItemList type="liquid" value={liquidTotal} />
          <ItemList type="expense" value={expensesTotal} />
          <ItemList type="entry" value={entryTotal} />
          <ItemList type="investiment" value={investTotal} />
        </View>
      </ScrollView>
    </FadeView>
  );
}
