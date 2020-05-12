import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as en from './translations/en.json';
import * as zh from './translations/zh.json';

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    fallbackLng: 'en',
    resources: {
      en,
      zh,
      'en-US': en,
      'zh-CN': zh,
    },
    lng: 'en',
    keySeparator: false, // we do not use keys in form messages.welcome
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
