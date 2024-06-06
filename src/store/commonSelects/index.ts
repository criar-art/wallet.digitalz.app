import { Selector, createSelector } from "@reduxjs/toolkit";
import { RootState } from "@store";
import { CommonState } from "@store/expenseSlice/types";
import utils from "@utils";

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

// Selector básico para filtrar e classificar os registros com base no tipo
export const selectRegisters = (type: string) => (state: RootState) => {
  const data = utils.getStateRegisters(state, type);
  const filteredData = data.registers.filter((item: any) => item.type === type);
  return utils.sortDataByDateDesc(filteredData);
};

// Selector básico para filtrar e classificar os registros com base no tipo
export const selectFilters = (type: string) => (state: RootState) => {
  const data = utils.getStateRegisters(state, type);
  return data?.registerFilter;
};

// Defina uma função de fábrica que aceita o tipo como parâmetro
const makeSelectRegistersType: (
  type: string
) => Selector<RootState, CommonState["registers"]> = memoize((type: string) =>
  createSelector(
    (state: RootState) => utils.getStateRegisters(state, type),
    (data) => data.registers || []
  )
);

const makeSelectRegistersFiltered: (
  type: string
) => Selector<RootState, CommonState["registers"]> = memoize((type: string) =>
  createSelector(
    (state: RootState) => utils.getStateRegisters(state, type),
    (data) => utils.applyFilterData(data.registers, data.registerFilter)
  )
);

// Agora você pode criar um seletor passando o tipo específico
export const selectRegistersType = makeSelectRegistersType;
export const selectRegistersFiltered = makeSelectRegistersFiltered;
