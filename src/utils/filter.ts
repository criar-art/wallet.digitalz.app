import { RootState } from "@store";
import {
  compareAsc,
  compareDesc,
  isAfter,
  isBefore,
  isEqual,
  isWithinInterval,
} from "date-fns";

import {
  setRegisterFilterExpense,
  setRegisterExpense,
  setEditRegisterExpense,
  setResetFilterExpense,
} from "@store/expenseSlice";
import {
  setRegisterFilterEntry,
  setRegisterEntry,
  setEditRegisterEntry,
  setResetFilterEntry,
} from "@store/entrySlice";
import {
  setRegisterFilterInvestment,
  setRegisterInvestment,
  setEditRegisterInvestment,
  setResetFilterInvestment,
} from "@store/investmentSlice";
import { Register, RegisterFilter } from "@store/types";

// Função auxiliar para obter o estado e as ações corretas com base no modalFilter
export const getStateAndActions = (modalFilter: string | undefined) => {
  switch (modalFilter) {
    case "expense":
      return {
        setRegisterFilter: setRegisterFilterExpense,
        setRegister: setRegisterExpense,
        setEditRegister: setEditRegisterExpense,
        setResetFilter: setResetFilterExpense,
      };
    case "entry":
      return {
        setRegisterFilter: setRegisterFilterEntry,
        setRegister: setRegisterEntry,
        setEditRegister: setEditRegisterEntry,
        setResetFilter: setResetFilterEntry,
      };
    case "investment":
      return {
        setRegisterFilter: setRegisterFilterInvestment,
        setRegister: setRegisterInvestment,
        setEditRegister: setEditRegisterInvestment,
        setResetFilter: setResetFilterInvestment,
      };
    default:
      return {
        stateSelector: undefined,
        setRegisterFilter: undefined,
        setResetFilter: undefined,
      };
  }
};

// Função auxiliar para obter registros com base no tipo
export const getStateRegisters: any = (state: RootState, type: string) => {
  const dataMapping: any = {
    expense: state.expenseState,
    entry: state.entryState,
    investment: state.investmentState,
  };

  return dataMapping[type] || {};
};

export const getFilledItemsCount = (filter: RegisterFilter): number => {
  let count = 0;
  for (const key in filter) {
    if (filter.hasOwnProperty(key)) {
      const value = filter[key as keyof RegisterFilter];
      if (value !== "" && value !== null) {
        count++;
      }
    }
  }

  return count;
};

import { isDate, parseISO } from "date-fns";

export const applyFilterData = (
  registers: Array<Register>,
  filter: RegisterFilter
) => {
  let result = registers ? [...registers] : [];

  // Verificar e converter startDate e endDate para Date, se necessário
  let startDate = filter.startDate;
  let endDate = filter.endDate;

  if (startDate && !isDate(startDate)) {
    startDate = parseISO(startDate as unknown as string);
  }

  if (endDate && !isDate(endDate)) {
    endDate = parseISO(endDate as unknown as string);
  }

  if (startDate && endDate) {
    if (isBefore(endDate, startDate)) {
      console.error("End date cannot be earlier than start date");
      return result;
    }

    result = result.filter((item) => {
      const itemDate = new Date(item.date);
      return isWithinInterval(itemDate, {
        start: startDate,
        end: endDate,
      });
    });
  } else if (startDate) {
    result = result.filter((item) => {
      const itemDate = new Date(item.date);
      return isAfter(itemDate, startDate) || isEqual(itemDate, startDate);
    });
  } else if (endDate) {
    result = result.filter((item) => {
      const itemDate = new Date(item.date);
      return isBefore(itemDate, endDate) || isEqual(itemDate, endDate);
    });
  }

  if (filter.searchTerm) {
    result = result.filter(
      (item) =>
        filter.searchTerm &&
        item.name.toLowerCase().includes(filter.searchTerm.toLowerCase())
    );
  }

  if (filter.short === "asc") {
    result.sort((a, b) => compareAsc(a.value, b.value));
  } else {
    result.sort((a, b) => compareDesc(a.value, b.value));
  }

  if (filter.pay !== null) {
    result = result.filter((item) => item.pay === filter.pay);
  }

  return result;
};
