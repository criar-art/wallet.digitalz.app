import {
  getFilledItemsCount,
  applyFilterData,
  getStateRegisters,
  getStateAndActions,
} from "./filter";
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

import { encryptData, decryptData } from "./crypto";

const types: { [key: string]: string } = {
  liquid: "Líquido",
  patrimony: "Patrimônio",
  investment: "Investimento",
  entry: "Entrada",
  expense: "Despesa",
  vehicle: "Veículo",
};

const capitalize = (s: string): string =>
  s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();

const checkTypeTouchable = (type: string): boolean => {
  switch (type) {
    case "liquid":
    case "patrimony":
      return false;
    default:
      return true;
  }
};

const parseMoney = (value: string, eye?: boolean): string => {
  return eye ? value : value.replace(/[.,0-9]/g, "*");
};

const getLabel = (options: any, route: any): string =>
  options.tabBarLabel !== undefined
    ? options.tabBarLabel
    : options.title !== undefined
    ? options.title
    : route.name;

const isObjectEmpty = (obj: any): boolean => {
  // Verifica se todos os valores das chaves do objeto são vazios
  return obj
    ? Object.values(obj).every((value) => value === "" || value === undefined)
    : false;
};

const typeCategory = ["patrimony", "expense", "entry", "investment"];
const TypeCategory = (index: number | undefined) =>
  index === undefined ? "patrimony" : typeCategory[index];

export default {
  formatDate,
  isDatePast,
  formatDateString,
  isDateToday,
  isDateTomorrow,
  sortDataByDateDesc,
  getStateRegisters,
  getStateAndActions,
  getFilledItemsCount,
  applyFilterData,
  renderBorderType,
  renderColorType,
  renderBackgroundClass,
  types,
  capitalize,
  parseMoney,
  getLabel,
  isObjectEmpty,
  checkTypeTouchable,
  TypeCategory,
  encryptData,
  decryptData,
};
