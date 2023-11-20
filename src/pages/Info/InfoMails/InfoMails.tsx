import { useEffect, useState } from "react";
import "./InfoMails.scss";
import { changeArrayByIndex, defaultToast } from "@/utils";
import { DynamicContent } from "@/types";
import useSWRMutation from "swr/mutation";
import { dynamicContentApis, getData, postData } from "@/api";
import useSWRImmutable from "swr/immutable";
import Loading from "@/components/Loading";
import MailItem from "./components/MailItem";

const InfoMails = () => {
  const { trigger: createMail, isMutating } = useSWRMutation(
    dynamicContentApis.create,
    postData
  );

  const {
    data: mails,
    isLoading,
    isValidating,
    error,
    mutate,
  } = useSWRImmutable<DynamicContent[]>(
    dynamicContentApis.getArrayByCode("mail"),
    getData
  );
  const [updateItemsIds, setUpdateItemsIds] = useState<string[]>([]);
  const [mailList, setMailList] = useState<Partial<DynamicContent>[]>([]);

  const updateMail = (value: string, index: number, id?: string) => {
    const current = { data: value, code: "mail" };

    setMailList(changeArrayByIndex(mailList, index, current));
    id && setUpdateItemsIds((prev) => [...prev, id]);
  };

  const addMail = () => {
    setMailList((prev) => [...prev, { data: "", code: "mail" }]);
  };

  const handleSaveMail = () => {
    mailList
      ?.filter(({ id }) => (id ? updateItemsIds.includes(id) : false))
      ?.map(({ id, ...item }) => {
        id &&
          defaultToast(postData(dynamicContentApis.update(id), { arg: item }));
      });

    mailList
      ?.filter(({ id }) => !id)
      ?.map((item) => item.data && defaultToast(createMail(item)));

    setTimeout(() => {
      setUpdateItemsIds([]);
      mutate();
    }, 1);
  };

  const handleRemoveByIndex = (deletedIndex: number) => {
    setMailList((prev) => prev.filter((_, index) => index !== deletedIndex));
    setTimeout(() => {
      mutate();
    }, 1);
  };

  useEffect(() => {
    mails && setMailList(mails);
  }, [mails, isValidating, isMutating, isLoading]);

  if (isLoading || isValidating) return <Loading />;
  if (error) return "No result";

  return (
    <div className="info_mails">
      <div className="lists">
        {mailList.map((mail, index) => (
          <MailItem
            key={index}
            index={index}
            handleRemoveByIndex={handleRemoveByIndex}
            updateMail={updateMail}
            {...mail}
          />
        ))}
      </div>

      <button className="btn btn_add" disabled={isMutating} onClick={addMail}>
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
        </svg>
        Добавить партнера
      </button>

      <button
        onClick={handleSaveMail}
        className="btn btn_primary"
        disabled={isMutating}
      >
        Сохранить изменения
      </button>
    </div>
  );
};
export default InfoMails;
