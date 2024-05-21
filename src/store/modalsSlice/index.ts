import { createSlice } from "@reduxjs/toolkit";
import { modals } from "./types";

export const modalsSlice = createSlice({
  name: "modalsState",
  initialState: {
    modalRegister: "",
    modalInfo: "",
    modalDelete: "",
  } as modals,
  reducers: {
    setModalInfo(state, payload) {
      state.modalInfo = payload.payload;
    },
    setModalRegister(state, payload) {
      state.modalRegister = payload.payload;
    },
    setModalDelete(state, payload) {
      state.modalDelete = payload.payload;
    },
  },
});

export const { setModalInfo, setModalRegister, setModalDelete } =
  modalsSlice.actions;

export default modalsSlice.reducer;
