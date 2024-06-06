import { createSlice } from "@reduxjs/toolkit";
import { CommonState } from "./types";
import utils from "@utils";

export const expenseSlice = createSlice({
  name: "expenseState",
  initialState: {
    registers: [],
    registerFilter: {
      short: "",
      startDate: "",
      endDate: "",
      searchTerm: "",
      pay: undefined,
    },
    pagination: {
      startIndex: 0,
      endIndex: 5,
    },
  } as CommonState,
  reducers: {
    setRegisterExpense(state: CommonState, action: any) {
      state.registers = utils.sortDataByDateDesc(action.payload);
    },
    setEditRegisterExpense(state: CommonState, action: any) {
      const itemIndex = state.registers.findIndex(
        ({ id }) => id === action.payload.id
      );
      state.registers[itemIndex] = action.payload;
    },
    setRegisterFilterExpense(state: CommonState, action: any) {
      return {
        ...state,
        registerFilter: {
          ...state.registerFilter,
          ...action.payload,
        },
      };
    },
    setResetFilterExpense(state: CommonState) {
      return {
        ...state,
        registerFilter: {
          short: "",
          startDate: "",
          endDate: "",
          searchTerm: "",
          pay: undefined,
        },
      };
    },
  },
});

export const {
  setRegisterExpense,
  setEditRegisterExpense,
  setRegisterFilterExpense,
  setResetFilterExpense,
} = expenseSlice.actions;

export default expenseSlice.reducer;
