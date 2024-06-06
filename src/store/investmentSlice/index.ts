import { createSlice } from "@reduxjs/toolkit";
import { CommonState } from "@store/types";
import { sortDataByDateDesc } from "@utils/date";

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
      state.registers = sortDataByDateDesc(action.payload);
    },
    setEditRegisterInvestment(state: CommonState, action: any) {
      const itemIndex = state.registers.findIndex(
        ({ id }) => id === action.payload.id
      );
      state.registers[itemIndex] = action.payload;
    },
    setDeleteRegisterInvestment(state: CommonState, action: any) {
      state.registers = state.registers.filter(
        ({ id }) => id !== action.payload
      );
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
  setDeleteRegisterInvestment,
} = investmentSlice.actions;

export default investmentSlice.reducer;
