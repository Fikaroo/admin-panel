import { createContext, useState } from "react";

export const LocalizationContext = createContext({});

export function LocalizationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // Предположим, что у вас есть объект с переводами для разных языков
  const translations = {
    en: {
      greeting: "Hello",
    },
    ru: {
      greeting: "Hola",
    },
    az: {
      greeting: "Hola",
    },
  };

  const [currentLanguage, setCurrentLanguage] =
    useState<keyof typeof translations>("ru"); // По умолчанию используем русский

  const translate = (key: keyof typeof translations.ru) =>
    translations[currentLanguage]?.[key] || key;

  return (
    <LocalizationContext.Provider
      value={{ currentLanguage, setCurrentLanguage, translate }}
    >
      {children}
    </LocalizationContext.Provider>
  );
}
