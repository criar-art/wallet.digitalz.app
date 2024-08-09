import { Transcation } from "@store/budgetSlice/types";

export type BudgetCalculation = {
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
