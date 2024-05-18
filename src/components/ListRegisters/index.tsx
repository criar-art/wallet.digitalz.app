import { useEffect, useState } from "react";
import { FlatList, View } from "react-native";
import FadeView from "../FadeView";
import ItemList from "../ItemList";
import ItemTotal from "../ItemTotal";
import EmptyRegisters from "../EmptyRegisters";
import useOrientation from "../../hooks/useOrientation";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { RootState } from "../../store";
import {
  setModalRegister,
  setModalDelete,
  setRegisterData,
} from "../../store/commonSlice";
import { Props } from "./types";

export default function ListRegisters(props: Props) {
  const orientation = useOrientation();
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

  const filteredData = common.registers.filter(
    (item: any) => item.type == props.type
  );
  const isOdd = filteredData.length % 2 !== 0;

  return (
    <FadeView testID="list-register">
      {common.registers.filter((item: any) => item.type == props.type)
        .length ? (
        <FlatList
          data={common.registers.filter((item: any) => item.type == props.type)}
          numColumns={orientation === 1 || orientation === 2 ? 1 : 2}
          renderItem={({ item, index }: any) => {
            const isLastItem = isOdd && index === filteredData.length - 1;
            return (
              <View
                className={[
                  "flex",
                  orientation === 4 || orientation === 3 ? "w-1/2" : "w-full",
                  (orientation === 4 || orientation === 3) && isLastItem
                    ? "w-1/2"
                    : "",
                ].join(" ")}
              >
                <ItemList
                  key={item.id}
                  item={item}
                  orientation={orientation}
                  eyeStatus={common.eyeStatus}
                  edit={() => edit(item)}
                  remove={() => remove(item.id)}
                />
              </View>
            );
          }}
          keyExtractor={(item) => item.id}
          key={orientation}
          contentContainerStyle={{ paddingBottom: 20 }}
          columnWrapperStyle={
            orientation !== 1 && orientation !== 2
              ? {
                  flex: 1,
                  flexWrap: "nowrap",
                  paddingLeft: 30,
                  paddingRight: 30,
                }
              : null
          }
          ListHeaderComponent={() => (
            <>
              {props.type == "entry" && getEmpty("entry") && (
                <ItemTotal
                  type="entry"
                  value={entryTotal}
                  eyeStatus={common.eyeStatus}
                  orientation={orientation}
                />
              )}
              {props.type == "investiment" && getEmpty("investiment") && (
                <ItemTotal
                  type="investiment"
                  value={investTotal}
                  eyeStatus={common.eyeStatus}
                  orientation={orientation}
                />
              )}
              {props.type == "expense" && getEmpty("expense") && (
                <ItemTotal
                  type="expense"
                  value={expensesTotal}
                  eyeStatus={common.eyeStatus}
                  orientation={orientation}
                />
              )}
            </>
          )}
          stickyHeaderIndices={
            orientation === 4 || orientation === 3 ? undefined : [0]
          }
        />
      ) : (
        <EmptyRegisters />
      )}
    </FadeView>
  );
}
