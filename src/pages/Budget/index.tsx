import { ScrollView, View, Text } from "react-native";
import { useAppSelector } from "@store/hooks";
import { RootState } from "@store";
import Item from "./Item";
import useBudgetCalculations from '@hooks/useBudgetCalculations'; // Adjust the path as necessary
import { Transcation } from "@store/budgetSlice/types";

type BudgetCalculation = {
  totalTransactionsValue: number;
  remainingBudget: number;
  isOverBudget: boolean;
  id: string;
  name: string;
  description: string;
  value: number;
  date_end: Date | null;
  date_create: Date | null;
  transactions: Transcation[];
};

export default function BudgetScreen() {
  const common = useAppSelector((state: RootState) => state.commonState);
  const budgetCalculations = useBudgetCalculations();

  // Type guard to check if budgetCalculations is an array
  function isBudgetArray(
    calculations: BudgetCalculation[] | BudgetCalculation | null
  ): calculations is BudgetCalculation[] {
    return Array.isArray(calculations);
  }

  return (
    <View testID="home-screen" className="flex-1 justify-between flex-col">
      <ScrollView
        className="flex flex-1"
        scrollEventThrottle={16}
        contentContainerStyle={{
          paddingBottom: 100,
        }}
      >
        {budgetCalculations ? (
          isBudgetArray(budgetCalculations) ? (
            budgetCalculations.length > 0 ? (
              budgetCalculations.map((item: BudgetCalculation) => (
                <Item
                  key={item.id}
                  item={item}
                  eyeStatus={common.eyeStatus}
                />
              ))
            ) : (
              <Text>No budgets available</Text>
            )
          ) : (
            <Text>Error: Expected an array of budget calculations</Text>
          )
        ) : (
          <Text>Loading...</Text>
        )}
      </ScrollView>
    </View>
  );
}
