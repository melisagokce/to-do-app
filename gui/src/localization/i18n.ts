import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enTranslation from './locales/en.json';
import trTranslation from './locales/tr.json';
import ruTranslation from './locales/ru.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: enTranslation
      },
      tr: {
        translation: trTranslation
      },
      ru: {
        translation: ruTranslation
      }
    },
    lng: "tr",
    fallbackLng: "tr",

    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
