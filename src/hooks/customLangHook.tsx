import { createContext, useState } from 'react';

export const LocalizationContext = createContext();

export function LocalizationProvider({ children }) {
  // Предположим, что у вас есть объект с переводами для разных языков
  const translations = {
    en: {
      greeting: 'Hello',
    },
    ru: {
      greeting: 'Hola',
    },
    az: {
      greeting: 'Hola',
    },
  };

  const [currentLanguage, setCurrentLanguage] = useState('ru'); // По умолчанию используем русский

  const translate = (key: string) => translations[currentLanguage][key] || key;

  return (
    <LocalizationContext.Provider value={{ currentLanguage, setCurrentLanguage, translate }}>
      {children}
    </LocalizationContext.Provider>
  );
}