import { createSlice } from "@reduxjs/toolkit";
import { CommonState } from "./types";
import reducers from "@store/commonReducers";

export const entrySlice = createSlice({
  name: "entryState",
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
    }
  } as CommonState,
  reducers,
});

export const {
  setRegister,
  setEditRegister,
  setRegisterFilter,
  setResetFilter,
} = entrySlice.actions;

export default entrySlice.reducer;
