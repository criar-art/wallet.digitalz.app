import { ScrollView, View } from "react-native";
import { useAppSelector } from "@store/hooks";
import { RootState } from "@store";
import Item from "./Item";
import Empty from "./Empty";
import useBudgetCalculations from '@hooks/useBudgetCalculations';
import useOrientation from "@hooks/useOrientation";
import useIsTablet from "@hooks/useIsTablet";
import { BudgetCalculation } from "./types";
import useScrollMenuVisible from "@hooks/useScrollMenuVisible";

export default function BudgetScreen() {
  const common = useAppSelector((state: RootState) => state.commonState);
  const { budgetCalculations } = useBudgetCalculations();
  const { landscape } = useOrientation();
  const isTablet = useIsTablet();
  const { handleScroll } = useScrollMenuVisible();

  function isBudgetArray(
    calculations: BudgetCalculation[] | BudgetCalculation | null
  ): calculations is BudgetCalculation[] {
    return Array.isArray(calculations);
  }

  return (
    <View testID="budget-screen" className="flex-1 justify-between flex-col">
      <ScrollView
        className="flex flex-1"
        onScroll={handleScroll}
        scrollEventThrottle={16}
        contentContainerStyle={{
          paddingBottom: landscape ? 70 : 100,
        }}
      >
        {isBudgetArray(budgetCalculations) ? (
          <View className="flex flex-row flex-wrap justify-center pt-1"
          style={{
            paddingLeft: landscape || isTablet ? 15 : 0,
            paddingRight: landscape || isTablet ? 15 : 0,
          }}>
            {budgetCalculations.length > 0 ?
              budgetCalculations.map((item: BudgetCalculation) => (
                <View key={item.id} className={`text-center ${
                  landscape || isTablet ? "w-1/2" : "w-full"
                }`}>
                  <Item
                    twClass={`flex flex-1 flex-col mt-6 shadow-lg ${
                      landscape || isTablet ? "mx-3" : "mx-5"
                    }`}
                    key={item.id}
                    item={item}
                    eyeStatus={common.eyeStatus}
                  />
                </View>
              )) : <Empty />}
          </View>
        ) : null}
      </ScrollView>
    </View>
  );
}
