import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "@store";
import utils from "@utils";

export const selectRegistersFilteredEntry = createSelector(
  [(state: RootState) => state.entryState],
  (data) => utils.applyFilterData(data.registers, data.registerFilter)
);

export const selectRegistersFilteredExpense = createSelector(
  [(state: RootState) => state.expenseState],
  (data) => utils.applyFilterData(data.registers, data.registerFilter)
);

export const selectRegistersFilteredInvestment = createSelector(
  [(state: RootState) => state.investmentState],
  (data) => utils.applyFilterData(data.registers, data.registerFilter)
);

export const selectRegistersFilterEntry = createSelector(
  [(state: RootState) => state.entryState],
  (data) => data?.registerFilter
);

export const selectRegistersFilterExpense = createSelector(
  [(state: RootState) => state.expenseState],
  (data) => data?.registerFilter
);

export const selectRegistersFilterInvestment = createSelector(
  [(state: RootState) => state.investmentState],
  (data) => data?.registerFilter
);

export const selectRegistersEntry = createSelector(
  [(state: RootState) => state.entryState],
  (data) => data?.registers
);

export const selectRegistersExpense = createSelector(
  [(state: RootState) => state.expenseState],
  (data) => data?.registers
);

export const selectRegistersInvestment = createSelector(
  [(state: RootState) => state.investmentState],
  (data) => data?.registers
);
