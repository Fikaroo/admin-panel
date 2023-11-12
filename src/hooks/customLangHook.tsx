import { Lang } from "@/types";
import { createContext, useState } from "react";

// export type LaguangesType = "en" | "ru" | "az";

type LocalizationContextProps = {
  currentLanguage: Lang;
  setCurrentLanguage: React.Dispatch<React.SetStateAction<Lang>>;
  translate: object;
};

export const LocalizationContext = createContext<LocalizationContextProps>({
  currentLanguage: Lang.Ru,
  setCurrentLanguage: () => "",
  translate: {},
});

type Translations = Record<Lang, object>;

export function LocalizationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // Предположим, что у вас есть объект с переводами для разных языков
  const translations: Translations = {
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

  const [currentLanguage, setCurrentLanguage] = useState<Lang>(Lang.Ru); // По умолчанию используем русский

  const translate = (key: keyof Translations["ru"]) =>
    translations[currentLanguage][key];

  return (
    <LocalizationContext.Provider
      value={{ currentLanguage, setCurrentLanguage, translate }}
    >
      {children}
    </LocalizationContext.Provider>
  );
}
