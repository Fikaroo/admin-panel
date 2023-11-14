import { useContext, useEffect, useState } from "react";
import LaguageSwitcher from "@/elements/laguageSwitcher";
import "./InfoFaq.scss";
import Modal from "@/elements/modal";
import useSWR from "swr";
import { faqApis, getDataWithHeader } from "@/api";
import { LocalizationContext } from "@/hooks/customLangHook";
import { Faq, Lang } from "@/types";
import FaqItem from "./components/FaqItem";

const InfoFaq = () => {
  const [faq, setFaq] = useState<Faq>({
    num: 0,
    question: "",
    answer: "",
    lang: Lang.Ru,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { currentLanguage } = useContext(LocalizationContext);

  const { data: faqList, mutate } = useSWR<Faq[]>(
    faqApis.search({ localize: true }),
    (arg: string) =>
      getDataWithHeader(arg, {
        headers: { "Accept-Language": currentLanguage },
      })
  );

  useEffect(() => {
    mutate();
  }, [currentLanguage, mutate]);

  const handleModalOpen = () => setIsModalOpen(!isModalOpen);

  const handleAddFaq = () => {
    setFaq({
      lang: currentLanguage,
      num: (faqList && faqList?.length + 1) || 0,
      answer: "",
      question: "",
    });
    handleModalOpen();
  };

  const handleEditFaq = (data: Faq) => {
    setFaq(data);
    handleModalOpen();
  };

  return (
    <div className="info_faq">
      <LaguageSwitcher>
        <div className="lists">
          {faqList?.map((item) => (
            <FaqItem mutate={mutate} handleEdit={handleEditFaq} {...item} />
          ))}
        </div>

        <div className="btn btn_add" onClick={handleAddFaq}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
          >
            <path
              d="M9.99984 4.16699V15.8337M4.1665 10.0003H15.8332"
              stroke="#141414"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>{" "}
          Добавить вопрос
        </div>
      </LaguageSwitcher>

      {/* <div className="btn btn_primary">Сохранить изменения</div> */}

      {isModalOpen && (
        <Modal
          mutate={mutate}
          num={faq.num}
          handleModal={handleModalOpen}
          lang={currentLanguage}
          setValue={setFaq}
          value={faq}
        />
      )}
    </div>
  );
};
export default InfoFaq;
