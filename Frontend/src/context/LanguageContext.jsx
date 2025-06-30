import { createContext, useContext, useState, useEffect } from 'react';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTranslation from '../locales/en.json';
import siTranslation from '../locales/si.json';

// Initialize i18n
i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: enTranslation,
      },
      si: {
        translation: siTranslation,
      },
    },
    lng: localStorage.getItem('language') || 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

const LanguageContext = createContext();

export const useLanguage = () => {
  return useContext(LanguageContext);
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(localStorage.getItem('language') || 'en');

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setLanguage(lng);
    localStorage.setItem('language', lng);
  };

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language]);

  const value = {
    language,
    changeLanguage,
    t: i18n.t,
    i18n,
    languages: [
      { code: 'en', name: 'English' },
      { code: 'si', name: 'සිංහල' },
    ],
  };

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};
