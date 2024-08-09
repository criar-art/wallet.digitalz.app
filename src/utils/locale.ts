import * as Localization from "expo-localization";

interface LocaleConfig {
  dateFormat: string;
  currencySymbol: string;
}

const localeConfigs: { [key: string]: LocaleConfig } = {
  "pt-BR": { dateFormat: "dd/MM/yyyy", currencySymbol: "R$" },
  "pt-AO": { dateFormat: "dd/MM/yyyy", currencySymbol: "Kz" },
  "pt-PT": { dateFormat: "dd/MM/yyyy", currencySymbol: "€" },
  "en-US": { dateFormat: "MM/dd/yyyy", currencySymbol: "$" },
  "ru-RU": { dateFormat: "dd.MM.yyyy", currencySymbol: "₽" },
  "zh-CN": { dateFormat: "yyyy/MM/dd", currencySymbol: "¥" },
  "es-ES": { dateFormat: "dd/MM/yyyy", currencySymbol: "€" },
  "fr-FR": { dateFormat: "dd/MM/yyyy", currencySymbol: "€" },
  "it-IT": { dateFormat: "dd/MM/yyyy", currencySymbol: "€" },
  "hi-IN": { dateFormat: "dd/MM/yyyy", currencySymbol: "₹" },
  "es-AR": { dateFormat: "dd/MM/yyyy", currencySymbol: "$" },
  "es-BO": { dateFormat: "dd/MM/yyyy", currencySymbol: "Bs." },
  "es-CL": { dateFormat: "dd-MM-yyyy", currencySymbol: "$" },
  "es-CO": { dateFormat: "dd/MM/yyyy", currencySymbol: "$" },
  "es-EC": { dateFormat: "dd/MM/yyyy", currencySymbol: "$" },
  "es-GY": { dateFormat: "dd/MM/yyyy", currencySymbol: "G$" },
  "es-PY": { dateFormat: "dd/MM/yyyy", currencySymbol: "₲" },
  "es-PE": { dateFormat: "dd/MM/yyyy", currencySymbol: "S/" },
  "es-SR": { dateFormat: "dd/MM/yyyy", currencySymbol: "$" },
  "es-UY": { dateFormat: "dd/MM/yyyy", currencySymbol: "$U" },
  "es-VE": { dateFormat: "dd/MM/yyyy", currencySymbol: "Bs.S." },
};

const defaultLocale = "pt-BR";

export const currencySymbol =
  localeConfigs[Localization.locale]?.currencySymbol ||
  localeConfigs[defaultLocale].currencySymbol;

export const templateDate =
  localeConfigs[Localization.locale]?.dateFormat ||
  localeConfigs[defaultLocale].dateFormat;
