import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@store';
import { BudgetType } from '@store/budgetSlice/types';

const useBudgetCalculations = (budgetId?: string) => {
  const budgets = useSelector((state: RootState) => state.budgetState.budgets);

  const budgetCalculations = useMemo(() => {
    if (budgetId) {
      // Calculate for a single budget by ID
      const budget = budgets.find((budget: BudgetType) => budget.id === budgetId);
      if (!budget) return null;

      const totalTransactionsValue = budget.transactions.reduce((acc, transaction) => {
        const transactionValue = typeof transaction.value === 'string' ? parseFloat(transaction.value) : transaction.value;
        return acc + (isNaN(transactionValue) ? 0 : transactionValue);
      }, 0);

      const remainingBudget = budget.value - totalTransactionsValue;

      return {
        ...budget,
        totalTransactionsValue,
        remainingBudget,
        isOverBudget: remainingBudget < 0,
      };
    } else {
      // Calculate for all budgets
      return budgets.map((budget: BudgetType) => {
        const totalTransactionsValue = budget.transactions.reduce((acc, transaction) => {
          const transactionValue = typeof transaction.value === 'string' ? parseFloat(transaction.value) : transaction.value;
          return acc + (isNaN(transactionValue) ? 0 : transactionValue);
        }, 0);

        const remainingBudget = budget.value - totalTransactionsValue;

        return {
          ...budget,
          totalTransactionsValue,
          remainingBudget,
          isOverBudget: remainingBudget < 0,
        };
      });
    }
  }, [budgets, budgetId]);

  return { budgetCalculations, budgetCount: budgets.length };
};

export default useBudgetCalculations;
