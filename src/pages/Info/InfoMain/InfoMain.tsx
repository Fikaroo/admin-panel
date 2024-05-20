import { useState, useContext, useEffect } from "react";
import { LocalizationContext } from "@/hooks/customLangHook";
import LaguageSwitcher from "@/elements/laguageSwitcher";
import Input from "@/components/ui/input/input";
import FilledButton from "@/elements/filledButton";
import useSWRMutation from "swr/mutation";
import { dynamicContentApis, getDataWithHeader, postData } from "@/api";
import { DynamicContent } from "@/types";
import Loading from "@/components/Loading";
import { defaultToast } from "@/utils";
import useSWRImmutable from "swr/immutable";

const InfoMain = () => {
  const {
    data: phoneNumber,
    isLoading: phoneNumberLoading,
    isValidating: phoneNumberValidationg,
    mutate: phoneNumberMutate,
  } = useSWRImmutable<DynamicContent>(dynamicContentApis.getSingleByCode("phoneNumber"), (path: string) =>
    getDataWithHeader(path, { headers: { "Accept-Language": "" } }),
  );
  const { trigger: savePhoneNumber, isMutating: phoneNumberMutating } = useSWRMutation<
    DynamicContent,
    null,
    string,
    Partial<DynamicContent>
  >(phoneNumber?.id ? dynamicContentApis.update(phoneNumber.id) : dynamicContentApis.create, postData);

  const {
    data: email,
    isLoading: emailLoading,
    isValidating: emailValidationg,
    mutate: emailMutate,
  } = useSWRImmutable<DynamicContent>(dynamicContentApis.getSingleByCode("email"), (path: string) =>
    getDataWithHeader(path, { headers: { "Accept-Language": "" } }),
  );
  const { trigger: saveEmail, isMutating: emailMutating } = useSWRMutation<
    DynamicContent,
    null,
    string,
    Partial<DynamicContent>
  >(email?.id ? dynamicContentApis.update(email.id) : dynamicContentApis.create, postData);

  const {
    data: mainBranch,
    isLoading: mainBranchLoading,
    isValidating: mainBranchValidationg,
    mutate: mainBranchMutate,
  } = useSWRImmutable<DynamicContent>(dynamicContentApis.getSingleByCode("mainBranch"), (path: string) =>
    getDataWithHeader(path, { headers: { "Accept-Language": "" } }),
  );
  const { trigger: saveMainBranch, isMutating: mainBranchMutating } = useSWRMutation<
    DynamicContent,
    null,
    string,
    Partial<DynamicContent>
  >(mainBranch?.id ? dynamicContentApis.update(mainBranch.id) : dynamicContentApis.create, postData);

  const {
    data: branch1,
    isLoading: branch1Loading,
    isValidating: branch1Validationg,
    mutate: branch1Mutate,
  } = useSWRImmutable<DynamicContent>(dynamicContentApis.getSingleByCode("branch1"), (path: string) =>
    getDataWithHeader(path, { headers: { "Accept-Language": "" } }),
  );
  const { trigger: saveBranch1, isMutating: branch1Mutating } = useSWRMutation<
    DynamicContent,
    null,
    string,
    Partial<DynamicContent>
  >(branch1?.id ? dynamicContentApis.update(branch1.id) : dynamicContentApis.create, postData);

  const [phoneValueRu, setPhoneValueRu] = useState(phoneNumber?.contentRu || "");
  const [emailValueRu, setEmailValueRu] = useState(email?.contentRu || "");
  const [adressMainValueRu, setAdressMainValueRu] = useState(mainBranch?.contentRu || "");
  const [adressBranchValueRu, setAdressBranchValueRu] = useState(branch1?.contentRu || "");

  const [phoneValueAz, setPhoneValueAz] = useState(phoneNumber?.contentAz || "");
  const [emailValueAz, setEmailValueAz] = useState(email?.contentAz || "");
  const [adressMainValueAz, setAdressMainValueAz] = useState(mainBranch?.contentAz || "");
  const [adressBranchValueAz, setAdressBranchValueAz] = useState(branch1?.contentAz || "");

  const [phoneValueEn, setPhoneValueEn] = useState(phoneNumber?.contentEn || "");
  const [emailValueEn, setEmailValueEn] = useState(email?.contentEn || "");
  const [adressMainValueEn, setAdressMainValueEn] = useState(mainBranch?.contentEn || "");
  const [adressBranchValueEn, setAdressBranchValueEn] = useState(branch1?.contentEn || "");

  const { currentLanguage } = useContext(LocalizationContext);

  const handleSave = () => {
    if (currentLanguage === "az") {
      phoneValueAz !== phoneNumber?.contentAz &&
        defaultToast(
          savePhoneNumber({
            code: "phoneNumber",
            contentAz: phoneValueAz,
          }),
        );

      emailValueAz !== email?.contentAz &&
        defaultToast(
          saveEmail({
            code: "email",
            contentAz: emailValueAz,
          }),
        );

      adressMainValueAz !== mainBranch?.contentAz &&
        defaultToast(
          saveMainBranch({
            code: "mainBranch",
            contentAz: adressMainValueAz,
          }),
        );

      adressBranchValueAz !== branch1?.contentAz &&
        defaultToast(
          saveBranch1({
            code: "branch1",
            contentAz: adressBranchValueAz,
          }),
        );
    } else if (currentLanguage === "en") {
      phoneValueEn !== phoneNumber?.contentEn &&
        defaultToast(
          savePhoneNumber({
            code: "phoneNumber",
            contentEn: phoneValueEn,
          }),
        );

      emailValueEn !== email?.contentEn &&
        defaultToast(
          saveEmail({
            code: "email",
            contentEn: emailValueEn,
          }),
        );

      adressMainValueEn !== mainBranch?.contentEn &&
        defaultToast(
          saveMainBranch({
            code: "mainBranch",
            contentEn: adressMainValueEn,
          }),
        );

      adressBranchValueEn !== branch1?.contentEn &&
        defaultToast(
          saveBranch1({
            code: "branch1",
            contentEn: adressBranchValueEn,
          }),
        );
    } else if (currentLanguage === "ru") {
      phoneValueRu !== phoneNumber?.contentRu &&
        defaultToast(
          savePhoneNumber({
            code: "phoneNumber",
            contentRu: phoneValueRu,
          }),
        );

      emailValueRu !== email?.contentRu &&
        defaultToast(
          saveEmail({
            code: "email",
            contentRu: emailValueRu,
          }),
        );

      adressMainValueRu !== mainBranch?.contentRu &&
        defaultToast(
          saveMainBranch({
            code: "mainBranch",
            contentRu: adressMainValueRu,
          }),
        );

      adressBranchValueRu !== branch1?.contentRu &&
        defaultToast(
          saveBranch1({
            code: "branch1zz",
            contentRu: adressBranchValueRu,
          }),
        );
    }

    setTimeout(() => {
      if (phoneNumberMutating || emailMutating || mainBranchMutating || branch1Mutating) {
        phoneNumberMutate();
        emailMutate();
        mainBranchMutate();
        branch1Mutate();
      }
    }, 1000);
  };

  useEffect(() => {
    phoneNumber?.contentEn && setPhoneValueEn(phoneNumber?.contentEn);
    phoneNumber?.contentRu && setPhoneValueRu(phoneNumber?.contentRu);
    phoneNumber?.contentAz && setPhoneValueAz(phoneNumber?.contentAz);

    email?.contentEn && setEmailValueEn(email?.contentEn);
    email?.contentRu && setEmailValueRu(email?.contentRu);
    email?.contentAz && setEmailValueAz(email?.contentAz);

    mainBranch?.contentEn && setAdressMainValueEn(mainBranch?.contentEn);
    mainBranch?.contentRu && setAdressMainValueRu(mainBranch?.contentRu);
    mainBranch?.contentAz && setAdressMainValueAz(mainBranch?.contentAz);

    branch1?.contentEn && setAdressBranchValueEn(branch1?.contentEn);
    branch1?.contentRu && setAdressBranchValueRu(branch1?.contentRu);
    branch1?.contentAz && setAdressBranchValueAz(branch1?.contentAz);
  }, [phoneNumber, email, mainBranch, branch1]);

  if (
    phoneNumberLoading ||
    emailLoading ||
    mainBranchLoading ||
    branch1Loading ||
    phoneNumberValidationg ||
    emailValidationg ||
    mainBranchValidationg ||
    branch1Validationg
  )
    return <Loading />;

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
          </div>
        )}
      </LaguageSwitcher>

      <FilledButton
        text={
          currentLanguage === "az"
            ? "Yadda saxla"
            : currentLanguage === "en"
            ? "Save changes"
            : currentLanguage === "ru"
            ? "Сохранить изменения"
            : "Сохранить изменения"
        }
        onClick={() => handleSave()}
        disabled={phoneNumberMutating || emailMutating || mainBranchMutating || branch1Mutating}
      />
    </div>
  );
};
export default InfoMain;
