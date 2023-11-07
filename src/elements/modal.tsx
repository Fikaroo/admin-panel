import { FaqList } from "@/pages/Info/InfoFaq/InfoFaq";
import "./modal.scss";

type ModalProps = {
  handleModal: () => void;
  index: number;
  value: FaqList;
  setValue: React.Dispatch<React.SetStateAction<FaqList>>;
};

const Modal: React.FC<ModalProps> = ({
  handleModal,
  index,
  setValue,
  value,
}) => {
  return (
    <>
      <div className="modal-bg" onClick={handleModal} />
      <div className="modal">
        <div className="modal-block">
          <div>
            <h2>Добавить вопрос</h2>
          </div>
          <div className="form-child">
            <h3>Вопрос {index || null}</h3>
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
            <h3>Ответ {index || null}</h3>
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
            <div className="btn btn_primary">Сохранить изменения</div>
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
