import * as Localization from "expo-localization";

console.log("Localization.locale", Localization.locale.slice(0, 2));

const dateFormatMap: { [key: string]: string } = {
  ru: "dd.MM.yyyy",
  zh: "yyyy/MM/dd",
  es: "dd/MM/yyyy",
  pt: "dd/MM/yyyy",
  en: "MM/dd/yyyy",
};

const currencySymbols: { [key: string]: string } = {
  ru: "₽",
  zh: "¥",
  es: "€",
  pt: "R$",
  en: "$",
};
export const currencySymbol =
  currencySymbols[Localization.locale.slice(0, 2)] || "";

export const templateDate =
  dateFormatMap[Localization.locale.slice(0, 2)] || "MM/dd/yyyy";
