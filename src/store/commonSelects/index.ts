import { Selector, createSelector } from "@reduxjs/toolkit";
import { RootState } from "@store";
import { CommonState } from "@store/expenseSlice/types";
import utils from "@utils";

// Selector para filtrar e classificar os registros com base no tipo.
export const selectRegisters = (type: string) => (state: RootState) => {
  let registers;

  switch (type) {
    case "expense":
      registers = state.expenseState.registers;
      break;
    case "entry":
      registers = state.entryState.registers;
      break;
    case "investment":
      registers = state.investmentState.registers;
      break;
    default:
      break;
  }

  // Filtrar os registros pelo tipo especificado
  const filteredData = registers?.filter((item) => item.type === type);
  return filteredData ? utils.sortDataByDateDesc(filteredData) : [];
};

// Função para memoizar o seletor
const memoize = <T extends (...args: any[]) => any>(
  fn: T
): ((...args: Parameters<T>) => ReturnType<T>) => {
  let cache: { [key: string]: ReturnType<T> } = {};
  return (...args: Parameters<T>): ReturnType<T> => {
    const key = JSON.stringify(args);
    if (cache[key]) {
      return cache[key];
    } else {
      const result = fn(...args);
      cache[key] = result;
      return result;
    }
  };
};

// Defina uma função de fábrica que aceita o tipo como parâmetro
const makeSelectRegistersType: (
  type: string
) => Selector<RootState, CommonState["registers"]> = memoize((type: string) =>
  createSelector(
    (state: RootState) => {
      let registers;

      switch (type) {
        case "expense":
          registers = state.expenseState.registers;
          break;
        case "entry":
          registers = state.entryState.registers;
          break;
        case "investment":
          registers = state.investmentState.registers;
          break;
        default:
          break;
      }

      return registers;
    },
    (registers) => (registers ? registers : [])
  )
);

const makeSelectRegistersFiltered: (
  type: string
) => Selector<RootState, CommonState["registers"]> = memoize((type: string) =>
  createSelector(
    (state: RootState) => {
      let data;

      switch (type) {
        case "expense":
          data = state.expenseState;
          break;
        case "entry":
          data = state.entryState;
          break;
        case "investment":
          data = state.investmentState;
          break;
        default:
          break;
      }

      return data;
    },
    (data) => utils.applyFilterData(data?.registers, data?.registerFilter)
  )
);

// Agora você pode criar um seletor passando o tipo específico
export const selectRegistersType = makeSelectRegistersType;
export const selectRegistersFiltered = makeSelectRegistersFiltered;
