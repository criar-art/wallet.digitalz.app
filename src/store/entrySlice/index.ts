import { createSlice } from "@reduxjs/toolkit";
import { CommonState } from "./types";
import utils from "@utils";

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
    },
  } as CommonState,
  reducers: {
    setRegisterEntry(state: CommonState, action: any) {
      return {
        ...state,
        registers: utils.sortDataByDateDesc(action.payload),
      };
    },
    setEditRegisterEntry(state: CommonState, action: any) {
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
    setRegisterFilterEntry(state: CommonState, action: any) {
      return {
        ...state,
        registerFilter: {
          ...state.registerFilter,
          ...action.payload,
        },
      };
    },
    setResetFilterEntry(state: CommonState) {
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
  setRegisterEntry,
  setEditRegisterEntry,
  setRegisterFilterEntry,
  setResetFilterEntry,
} = entrySlice.actions;

export default entrySlice.reducer;
