import useSWRMutation from "swr/mutation";

import { faqApis, getData } from "@/api";
import { Faq } from "@/types";
import { KeyedMutator } from "swr";

type FaqItemProps = {
  handleEdit: (data: Faq) => void;
  mutate: KeyedMutator<Faq[]>;
} & Faq;

const FaqItem = ({
  num,
  question,
  answer,
  lang,
  handleEdit,
  mutate,
}: FaqItemProps) => {
  const { trigger } = useSWRMutation(faqApis.delete(num, lang), getData);
  const handleRemoveFaq = () => {
    trigger();
    mutate();
  };
  return (
    <div className="list" key={num}>
      <div className="index">{num}.</div>

      <div className="list_body">
        <div className="question">{question}</div>
        <div className="answer">{answer}</div>
      </div>

      <div className="icons">
        <div
          className="edit_icon"
          onClick={() =>
            handleEdit({
              question,
              answer,
              num,
              lang: lang,
            })
          }
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
          >
            <g clip-path="url(#clip0_748_6792)">
              <path
                d="M1.91744 12.0766C1.94807 11.801 1.96339 11.6632 2.00509 11.5343C2.04209 11.42 2.09437 11.3113 2.16051 11.211C2.23505 11.0979 2.33311 10.9999 2.52923 10.8037L11.3334 1.99955C12.0698 1.26317 13.2637 1.26317 14.0001 1.99955C14.7365 2.73593 14.7365 3.92984 14.0001 4.66622L5.1959 13.4704C4.99978 13.6665 4.90172 13.7646 4.78867 13.8391C4.68838 13.9053 4.57961 13.9575 4.46531 13.9945C4.33648 14.0362 4.19865 14.0516 3.92299 14.0822L1.66675 14.3329L1.91744 12.0766Z"
                stroke="#737373"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </g>
            <defs>
              <clipPath id="clip0_748_6792">
                <rect width="16" height="16" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </div>
        <div className="remove_icon" onClick={handleRemoveFaq}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
          >
            <path
              d="M10.6667 3.99967V3.46634C10.6667 2.7196 10.6667 2.34624 10.5213 2.06102C10.3935 1.81014 10.1895 1.60616 9.93865 1.47833C9.65344 1.33301 9.28007 1.33301 8.53333 1.33301H7.46667C6.71993 1.33301 6.34656 1.33301 6.06135 1.47833C5.81046 1.60616 5.60649 1.81014 5.47866 2.06102C5.33333 2.34624 5.33333 2.7196 5.33333 3.46634V3.99967M6.66667 7.66634V10.9997M9.33333 7.66634V10.9997M2 3.99967H14M12.6667 3.99967V11.4663C12.6667 12.5864 12.6667 13.1465 12.4487 13.5743C12.2569 13.9506 11.951 14.2566 11.5746 14.4484C11.1468 14.6663 10.5868 14.6663 9.46667 14.6663H6.53333C5.41323 14.6663 4.85318 14.6663 4.42535 14.4484C4.04903 14.2566 3.74307 13.9506 3.55132 13.5743C3.33333 13.1465 3.33333 12.5864 3.33333 11.4663V3.99967"
              stroke="#FF4B3C"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default FaqItem;
