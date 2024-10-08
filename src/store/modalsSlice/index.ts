import { createSlice } from "@reduxjs/toolkit";
import { modals } from "./types";

export const modalsSlice = createSlice({
  name: "modalsState",
  initialState: {
    modalRegister: "",
    modalInfo: "",
    modalDelete: "",
    modalPay: "",
    modalDuplicate: "",
    modalFilter: "",
    modalBudget: "",
    modalBudgetTransaction: "",
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
    setModalDuplicate(state, payload) {
      state.modalDuplicate = payload.payload;
    },
    setModalPay(state, payload) {
      state.modalPay = payload.payload;
    },
    setModalFilter(state, payload) {
      state.modalFilter = payload.payload;
    },
    setModalBudget(state, payload) {
      state.modalBudget = payload.payload;
    },
    setModalBudgetTransaction(state, payload) {
      state.modalBudgetTransaction = payload.payload;
    },
    setCloseAllModals(state) {
      state.modalRegister = "";
      state.modalInfo = "";
      state.modalDelete = "";
      state.modalDuplicate = "";
      state.modalFilter = "";
      state.modalBudget = "";
      state.modalBudgetTransaction = "";
    },
  },
});

export const {
  setModalInfo,
  setModalRegister,
  setModalDelete,
  setModalDuplicate,
  setModalPay,
  setModalFilter,
  setModalBudget,
  setModalBudgetTransaction,
  setCloseAllModals,
} = modalsSlice.actions;

export default modalsSlice.reducer;
