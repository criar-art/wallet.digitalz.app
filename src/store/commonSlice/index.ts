import { createSlice } from '@reduxjs/toolkit';
import { common } from './types';

export const commonSlice = createSlice({
  name: 'commonState',
  initialState: {
    registers: [],
    modalRegister: false,
  } as common,
  reducers: {
    setRegister(state, payload) {
      state.registers = payload.payload;
    },
    setModalRegister(state, payload) {
      state.modalRegister = payload.payload;
    },
  },
});

export const {
  setRegister,
  setModalRegister,
} = commonSlice.actions;

export default commonSlice.reducer;
