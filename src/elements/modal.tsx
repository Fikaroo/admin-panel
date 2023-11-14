import { Faq, Lang } from "@/types";
import "./modal.scss";
import useSWRMutation from "swr/mutation";
import { faqApis, postData } from "@/api";
import { KeyedMutator } from "swr";

type ModalProps = {
  handleModal: () => void;
  num: number;
  lang: Lang;
  value: Faq;
  setValue: React.Dispatch<React.SetStateAction<Faq>>;
  mutate: KeyedMutator<Faq[]>;
};

const Modal: React.FC<ModalProps> = ({
  handleModal,
  num,
  setValue,
  lang,
  value,
  mutate,
}) => {
  const { trigger } = useSWRMutation(faqApis.create, postData);
  const handleAdd = () => {
    setValue((prev) => ({ ...prev, lang: lang, num: num }));
    trigger(value);
    mutate();
    handleModal();
  };

  return (
    <>
      <div className="modal-bg" onClick={handleModal} />
      <div className="modal">
        <div className="modal-block">
          <div>
            <h2>Добавить вопрос</h2>
          </div>
          <div className="form-child">
            <h3>Вопрос {num || null}</h3>
            <input
              className="input"
              placeholder="Placeholder"
              value={value.question}
              onChange={(e) =>
                setValue((prev) => ({ ...prev, question: e?.target?.value }))
              }
              required
            />
          </div>
          <div className="form-child">
            <h3>Ответ {num || null}</h3>
            <textarea
              className="textarea"
              placeholder="Placeholder"
              value={value.answer}
              onChange={(e) =>
                setValue((prev) => ({ ...prev, answer: e?.target?.value }))
              }
              required
            ></textarea>
            <p>Максимум Х слов</p>
          </div>

          <div className="btn-div">
            <div className="btn btn_primary" onClick={handleAdd}>
              Сохранить изменения
            </div>
          </div>
        </div>
        <div className="icon" onClick={handleModal}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="48"
            height="48"
            viewBox="0 0 48 48"
            fill="none"
          >
            <path
              d="M36 12L12 36M12 12L36 36"
              stroke="white"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </>
  );
};

export default Modal;
