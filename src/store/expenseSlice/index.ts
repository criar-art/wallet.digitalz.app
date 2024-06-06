import { createSlice } from "@reduxjs/toolkit";
import { CommonState } from "./types";
import reducers from "@store/commonReducers";

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
  reducers,
});

export const {
  setRegister,
  setEditRegister,
  setRegisterFilter,
  setResetFilter,
} = expenseSlice.actions;

export default expenseSlice.reducer;
