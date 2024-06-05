import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { CommonState } from "./types";

export const commonSlice = createSlice({
  name: "commonState",
  initialState: {
    registerData: "",
    eyeStatus: false,
  } as CommonState,
  reducers: {
    setRegisterData(state, action: PayloadAction<string>) {
      state.registerData = action.payload;
    },
    setEyeStatus(state, action: PayloadAction<boolean>) {
      state.eyeStatus = action.payload;
    },
  },
});

export const { setRegisterData, setEyeStatus } = commonSlice.actions;
export default commonSlice.reducer;
