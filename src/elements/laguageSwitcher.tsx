import { Fragment, useState } from "react";
import "./laguageSwitcher.scss";

type Laguage = "RU" | "AZ" | "EN";
const laguages: Laguage[] = ["AZ", "RU", "EN"];
const LaguageSwitcher = ({ children }: { children: React.ReactNode }) => {
  const [language, setLanguage] = useState<Laguage>("RU");

  const handleLanguageSwitch = (lang: Laguage) => {
    setLanguage(lang);
  };
  return (
    <Fragment>
      <div className="languages">
        {laguages.map((l) => (
          <button
            key={l}
            onClick={() => handleLanguageSwitch(l)}
            className={
              language === l ? "language language__active" : "language"
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
