import { ScrollView, View } from "react-native";
import useOrientation from "@hooks/useOrientation";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { setModalBudget } from "@store/modalsSlice";
import { RootState } from "@store";
import { setBudgetData } from "@store/commonSlice";
import { setDeleteBudget } from "@store/budgetSlice";
import utils from "@utils";
import { useTranslation } from "react-i18next";
import { useColorScheme } from "nativewind";
import Item from "./Item";
import { useState } from "react";

export default function BudgetScreen() {

  const dispatch = useAppDispatch();
  const { landscape } = useOrientation();

  const { colorScheme } = useColorScheme();
  const common = useAppSelector((state: RootState) => state.commonState);
  const budgets = useAppSelector(
    (state: RootState) => state.budgetState.budgets
  );

  const [optionsShow, setOptionsShow] = useState(null);

  function handlePressOptionsShow(id: any) {
    setOptionsShow((prevActiveItem: any) =>
      prevActiveItem === id ? null : id
    );
  }

  function edit(target: any) {
    dispatch(setModalBudget('edit'));
    dispatch(setBudgetData({ ...target }));
  }

  function remove(id: any) {
    dispatch(setDeleteBudget(id));
  }

  return (
    <View testID="home-screen" className="flex-1 justify-between flex-col">
      <ScrollView
        className="flex flex-1"
        scrollEventThrottle={16}
        contentContainerStyle={{
          paddingBottom: 10,
        }}
      >
        {budgets.map((item: any) => (
          <Item
           key={item.id}
            item={item}
            eyeStatus={common.eyeStatus}
            edit={() => edit(item)}
            remove={() => remove(item.id)}
            optionsShow={optionsShow}
            setOptionsShow={setOptionsShow}
            handlePressOptionsShow={handlePressOptionsShow}
          />
        ))}
      </ScrollView>
    </View>
  );
}
