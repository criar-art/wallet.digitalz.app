import { createSlice } from "@reduxjs/toolkit";
import { sortDataByDateDesc } from "@utils/date";
import { BudgetState } from "./types";
import uuid from "react-native-uuid"; // Certifique-se de ter o pacote uuid instalado

export const budgetSlice = createSlice({
  name: "budgetState",
  initialState: {
    budgets: [],
  } as BudgetState,
  reducers: {
    setBudget(state: BudgetState, action: any) {
      state.budgets = sortDataByDateDesc(action.payload);
    },
    setEditBudget(state: BudgetState, action: any) {
      const budgetIndex = state.budgets.findIndex(
        ({ id }) => id === action.payload.id
      );
      state.budgets[budgetIndex] = action.payload;
    },
    setDeleteBudget(state: BudgetState, action: any) {
      state.budgets = state.budgets.filter(
        ({ id }) => id !== action.payload
      );
    },
    setTransaction(state: BudgetState, action: any) {
      const budgetIndex = state.budgets.findIndex(
        ({ id }) => id === action.payload.id
      );
      state.budgets[budgetIndex].transactions = [action.payload.transaction, ...state.budgets[budgetIndex].transactions];
    },
    setEditTransaction(state: BudgetState, action: any) {
      const budgetIndex = state.budgets.findIndex(
        ({ id }) => id === action.payload.id
      );
      const transactionIndex = state.budgets[budgetIndex].transactions.findIndex(
        ({ id }) => id === action.payload.transaction.id
      );

      state.budgets[budgetIndex].transactions[transactionIndex] = action.payload.transaction;
    },
    setDeleteTransaction(state: BudgetState, action: any) {
      const budgetIndex = state.budgets.findIndex(
        ({ id }) => id === action.payload.idBudget
      );

      state.budgets[budgetIndex].transactions = state.budgets[budgetIndex].transactions.filter(
        ({ id }) => id !== action.payload.idTransaction
      );
    },
    setDuplicateBudget(state: BudgetState, action: any) {
      const budgetToDuplicate = state.budgets.find(
        ({ id }) => id === action.payload
      );

      if (budgetToDuplicate) {
        const duplicatedBudget: any = {
          ...budgetToDuplicate,
          id: uuid.v4(), // Gera um novo ID único
          name: `${budgetToDuplicate.name} (Copy)`, // Adiciona "(Copy)" ao nome
          date_create: new Date().toISOString(), // Atualiza a data de criação
          transactions: budgetToDuplicate.transactions.map((transaction) => ({
            ...transaction,
            id: uuid.v4(), // Gera novos IDs para as transações
          })),
        };

        state.budgets = [duplicatedBudget, ...state.budgets];
      }
    },
  },
});

export const {
  setBudget,
  setEditBudget,
  setDeleteBudget,
  setTransaction,
  setEditTransaction,
  setDeleteTransaction,
  setDuplicateBudget, // Exporta a nova ação
} = budgetSlice.actions;

export default budgetSlice.reducer;
