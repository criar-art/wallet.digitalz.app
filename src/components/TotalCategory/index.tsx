import { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";
import ItemTotal from "../ItemTotal";
import { useAppSelector } from "../../store/hooks";
import { RootState } from "../../store";
import { Props } from "./types";

export default function TotalCategory(props: Props) {
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

  const common = useAppSelector((state: RootState) => state.commonState);
  const [patrimonyTotal, setPatrimonyTotal] = useState(getPatrimonyTotal());
  const [entryTotal, setEntryTotal] = useState(getTotal("entry"));
  const [expensesTotal, setExpensesTotal] = useState(getTotal("expense"));
  const [investTotal, setInvestTotal] = useState(getTotal("investiment"));

  useEffect(() => {
    setPatrimonyTotal(getPatrimonyTotal());
    setEntryTotal(getTotal("entry"));
    setExpensesTotal(getTotal("expense"));
    setInvestTotal(getTotal("investiment"));
  }, [common.registers]);

  return (
    <TouchableOpacity
      testID="total-category"
      className={props.className}
      onPress={() => props.onPress()}
    >
      {props.type == "patrimony" && (
        <ItemTotal
          type={props.type}
          value={patrimonyTotal}
          eyeStatus={common.eyeStatus}
          orientation={props.orientation}
        />
      )}
      {props.type == "entry" && (
        <ItemTotal
          type={props.type}
          value={entryTotal}
          eyeStatus={common.eyeStatus}
          orientation={props.orientation}
        />
      )}
      {props.type == "investiment" && (
        <ItemTotal
          type={props.type}
          value={investTotal}
          eyeStatus={common.eyeStatus}
          orientation={props.orientation}
        />
      )}
      {props.type == "expense" && (
        <ItemTotal
          type={props.type}
          value={expensesTotal}
          eyeStatus={common.eyeStatus}
          orientation={props.orientation}
        />
      )}
    </TouchableOpacity>
  );
}
