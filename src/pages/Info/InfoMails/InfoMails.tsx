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
    data: orderMails,
    isLoading: orderIsLoading,
    isValidating: orderIsValidating,
    error: orderError,
    mutate: orderMutate,
  } = useSWRImmutable<DynamicContent[]>(
    dynamicContentApis.getArrayByCode("orderMail"),
    getData
  );

  const {
    data: b2BMails,
    isLoading: b2BIsLoading,
    isValidating: b2BIsValidating,
    error: b2BError,
    mutate: b2BMutate,
  } = useSWRImmutable<DynamicContent[]>(
    dynamicContentApis.getArrayByCode("b2bMail"),
    getData
  );

  const [updateItemsOrderIds, setUpdateItemsOrderIds] = useState<string[]>([]);
  const [orderMailList, setOrderMailList] = useState<Partial<DynamicContent>[]>(
    []
  );
  const [updateItemsB2BIds, setUpdateItemsB2BIds] = useState<string[]>([]);
  const [b2bMailList, setB2BMailList] = useState<Partial<DynamicContent>[]>([]);

  const updateOrderMail = (value: string, index: number, id?: string) => {
    const current = { id, data: value, code: "orderMail" };

    setOrderMailList(changeArrayByIndex(orderMailList, index, current));
    id && setUpdateItemsOrderIds((prev) => [...prev, id]);
  };

  const addOrderMail = () => {
    setOrderMailList((prev) => [...prev, { data: "", code: "orderMail" }]);
  };

  const handleSaveOrderMail = () => {
    console.log(updateItemsOrderIds);
    orderMailList
      ?.filter(({ id }) => (id ? updateItemsOrderIds.includes(id) : false))
      ?.map(({ id, ...item }) => {
        console.log(id);
        id &&
          defaultToast(postData(dynamicContentApis.update(id), { arg: item }));
      });

    orderMailList
      ?.filter(({ id }) => !id)
      ?.map((item) => {
        console.log(item);
        item.data && defaultToast(createMail(item));
      });

    setTimeout(() => {
      setUpdateItemsOrderIds([]);
      orderMutate();
    }, 1000);
  };

  const handleRemoveByIndexOrder = (deletedIndex: number) => {
    setOrderMailList((prev) =>
      prev.filter((_, index) => index !== deletedIndex)
    );
    setTimeout(() => {
      orderMutate();
    }, 1000);
  };

  const updateB2BMail = (value: string, index: number, id?: string) => {
    const current = { id, data: value, code: "b2bMail" };

    setB2BMailList(changeArrayByIndex(b2bMailList, index, current));
    id && setUpdateItemsB2BIds((prev) => [...prev, id]);
    console.log(updateItemsB2BIds, updateItemsOrderIds);
  };

  const addB2BMail = () => {
    setB2BMailList((prev) => [...prev, { data: "", code: "b2bMail" }]);
  };

  const handleSaveB2BMail = () => {
    b2bMailList
      ?.filter(({ id }) => (id ? updateItemsB2BIds.includes(id) : false))
      ?.map(({ id, ...item }) => {
        id &&
          defaultToast(postData(dynamicContentApis.update(id), { arg: item }));
      });

    b2bMailList
      ?.filter(({ id }) => !id)
      ?.map((item) => item.data && defaultToast(createMail(item)));

    setTimeout(() => {
      setUpdateItemsB2BIds([]);
      b2BMutate();
    }, 1000);
  };

  const handleRemoveByIndexB2B = (deletedIndex: number) => {
    setB2BMailList((prev) => prev.filter((_, index) => index !== deletedIndex));
    setTimeout(() => {
      b2BMutate();
    }, 1000);
  };

  useEffect(() => {
    orderMails && setOrderMailList(orderMails);
    b2BMails && setB2BMailList(b2BMails);
  }, [
    orderMails,
    orderIsLoading,
    orderIsValidating,
    b2BMails,
    b2BIsLoading,
    b2BIsValidating,
    isMutating,
  ]);

  if (orderIsLoading || orderIsValidating || b2BIsValidating || b2BIsLoading)
    return <Loading />;

  if (orderError || b2BError) return "No result";

  return (
    <div className="info_mails">
      <div className="mails">
        <h1>Заказы</h1>

        <div className="lists">
          {orderMailList.map((mail, index) => (
            <MailItem
              key={index}
              index={index}
              handleRemoveByIndex={handleRemoveByIndexOrder}
              updateMail={updateOrderMail}
              {...mail}
            />
          ))}
        </div>

        <button
          className="btn btn_add"
          disabled={isMutating}
          onClick={addOrderMail}
        >
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
          onClick={handleSaveOrderMail}
          className="btn btn_primary"
          disabled={isMutating}
        >
          Сохранить изменения
        </button>
      </div>

      <div className="mails">
        <h1>B2B</h1>

        <div className="lists">
          {b2bMailList.map((mail, index) => (
            <MailItem
              key={index}
              index={index}
              handleRemoveByIndex={handleRemoveByIndexB2B}
              updateMail={updateB2BMail}
              {...mail}
            />
          ))}
        </div>

        <button
          className="btn btn_add"
          disabled={isMutating}
          onClick={addB2BMail}
        >
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
          onClick={handleSaveB2BMail}
          className="btn btn_primary"
          disabled={isMutating}
        >
          Сохранить изменения
        </button>
      </div>
    </div>
  );
};
export default InfoMails;
