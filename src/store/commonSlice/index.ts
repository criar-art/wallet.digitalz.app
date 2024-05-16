import { createSlice } from "@reduxjs/toolkit";
import { common } from "./types";

export const commonSlice = createSlice({
  name: "commonState",
  initialState: {
    registers: [],
    modalRegister: "",
    modalInfo: "",
    modalDelete: "",
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
    setModalInfo(state, payload) {
      state.modalInfo = payload.payload;
    },
    setModalRegister(state, payload) {
      state.modalRegister = payload.payload;
    },
    setModalDelete(state, payload) {
      state.modalDelete = payload.payload;
    },
    setEyeStatus(state, payload) {
      state.eyeStatus = payload.payload;
    },
  },
});

export const {
  setRegister,
  setEditRegister,
  setModalInfo,
  setModalRegister,
  setRegisterData,
  setModalDelete,
  setEyeStatus,
} = commonSlice.actions;

export default commonSlice.reducer;
