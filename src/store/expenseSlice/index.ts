import { createSlice } from "@reduxjs/toolkit";
import { CommonState } from "@store/types";
import { sortDataByDateDesc } from "@utils/date";

export const expenseSlice = createSlice({
  name: "expenseState",
  initialState: {
    registers: [],
    registerFilter: {
      short: null,
      startDate: null,
      endDate: null,
      searchTerm: "",
      pay: null,
    },
    pagination: {
      startIndex: 0,
      endIndex: 5,
    },
  } as CommonState,
  reducers: {
    setRegisterExpense(state: CommonState, action: any) {
      state.registers = sortDataByDateDesc(action.payload);
    },
    setEditRegisterExpense(state: CommonState, action: any) {
      const itemIndex = state.registers.findIndex(
        ({ id }) => id === action.payload.id
      );
      state.registers[itemIndex] = action.payload;
    },
    setDeleteRegisterExpense(state: CommonState, action: any) {
      state.registers = state.registers.filter(
        ({ id }) => id !== action.payload
      );
    },
    setRegisterFilterExpense(state: CommonState, action: any) {
      state.registerFilter = action.payload;
    },
    setResetFilterExpense(state: CommonState) {
      state.registerFilter = {
        short: null,
        startDate: null,
        endDate: null,
        searchTerm: "",
        pay: null,
      };
    },
  },
});

export const {
  setRegisterExpense,
  setEditRegisterExpense,
  setRegisterFilterExpense,
  setResetFilterExpense,
  setDeleteRegisterExpense,
} = expenseSlice.actions;

export default expenseSlice.reducer;
