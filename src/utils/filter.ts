import { RootState } from "@store";
import {
  compareAsc,
  compareDesc,
  isAfter,
  isBefore,
  isWithinInterval,
  parse,
} from "date-fns";

interface RegisterFilter {
  short: string;
  startDate: string;
  endDate: string;
  searchTerm: string;
  pay: boolean | undefined;
}

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

// Função auxiliar para obter o estado e as ações corretas com base no modalFilter
export const getStateAndActions = (modalFilter: string | undefined) => {
  switch (modalFilter) {
    case "expense":
      return {
        stateSelector: (state: RootState) => state.expenseState,
        setRegisterFilter: setRegisterFilterExpense,
        setRegister: setRegisterExpense,
        setEditRegister: setEditRegisterExpense,
        setResetFilter: setResetFilterExpense,
      };
    case "entry":
      return {
        stateSelector: (state: RootState) => state.entryState,
        setRegisterFilter: setRegisterFilterEntry,
        setRegister: setRegisterEntry,
        setEditRegister: setEditRegisterEntry,
        setResetFilter: setResetFilterEntry,
      };
    case "investment":
      return {
        stateSelector: (state: RootState) => state.investmentState,
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
      if (value !== "" && value !== undefined) {
        count++;
      }
    }
  }

  return count;
};

export const applyFilterData = (registers: any, filter: any) => {
  let result = registers ? [...registers] : [];

  const parsedStartDate = filter?.startDate
    ? parse(filter?.startDate, "dd/MM/yyyy", new Date())
    : null;

  const parsedEndDate = filter?.endDate
    ? parse(filter?.endDate, "dd/MM/yyyy", new Date())
    : null;

  if (parsedStartDate && parsedEndDate) {
    if (isBefore(parsedEndDate, parsedStartDate)) {
      console.error("End date cannot be earlier than start date");
      return result;
    }

    result = result.filter((item) => {
      const itemDate = parse(item.date, "dd/MM/yyyy", new Date());
      return isWithinInterval(itemDate, {
        start: parsedStartDate,
        end: parsedEndDate,
      });
    });
  } else if (parsedStartDate) {
    result = result.filter((item) => {
      const itemDate = parse(item.date, "dd/MM/yyyy", new Date());
      return (
        isAfter(itemDate, parsedStartDate) ||
        itemDate.getTime() === parsedStartDate.getTime()
      );
    });
  } else if (parsedEndDate) {
    result = result.filter((item) => {
      const itemDate = parse(item.date, "dd/MM/yyyy", new Date());
      return (
        isBefore(itemDate, parsedEndDate) ||
        itemDate.getTime() === parsedEndDate.getTime()
      );
    });
  }

  if (filter?.searchTerm) {
    result = result.filter((item) =>
      item.name.toLowerCase().includes(filter.searchTerm.toLowerCase())
    );
  }

  if (filter?.short === "asc") {
    result.sort((a, b) => compareAsc(a.value, b.value));
  } else {
    result.sort((a, b) => compareDesc(a.value, b.value));
  }

  if (filter?.pay !== undefined) {
    result = result.filter((item) => item.pay === filter.pay);
  }

  return result;
};
