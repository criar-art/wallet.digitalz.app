import { Selector, createSelector, createSlice } from "@reduxjs/toolkit";
import { RootState } from "@store";
import utils from "@utils";
import { common } from "./types";

export const commonSlice = createSlice({
  name: "commonState",
  initialState: {
    registers: [],
    registerData: "",
    registerFilter: {
      short: "",
      startDate: "",
      endDate: "",
      searchTerm: "",
      pay: undefined,
    },
    eyeStatus: false,
  } as common,
  reducers: {
    setRegister(state, payload) {
      state.registers = utils.sortDataByDateDesc(payload.payload);
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
    setRegisterFilter(state, payload) {
      state.registerFilter = {
        ...state.registerFilter,
        ...payload.payload,
      };
    },
    setResetFilter(state, payload) {
      state.registerFilter = payload.payload;
    },
    setEyeStatus(state, payload) {
      state.eyeStatus = payload.payload;
    },
  },
});

// Selector para filtrar e classificar os registros com base no tipo.
export const selectRegisters = (type: string) => (state: RootState) => {
  const registers = state.commonState.registers;

  // Filtrar os registros pelo tipo especificado
  const filteredData = registers.filter((item) => item.type === type);
  return utils.sortDataByDateDesc(filteredData);
};

// Defina uma função de fábrica que aceita o tipo como parâmetro
const makeSelectRegistersType: (
  type: string
) => Selector<RootState, common["registers"]> = (type: string) =>
  createSelector(
    (state: RootState) => state.commonState.registers,
    (registers) => {
      // Retorna os registros filtrados com base no tipo
      return registers.filter((item) => item.type === type);
    }
  );

const makeSelectRegistersFiltered: (
  type: string
) => Selector<RootState, common["registers"]> = (type: string) =>
  createSelector(
    (state: RootState) => state.commonState.registers,
    (state: RootState) => state.commonState.registerFilter,
    (registers, filter) => {
      // Filtra os registros pelo tipo
      const filteredByType = registers.filter((item) => item.type === type);
      // Aplica os filtros e ordenação
      return utils.applyFilterData(filteredByType, filter);
    }
  );

// Agora você pode criar um seletor passando o tipo específico
export const selectRegistersType = makeSelectRegistersType;
export const selectRegistersFiltered = makeSelectRegistersFiltered;

export const {
  setRegister,
  setEditRegister,
  setRegisterData,
  setEyeStatus,
  setRegisterFilter,
  setResetFilter,
} = commonSlice.actions;

export default commonSlice.reducer;
