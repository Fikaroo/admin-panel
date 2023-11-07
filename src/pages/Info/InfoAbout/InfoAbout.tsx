import { useState, useContext } from "react";
import { LocalizationContext } from "@/hooks/customLangHook";
import LaguageSwitcher from "@/elements/laguageSwitcher";
import TextArea from "@/components/ui/textarea/textarea";
import FilledButton from "@/elements/filledButton";

const InfoAbout = () => {
  const [aboutValueRu, setAboutValueRu] = useState("");
  const [b2bValueRu, setB2bValueRu] = useState("");
  const [aboutValueAz, setAboutValueAz] = useState("");
  const [b2bValueAz, setB2bValueAz] = useState("");
  const [aboutValueEn, setAboutValueEn] = useState("");
  const [b2bValueEn, setB2bValueEn] = useState("");

  const saveRuData = () => {};
  const saveAzData = () => {};
  const saveEnData = () => {};

  const { currentLanguage, setCurrentLanguage, translate } =
    useContext(LocalizationContext);

  return (
    <div>
      <LaguageSwitcher>
        {currentLanguage === "ru" ? (
          <div>
            <TextArea
              title={"О Нас"}
              subtitle={"текст"}
              maxSymbol={"Максимум 500 символов"}
              value={aboutValueRu}
              onChange={(ev: string) => setAboutValueRu(ev)}
            />
            <TextArea
              title={"B2B"}
              subtitle={"текст"}
              maxSymbol={"Максимум 500 символов"}
              value={b2bValueRu}
              onChange={(ev: string) => setB2bValueRu(ev)}
            />
            <FilledButton
              text={"Сохранить изменения"}
              onClick={() => saveRuData()}
            />
          </div>
        ) : currentLanguage === "az" ? (
          <div>
            <TextArea
              title={"Haqqimizda"}
              subtitle={"mətn"}
              maxSymbol={"Maksimum 500 simvol"}
              value={aboutValueAz}
              onChange={(ev: string) => setAboutValueAz(ev)}
            />
            <TextArea
              title={"B2B"}
              subtitle={"mətn"}
              maxSymbol={"Maksimum 500 simvol"}
              value={b2bValueAz}
              onChange={(ev: string) => setB2bValueAz(ev)}
            />
            <FilledButton text={"Yadda saxla"} onClick={() => saveAzData()} />
          </div>
        ) : (
          <div>
            <TextArea
              title={"About Us"}
              subtitle={"text"}
              maxSymbol={"Maximum 500 symbol"}
              value={aboutValueEn}
              onChange={(ev: string) => setAboutValueEn(ev)}
            />
            <TextArea
              title={"B2B"}
              subtitle={"text"}
              maxSymbol={"Maximum 500 symbol"}
              value={b2bValueEn}
              onChange={(ev: string) => setB2bValueEn(ev)}
            />
            <FilledButton text={"Save changes"} onClick={() => saveEnData()} />
          </div>
        )}
      </LaguageSwitcher>
    </div>
  );
};
export default InfoAbout;
