import { useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { setModalBudget, setModalBudgetTransaction } from "@store/modalsSlice";
import { RootState } from "@store";
import { NavigationProp, ParamListBase, useRoute, useNavigation } from "@react-navigation/native";
import { setBudgetData, setBudgetTransactionData } from "@store/commonSlice";
import { setDeleteBudget, setDeleteTransaction } from "@store/budgetSlice";
import ItemTransaction from "./Item";
import ItemBudget from "../Budget/Item";
import useBudgetCalculations, { BudgetCalculation } from "@hooks/useBudgetCalculations";
import useOrientation from "@hooks/useOrientation";
import useIsTablet from "@hooks/useIsTablet";
import { useTranslation } from "react-i18next";
import useScrollMenuVisible from "@hooks/useScrollMenuVisible";

export default function BudgetScreen() {
  const navigation: NavigationProp<ParamListBase> = useNavigation();
  const route: any = useRoute();
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const common = useAppSelector((state: RootState) => state.commonState);
  const idBudget = route.params?.id;
  const { budgetCalculations } = useBudgetCalculations(idBudget);
  const [optionsShow, setOptionsShow] = useState(null);
  const { landscape } = useOrientation();
  const isTablet = useIsTablet();
  const { handleScroll } = useScrollMenuVisible();

  function handlePressOptionsShow(id: any) {
    setOptionsShow((prevActiveItem: any) =>
      prevActiveItem === id ? null : id
    );
  }

  function edit(target: any, budget?: string) {
    if(budget) {
      dispatch(setModalBudget('edit'));
      dispatch(setBudgetData({ ...target }));
    } else {
      dispatch(setModalBudgetTransaction({ id: route.params.id, type: 'edit' }));
      dispatch(setBudgetTransactionData({ ...target }));
    }
  }

  function remove(id: string, budget?: string) {
    if(budget) {
      dispatch(setDeleteBudget(route.params.id));
      navigation.goBack();
    } else {
      dispatch(setDeleteTransaction({ idBudget: route.params.id, idTransaction: id } as any));
    }
  }

  function isBudgetCalculation(calculation: BudgetCalculation | BudgetCalculation[] | null): calculation is BudgetCalculation {
    return (calculation as BudgetCalculation)?.id !== undefined;
  }

  return (
    <View testID="transaction-screen" className={`flex-1 ${landscape ? "flex-row" : "flex-col"}`}>
      {isBudgetCalculation(budgetCalculations) && (
        <>
          <View className={`${landscape ? "flex-1 pb-5" : "min-h-[240px] pr-5"}`}>
            <ItemBudget
              twClass={`flex flex-col mt-6 shadow-lg ${
                landscape || isTablet ? "flex-1 mt-4 ml-6" : "mx-5"
              }`}
              key={budgetCalculations.id}
              item={budgetCalculations}
              eyeStatus={common.eyeStatus}
              edit={() => edit(budgetCalculations, 'budget')}
              remove={() => remove(budgetCalculations.id, 'budget')}
              optionsShow={optionsShow}
              setOptionsShow={setOptionsShow}
              handlePressOptionsShow={handlePressOptionsShow}
            />
          </View>
          <View className="flex-1">
            {budgetCalculations?.transactions.length ? (
              <>
                {!landscape && (
                  <Text className="p-2 m-3 text-black dark:text-white text-base">
                    {t("common.moneyRegister")}
                  </Text>
                )}
                <ScrollView
                  className={`flex flex-1 ${landscape ? "pt-4" : ""}`}
                  scrollEventThrottle={16}
                  onScroll={handleScroll}
                  contentContainerStyle={{
                    paddingBottom: landscape ? 20 : 60,
                  }}
                >
                  {budgetCalculations?.transactions.map((item: any) => (
                    <ItemTransaction
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
              </>
            ) : (
              <Text className="p-4 text-black dark:text-white text-base text-center">
                {t("common.createFirstMoneyRegister")}
              </Text>
            )}
          </View>
        </>
      )}
    </View>
  );
}
