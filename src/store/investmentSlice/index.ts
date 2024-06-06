import { createSlice } from "@reduxjs/toolkit";
import { CommonState } from "./types";
import utils from "@utils";

export const investmentSlice = createSlice({
  name: "investmentState",
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
    setRegisterInvestment(state: CommonState, action: any) {
      return {
        ...state,
        registers: utils.sortDataByDateDesc(action.payload),
      };
    },
    setEditRegisterInvestment(state: CommonState, action: any) {
      const itemIndex = state.registers.findIndex(
        ({ id }) => id === action.payload.id
      );
      const newRegisters = [...state.registers];
      newRegisters[itemIndex] = action.payload;
      return {
        ...state,
        registers: newRegisters,
      };
    },
    setRegisterFilterInvestment(state: CommonState, action: any) {
      return {
        ...state,
        registerFilter: {
          ...state.registerFilter,
          ...action.payload,
        },
      };
    },
    setResetFilterInvestment(state: CommonState) {
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
  setRegisterInvestment,
  setEditRegisterInvestment,
  setRegisterFilterInvestment,
  setResetFilterInvestment,
} = investmentSlice.actions;

export default investmentSlice.reducer;
