import { createSlice } from "@reduxjs/toolkit";
import { modals } from "./types";

export const modalsSlice = createSlice({
  name: "modalsState",
  initialState: {
    modalRegister: "",
    modalInfo: "",
    modalDelete: "",
    modalPay: "",
    modalFilter: "",
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
    setModalPay(state, payload) {
      state.modalPay = payload.payload;
    },
    setModalFilter(state, payload) {
      state.modalFilter = payload.payload;
    },
    setCloseAllModals(state) {
      state.modalRegister = "";
      state.modalInfo = "";
      state.modalDelete = "";
      state.modalFilter = "";
    },
  },
});

export const {
  setModalInfo,
  setModalRegister,
  setModalDelete,
  setModalPay,
  setModalFilter,
  setCloseAllModals,
} = modalsSlice.actions;

export default modalsSlice.reducer;
