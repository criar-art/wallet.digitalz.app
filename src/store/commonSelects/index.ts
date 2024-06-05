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
    (registers) => {
      // Retorna os registros filtrados com base no tipo
      return registers ? registers : [];
    }
  )
);

const makeSelectRegistersFiltered: (
  type: string
) => Selector<RootState, CommonState["registers"]> = memoize((type: string) =>
  createSelector(
    (state: RootState) => {
      let test;

      switch (type) {
        case "expense":
          test = state.expenseState;
          break;
        case "entry":
          test = state.entryState;
          break;
        case "investment":
          test = state.investmentState;
          break;
        default:
          break;
      }

      return test;
    },
    (test) => {
      // Filtra os registros pelo tipo
      console.log("startIndex", test?.pagination.startIndex);

      // Aplica os filtros e ordenação
      return utils
        .applyFilterData(test?.registers, test?.registerFilter).slice(0,5)
    }
  )
);

// Agora você pode criar um seletor passando o tipo específico
export const selectRegistersType = makeSelectRegistersType;
export const selectRegistersFiltered = makeSelectRegistersFiltered;
