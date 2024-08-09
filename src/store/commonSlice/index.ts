import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { CommonState } from "./types";

export const commonSlice = createSlice({
  name: "commonState",
  initialState: {
    registerData: "",
    budgetData: "",
    budgetTransactionData: "",
    eyeStatus: false,
    menuVisible: true,
  } as CommonState,
  reducers: {
    setRegisterData(state, action: PayloadAction<string>) {
      state.registerData = action.payload;
    },
    setBudgetData(state, action: PayloadAction<string>) {
      state.budgetData = action.payload;
    },
    setBudgetTransactionData(state, action: PayloadAction<string>) {
      state.budgetTransactionData = action.payload;
    },
    setEyeStatus(state, action: PayloadAction<boolean>) {
      state.eyeStatus = action.payload;
    },
    setMenuVisible(state, action: PayloadAction<boolean>) {
      state.menuVisible = action.payload;
    },
  },
});

export const { setRegisterData, setBudgetData, setBudgetTransactionData, setEyeStatus, setMenuVisible } =
  commonSlice.actions;
export default commonSlice.reducer;
