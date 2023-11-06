import { Fragment, useState, useContext } from "react";
import "./laguageSwitcher.scss";
import {LocalizationContext} from "@/hooks/customLangHook"
type Laguage = "ru" | "az" | "en";
const laguages: Laguage[] = ["az", "ru", "en"];
const LaguageSwitcher = ({ children }: { children: React.ReactNode }) => {
  // const [language, setLanguage] = useState<Laguage>("RU");
  const { currentLanguage, setCurrentLanguage, translate } = useContext(LocalizationContext);
  const handleLanguageSwitch = (lang: Laguage) => {
    setCurrentLanguage(lang);
  };
  return (
    <Fragment>
      <div className="languages">
        {laguages.map((l) => (
          <button
            key={l}
            onClick={() => handleLanguageSwitch(l)}
            className={
              currentLanguage === l ? "language language__active" : "language"
            }
          >
            {l}
          </button>
        ))}
      </div>

      {children}
    </Fragment>
  );
};

export default LaguageSwitcher;
