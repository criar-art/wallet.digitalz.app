import { createSlice } from "@reduxjs/toolkit";
import { CommonState } from "@store/types";
import { sortDataByDateDesc } from "@utils/date";

export const entrySlice = createSlice({
  name: "entryState",
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
    setRegisterEntry(state: CommonState, action: any) {
      state.registers = sortDataByDateDesc(action.payload);
    },
    setEditRegisterEntry(state: CommonState, action: any) {
      const itemIndex = state.registers.findIndex(
        ({ id }) => id === action.payload.id
      );
      state.registers[itemIndex] = action.payload;
    },
    setDeleteRegisterEntry(state: CommonState, action: any) {
      state.registers = state.registers.filter(
        ({ id }) => id !== action.payload
      );
    },
    setRegisterFilterEntry(state: CommonState, action: any) {
      state.registerFilter = action.payload;
    },
    setResetFilterEntry(state: CommonState) {
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
  setRegisterEntry,
  setEditRegisterEntry,
  setRegisterFilterEntry,
  setResetFilterEntry,
  setDeleteRegisterEntry,
} = entrySlice.actions;

export default entrySlice.reducer;
