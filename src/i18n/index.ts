import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import * as Localization from "expo-localization";
import translationEn from "../locales/en-US/translation.json";
import translationPt from "../locales/pt-BR/translation.json";
import translationRu from "../locales/ru-RU/translation.json";
import translationZh from "../locales/zh-CN/translation.json";
import translationEs from "../locales/es-ES/translation.json";
import translationFr from "../locales/fr-FR/translation.json";
import translationIt from "../locales/it-IT/translation.json";
import translationHi from "../locales/hi-IN/translation.json";

// Função para carregar as traduções de espanhol
const loadSpanishTranslations = () => {
  return {
    "es-ES": { translation: translationEs },
    "es-AR": { translation: translationEs },
    "es-BO": { translation: translationEs },
    "es-CL": { translation: translationEs },
    "es-CO": { translation: translationEs },
    "es-EC": { translation: translationEs },
    "es-GY": { translation: translationEs },
    "es-PY": { translation: translationEs },
    "es-PE": { translation: translationEs },
    "es-SR": { translation: translationEs },
    "es-UY": { translation: translationEs },
    "es-VE": { translation: translationEs },
  };
};

const loadPortuguesTranslations = () => {
  return {
    "pt-BR": { translation: translationPt },
    "pt-PT": { translation: translationPt },
  };
};

// Configuração das traduções
const resources = {
  "en-US": { translation: translationEn },
  "ru-RU": { translation: translationRu },
  "zh-CN": { translation: translationZh },
  ...loadPortuguesTranslations(),
  ...loadSpanishTranslations(),
  "fr-FR": { translation: translationFr },
  "it-IT": { translation: translationIt },
  "hi-IN": { translation: translationHi },
};

// Inicialização do i18next
i18n.use(initReactI18next).init({
  compatibilityJSON: "v3",
  resources,
  lng: Localization.locale,
  fallbackLng: "pt-BR",
  interpolation: {
    escapeValue: false,
  },
});

// Configura a direção do texto (LTR ou RTL)
// I18nManager.allowRTL(false);
// I18nManager.forceRTL(Localization.isRTL);

export default i18n;
