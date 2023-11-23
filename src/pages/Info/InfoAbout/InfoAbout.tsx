import { useState, useContext, useEffect } from "react";
import { LocalizationContext } from "@/hooks/customLangHook";
import LaguageSwitcher from "@/elements/laguageSwitcher";
import TextArea from "@/components/ui/textarea/textarea";
import FilledButton from "@/elements/filledButton";
import { dynamicContentApis, getDataWithHeader, postData } from "@/api";
import { DynamicContent } from "@/types";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import { defaultToast } from "@/utils";
import Loading from "@/components/Loading";

const InfoAbout = () => {
  const {
    data: about,
    isLoading: aboutLoading,
    isValidating: aboutValidationg,
    mutate: aboutMutate,
  } = useSWR<DynamicContent>(
    dynamicContentApis.getSingleByCode("about"),
    (path: string) =>
      getDataWithHeader(path, { headers: { "Accept-Language": "" } })
  );
  const { trigger: saveAbout, isMutating: aboutMutating } = useSWRMutation<
    DynamicContent,
    null,
    string,
    Partial<DynamicContent>
  >(
    about?.id ? dynamicContentApis.update(about.id) : dynamicContentApis.create,
    postData
  );

  const {
    data: b2b,
    isLoading: b2bLoading,
    isValidating: b2bValidationg,
    mutate: b2bMutate,
  } = useSWR<DynamicContent>(
    dynamicContentApis.getSingleByCode("b2b"),
    (path: string) =>
      getDataWithHeader(path, { headers: { "Accept-Language": "" } })
  );
  const { trigger: saveB2b, isMutating: b2bMutating } = useSWRMutation<
    DynamicContent,
    null,
    string,
    Partial<DynamicContent>
  >(
    b2b?.id ? dynamicContentApis.update(b2b.id) : dynamicContentApis.create,
    postData
  );

  const [aboutValueRu, setAboutValueRu] = useState(about?.contentRu || "");
  const [b2bValueRu, setB2bValueRu] = useState(b2b?.contentRu || "");
  const [aboutValueAz, setAboutValueAz] = useState(about?.contentAz || "");
  const [b2bValueAz, setB2bValueAz] = useState(b2b?.contentAz || "");
  const [aboutValueEn, setAboutValueEn] = useState(about?.contentEn || "");
  const [b2bValueEn, setB2bValueEn] = useState(b2b?.contentEn || "");

  const { currentLanguage } = useContext(LocalizationContext);

  const handleSave = () => {
    if (currentLanguage === "az") {
      aboutValueAz !== about?.contentAz &&
        defaultToast(
          saveAbout({
            code: "about",
            contentAz: aboutValueAz,
          })
        );

      b2bValueAz !== b2b?.contentAz &&
        defaultToast(
          saveB2b({
            code: "b2b",
            contentAz: b2bValueAz,
          })
        );
    } else if (currentLanguage === "en") {
      aboutValueEn !== about?.contentEn &&
        defaultToast(
          saveAbout({
            code: "about",
            contentEn: aboutValueEn,
          })
        );

      b2bValueEn !== b2b?.contentEn &&
        defaultToast(
          saveB2b({
            code: "b2b",
            contentEn: b2bValueEn,
          })
        );
    } else if (currentLanguage === "ru") {
      aboutValueRu !== about?.contentRu &&
        defaultToast(
          saveAbout({
            code: "about",
            contentRu: aboutValueRu,
          })
        );

      b2bValueRu !== b2b?.contentRu &&
        defaultToast(
          saveB2b({
            code: "b2b",
            contentRu: b2bValueRu,
          })
        );
    }

    setTimeout(() => {
      if (aboutMutating || b2bMutating) {
        aboutMutate();
        b2bMutate();
      }
    }, 1000);
  };

  useEffect(() => {
    about?.contentEn && setAboutValueEn(about?.contentEn);
    about?.contentRu && setAboutValueRu(about?.contentRu);
    about?.contentAz && setAboutValueAz(about?.contentAz);

    b2b?.contentEn && setB2bValueEn(b2b?.contentEn);
    b2b?.contentRu && setB2bValueRu(b2b?.contentRu);
    b2b?.contentAz && setB2bValueAz(b2b?.contentAz);
  }, [about, b2b]);

  if (aboutLoading || b2bLoading || aboutValidationg || b2bValidationg)
    return <Loading />;

  return (
    <div>
      <LaguageSwitcher>
        {currentLanguage === "ru" ? (
          <div>
            <TextArea
              title={"О Нас"}
              subtitle={"текст"}
              maxSymbol={"Максимум 1000 символов"}
              value={aboutValueRu}
              onChange={(ev: string) => setAboutValueRu(ev)}
            />
            <TextArea
              title={"B2B"}
              subtitle={"текст"}
              maxSymbol={"Максимум 1000 символов"}
              value={b2bValueRu}
              onChange={(ev: string) => setB2bValueRu(ev)}
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
        disabled={aboutMutating || b2bMutating}
      />
    </div>
  );
};
export default InfoAbout;
