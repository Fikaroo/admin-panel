import { useEffect, useState } from "react";
import "./InfoPartners.scss";
import { changeArrayByIndex, defaultToast } from "@/utils";
import { Partner } from "@/types";
import PartnerItem from "./components/PartnerItem";
import useSWRMutation from "swr/mutation";
import { dynamicContentApis, getData, postData } from "@/api";
import useSWRImmutable from "swr/immutable";
import Loading from "@/components/Loading";

const InfoPartners = () => {
  const { trigger: createPartner, isMutating } = useSWRMutation(
    dynamicContentApis.create,
    postData
  );

  const {
    data: partners,
    isLoading,
    isValidating,
    error,
    mutate,
  } = useSWRImmutable<Partner[]>(
    dynamicContentApis.getArrayByCode("partners"),
    getData
  );
  const [updateItemsIds, setUpdateItemsIds] = useState<string[]>([]);
  const [partnerList, setPartnerList] = useState<Partial<Partner>[]>([]);

  const updateImg = (e: string, name: string, index: number, id?: string) => {
    const current = { contentEn: name || "", data: e, code: "partners" };
    setPartnerList(changeArrayByIndex(partnerList, index, current));
    id && setUpdateItemsIds((prev) => [...prev, id]);
  };

  const addPartner = () => {
    setPartnerList((prev) => [
      ...prev,
      { data: "", code: "partners", contentEn: "" },
    ]);
  };

  const handleSavePartner = () => {
    partnerList
      ?.filter(({ id }) => (id ? updateItemsIds.includes(id) : false))
      ?.map(({ id, ...item }) => {
        id &&
          defaultToast(postData(dynamicContentApis.update(id), { arg: item }));
      });

    partnerList
      ?.filter(({ id }) => !id)
      ?.map((item) => defaultToast(createPartner(item)));

    setUpdateItemsIds([]);
    mutate();
  };
  const handleRemoveByIndex = (deletedIndex: number) =>
    setPartnerList((prev) => prev.filter((_, index) => index !== deletedIndex));

  useEffect(() => {
    partners && setPartnerList(partners);
    console.log(partners);
  }, [partners]);

  if (isLoading || isValidating) return <Loading />;
  if (error) return "No result";

  return (
    <div className="info_partners">
      <div className="lists">
        {partnerList.map((p, index) => (
          <PartnerItem
            key={index}
            handleRemoveByIndex={handleRemoveByIndex}
            updateImg={updateImg}
            index={index}
            {...p}
          />
        ))}
      </div>

      <button
        className="btn btn_add"
        disabled={isMutating}
        onClick={addPartner}
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
        onClick={handleSavePartner}
        className="btn btn_primary"
        disabled={isMutating}
      >
        Сохранить изменения
      </button>
    </div>
  );
};
export default InfoPartners;
