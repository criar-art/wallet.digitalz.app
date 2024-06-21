import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { CommonState } from "./types";

export const commonSlice = createSlice({
  name: "commonState",
  initialState: {
    registerData: "",
    eyeStatus: false,
    menuVisible: true,
  } as CommonState,
  reducers: {
    setRegisterData(state, action: PayloadAction<string>) {
      state.registerData = action.payload;
    },
    setEyeStatus(state, action: PayloadAction<boolean>) {
      state.eyeStatus = action.payload;
    },
    setMenuVisible(state, action: PayloadAction<boolean>) {
      state.menuVisible = action.payload;
    },
  },
});

export const { setRegisterData, setEyeStatus, setMenuVisible } =
  commonSlice.actions;
export default commonSlice.reducer;
