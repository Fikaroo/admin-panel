import { Fragment, useContext } from "react";
import "./laguageSwitcher.scss";
import { LocalizationContext } from "@/hooks/customLangHook";
import { Lang } from "@/types";

const LaguageSwitcher = ({ children }: { children: React.ReactNode }) => {
  // const [language, setLanguage] = useState<Laguage>("RU");
  const { currentLanguage, setCurrentLanguage } = useContext(LocalizationContext);
  const handleLanguageSwitch = (lang: Lang) => {
    setCurrentLanguage(lang);
  };
  return (
    <Fragment>
      <div className="languages">
        {Object.entries(Lang).map(([key, value]) => (
          <button
            key={key}
            onClick={() => handleLanguageSwitch(value)}
            className={currentLanguage === value ? "language language__active" : "language"}>
            {key}
          </button>
        ))}
      </div>

      {children}
    </Fragment>
  );
};

export default LaguageSwitcher;
