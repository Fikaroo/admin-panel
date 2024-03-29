import { dynamicContentApis, getData } from "@/api";
import { DynamicContent } from "@/types";
import { defaultToast } from "@/utils";
import useSWRMutation from "swr/mutation";
type MailItemProps = {
  updateMail: (value: string, index: number, id?: string) => void;
  handleRemoveByIndex: (index: number) => void;
  index: number;
} & Partial<DynamicContent>;

const MailItem = ({
  id,
  data,
  index,
  updateMail,
  handleRemoveByIndex,
}: MailItemProps) => {
  const { trigger: removeMail, isMutating } = useSWRMutation(
    id && dynamicContentApis.delete(id),
    getData
  );

  const handleRemoveMail = () => {
    id && defaultToast(removeMail);
    handleRemoveByIndex(index);
  };

  return (
    <div>
      <div className="mail">Mail {index + 1}</div>
      <div className="list-icons">
        <input
          className="input list"
          type="email"
          value={data}
          onChange={(e) => updateMail(e.target.value, index, id)}
          min={1}
        />

        <div className="icons">
          <button
            disabled={isMutating}
            className="remove_icon"
            onClick={handleRemoveMail}
          >
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
          </button>
        </div>
      </div>
    </div>
  );
};

export default MailItem;
