import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import en from './locale/en.json';
import es from './locale/es.json';

const resources = {
  en: {
    translation: en,
  },
  es: {
    translation: es,
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    // lng:           'en', // force for testing
    fallbackLng:   'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
