import { useState, useContext } from "react";
import { LocalizationContext } from "@/hooks/customLangHook";
import LaguageSwitcher from "@/elements/laguageSwitcher";
import Input from "@/components/ui/input/input";
import FilledButton from "@/elements/filledButton";

const InfoMain = () => {
  const [phoneValueRu, setPhoneValueRu] = useState("");
  const [emailValueRu, setEmailValueRu] = useState("");
  const [adressMainValueRu, setAdressMainValueRu] = useState("");
  const [adressBranchValueRu, setAdressBranchValueRu] = useState("");

  const [phoneValueAz, setPhoneValueAz] = useState("");
  const [emailValueAz, setEmailValueAz] = useState("");
  const [adressMainValueAz, setAdressMainValueAz] = useState("");
  const [adressBranchValueAz, setAdressBranchValueAz] = useState("");

  const [phoneValueEn, setPhoneValueEn] = useState("");
  const [emailValueEn, setEmailValueEn] = useState("");
  const [adressMainValueEn, setAdressMainValueEn] = useState("");
  const [adressBranchValueEn, setAdressBranchValueEn] = useState("");

  const { currentLanguage, setCurrentLanguage, translate } =
    useContext(LocalizationContext);

  const saveRuData = () => {};
  const saveAzData = () => {};
  const saveEnData = () => {};

  return (
    <div>
      <LaguageSwitcher>
        {currentLanguage === "ru" ? (
          <div>
            <Input
              placeholder={"+994"}
              title={"Номер телефона"}
              value={phoneValueRu}
              onChange={(ev: string) => setPhoneValueRu(ev)}
            />
            <Input
              placeholder={"E-mail"}
              title={"E-mail"}
              value={emailValueRu}
              onChange={(ev: string) => setEmailValueRu(ev)}
            />
            <Input
              placeholder={"Главный адрес"}
              title={"Адрес (главный)"}
              value={adressMainValueRu}
              onChange={(ev: string) => setAdressMainValueRu(ev)}
            />
            <Input
              placeholder={"Филиал"}
              title={"Адрес (филиал)"}
              value={adressBranchValueRu}
              onChange={(ev: string) => setAdressBranchValueRu(ev)}
            />
            <FilledButton
              text={"Сохранить изменения"}
              onClick={() => saveRuData()}
            />
          </div>
        ) : currentLanguage === "az" ? (
          <div>
            <Input
              placeholder={"+994"}
              title={"Mobil nömrə"}
              value={phoneValueAz}
              onChange={(ev: string) => setPhoneValueAz(ev)}
            />
            <Input
              placeholder={"E-mail"}
              title={"E-mail"}
              value={emailValueAz}
              onChange={(ev: string) => setEmailValueAz(ev)}
            />
            <Input
              placeholder={"Əsas ünvan"}
              title={"Ünvan (əsas)"}
              value={adressMainValueAz}
              onChange={(ev: string) => setAdressMainValueAz(ev)}
            />
            <Input
              placeholder={"Filial"}
              title={"Ünvan (filial)"}
              value={adressBranchValueAz}
              onChange={(ev: string) => setAdressBranchValueAz(ev)}
            />
            <FilledButton text={"Yadda saxla"} onClick={() => saveAzData()} />
          </div>
        ) : (
          <div>
            <Input
              placeholder={"+994"}
              title={"Phone number"}
              value={phoneValueEn}
              onChange={(ev: string) => setPhoneValueEn(ev)}
            />
            <Input
              placeholder={"E-mail"}
              title={"E-mail"}
              value={emailValueEn}
              onChange={(ev: string) => setEmailValueEn(ev)}
            />
            <Input
              placeholder={"Main address"}
              title={"Address (main)"}
              value={adressMainValueEn}
              onChange={(ev: string) => setAdressMainValueEn(ev)}
            />
            <Input
              placeholder={"Branch"}
              title={"Address (branch)"}
              value={adressBranchValueEn}
              onChange={(ev: string) => setAdressBranchValueEn(ev)}
            />
            <FilledButton text={"Save changes"} onClick={() => saveEnData()} />
          </div>
        )}
      </LaguageSwitcher>
    </div>
  );
};
export default InfoMain;
