import { getFilledItemsCount, applyFilterData } from "./filter";
import {
  formatDate,
  isDatePast,
  formatDateString,
  isDateToday,
  isDateTomorrow,
  sortDataByDateDesc,
} from "./date";
import {
  renderBorderType,
  renderColorType,
  renderBackgroundClass,
} from "./render";

export default {
  formatDate,
  isDatePast,
  formatDateString,
  isDateToday,
  isDateTomorrow,
  sortDataByDateDesc,
  getFilledItemsCount,
  applyFilterData,
  renderBorderType,
  renderColorType,
  renderBackgroundClass,
};

export const types: { [key: string]: string } = {
  liquid: "Líquido",
  patrimony: "Patrimônio",
  investiment: "Investimento",
  entry: "Entrada",
  expense: "Despesa",
  vehicle: "Veículo",
};

export const capitalize = (s: string): string =>
  s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();

export const checkTypeTouchable = (type: string): boolean => {
  switch (type) {
    case "liquid":
    case "patrimony":
      return false;
    default:
      return true;
  }
};

export const parseMoney = (value: string, eye?: boolean): string => {
  return eye ? value : value.replace(/[.,0-9]/g, "*");
};

export const getLabel = (options: any, route: any): string =>
  options.tabBarLabel !== undefined
    ? options.tabBarLabel
    : options.title !== undefined
    ? options.title
    : route.name;

export const isObjectEmpty = (obj: any): boolean => {
  // Verifica se todos os valores das chaves do objeto são vazios
  return obj
    ? Object.values(obj).every((value) => value === "" || value === undefined)
    : false;
};
