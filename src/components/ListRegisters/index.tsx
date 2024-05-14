import React, { useEffect, useState } from "react";
import { FlatList } from "react-native";

import { Props } from "./types";
import FadeView from "../FadeView";
import ItemList from "../ItemList";
import ItemTotal from "../ItemTotal";
import EmptyRegisters from "../EmptyRegisters";

import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { RootState } from "../../store";
import {
  setModalRegister,
  setModalDelete,
  setRegisterData,
} from "../../store/commonSlice";

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
                <ItemTotal
                  type="entry"
                  value={entryTotal}
                  eyeStatus={common.eyeStatus}
                />
              )}
              {props.type == "investiment" && getEmpty("investiment") && (
                <ItemTotal
                  type="investiment"
                  value={investTotal}
                  eyeStatus={common.eyeStatus}
                />
              )}
              {props.type == "expense" && getEmpty("expense") && (
                <ItemTotal
                  type="expense"
                  value={expensesTotal}
                  eyeStatus={common.eyeStatus}
                />
              )}
            </>
          )}
          stickyHeaderIndices={[0]}
        />
      ) : (
        <EmptyRegisters />
      )}
    </FadeView>
  );
}
