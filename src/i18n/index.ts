import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import * as Localization from "expo-localization";
import translationEn from "../locales/en/translation.json";
import translationPt from "../locales/pt/translation.json";
import translationRu from "../locales/ru/translation.json";
import translationZh from "../locales/zh/translation.json";
import translationEs from "../locales/es/translation.json";

// Configuração das traduções
const resources = {
  en: {
    translation: translationEn,
  },
  pt: {
    translation: translationPt,
  },
  ru: {
    translation: translationRu,
  },
  zh: {
    translation: translationZh,
  },
  es: {
    translation: translationEs,
  },
};

// Inicialização do i18next
i18n.use(initReactI18next).init({
  compatibilityJSON: "v3",
  resources,
  lng: Localization.locale, // Define a língua com base na configuração do dispositivo
  fallbackLng: "pt", // Língua padrão caso a língua do dispositivo não seja suportada
  interpolation: {
    escapeValue: false, // React já faz a sanitização
  },
});

// Configura a direção do texto (LTR ou RTL)
// I18nManager.allowRTL(false);
// I18nManager.forceRTL(Localization.isRTL);

export default i18n;
