import { createSlice } from "@reduxjs/toolkit";
import { common } from "./types";

export const commonSlice = createSlice({
  name: "commonState",
  initialState: {
    registers: [],
    registerData: "",
    eyeStatus: false,
  } as common,
  reducers: {
    setRegister(state, payload) {
      state.registers = payload.payload;
    },
    setEditRegister(state, payload) {
      const itemIndex = state.registers.findIndex(
        ({ id }: any) => id == payload.payload.id
      );
      state.registers[itemIndex] = payload.payload;
    },
    setRegisterData(state, payload) {
      state.registerData = payload.payload;
    },
    setEyeStatus(state, payload) {
      state.eyeStatus = payload.payload;
    },
  },
});

export const { setRegister, setEditRegister, setRegisterData, setEyeStatus } =
  commonSlice.actions;

export default commonSlice.reducer;
