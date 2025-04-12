import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import enAuth from './locale/en/auth.json';
import enCommon from './locale/en/common.json';
import enModals from './locale/en/modals.json';
import enValidators from './locale/en/validators.json';

import esAuth from './locale/es/auth.json';
import esCommon from './locale/es/common.json';
import esModals from './locale/es/modals.json';
import esValidators from './locale/es/validators.json';

const resources = {
  en: {
    auth:       enAuth,
    common:     enCommon,
    modals:     enModals,
    validators: enValidators,

  },
  es: {
    auth:       esAuth,
    common:     esCommon,
    modals:     esModals,
    validators: esValidators,
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    // lng:           'en', // force for testing
    fallbackLng:   'en',
    ns:            ['auth', 'common', 'modals', 'validators'],
    defaultNS:     'common',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
