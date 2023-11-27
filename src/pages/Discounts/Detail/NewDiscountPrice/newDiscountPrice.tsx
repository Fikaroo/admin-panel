import ImageUpload from "@/components/ui/image-upload/image-upload";
import { useState, useContext } from "react";
import { LocalizationContext } from "@/hooks/customLangHook";
import "./newDiscountPrice.scss";
import OutlinedButton from "@/elements/outlinedButton";
import LaguageSwitcher from "@/elements/laguageSwitcher";
import TextArea from "@/components/ui/textarea/textarea";
import FilledButton from "@/elements/filledButton";
import dayjs from "dayjs";
import useSWRMutation from "swr/mutation";
import { catalogApis, discountApis, getData, postData } from "@/api";
import { Catalog, Discount } from "@/types";
import useSWR from "swr";
import { useNavigate } from "react-router-dom";
import { defaultToast } from "@/utils";
import photoHertz from "@/assets/HertzNotebook.png";

const NewDiscountPrice = ({ data }: { data?: Discount }) => {
  const navigate = useNavigate();
  const { trigger, isMutating } = useSWRMutation<
    Discount,
    unknown,
    string,
    Partial<Discount>
  >(data ? discountApis.update(data?.id) : discountApis.create, postData);

  const {
    trigger: removeTrigger,
    isMutating: removeIsMutation,
    error,
  } = useSWRMutation(data ? discountApis.delete(data?.id) : null, getData);
  const [aksiyaName, setAksiyaName] = useState(data?.name || "");
  const [headingValueRu, setHeadingValueRu] = useState(data?.captionRu || "");
  const [subHeadingValueRu, setSubHeadingValueRu] = useState(
    data?.descriptionRu || ""
  );
  const [headingValueAz, setHeadingValueAz] = useState(data?.captionAz || "");
  const [subHeadingValueAz, setSubHeadingValueAz] = useState(
    data?.descriptionAz || ""
  );
  const [headingValueEn, setHeadingValueEn] = useState(data?.captionEn || "");
  const [subHeadingValueEn, setSubHeadingValueEn] = useState(
    data?.descriptionEn || ""
  );
  const [catalogId, setCatalogId] = useState(data?.catalogId || "");
  const { currentLanguage } = useContext(LocalizationContext);
  const [img, setImg] = useState(data?.imageBase64 || "");
  const [srok, setSrok] = useState(data?.priceSettings?.[0].minDays || 0);
  const [periodPrice, setPeriodPrice] = useState(
    data?.priceSettings?.[0].pricePerDay || 0
  );
  const [startAksiyaDate, setStartAksiyaDate] = useState(data?.startDate || "");
  const [endAksiyaDate, setEndAksiyaDate] = useState(data?.endDate || "");
  const [buttonActive, setButtonActive] = useState(
    data?.enableBookButton || false
  );
  const [promotionActive, setPromotionActive] = useState(
    data?.isActive || false
  );

  const uploadImage = (...event: unknown[]) => {
    setImg(event?.[0] as string);
  };

  const { data: catalogData, isLoading } = useSWR<Catalog[]>(
    catalogApis.search({ isActive: true }),
    getData
  );

  const handleSubmit = async () => {
    const res = await defaultToast(
      trigger(
        catalogId
          ? {
              type: 1,
              name: aksiyaName,
              captionAz: headingValueAz,
              captionEn: headingValueEn,
              captionRu: headingValueRu,
              descriptionAz: subHeadingValueAz,
              descriptionRu: subHeadingValueRu,
              descriptionEn: subHeadingValueEn,
              enableBookButton: buttonActive,
              catalogId,
              isActive: promotionActive,
              imageBase64: img,
              startDate: startAksiyaDate,
              endDate: endAksiyaDate,
              priceSettings: [
                {
                  minDays: srok,
                  pricePerDay: periodPrice,
                },
              ],
            }
          : {
              type: 1,
              name: aksiyaName,
              captionAz: headingValueAz,
              captionEn: headingValueEn,
              captionRu: headingValueRu,
              descriptionAz: subHeadingValueAz,
              descriptionRu: subHeadingValueRu,
              descriptionEn: subHeadingValueEn,
              enableBookButton: buttonActive,
              isActive: promotionActive,
              imageBase64: img,
              startDate: startAksiyaDate,
              endDate: endAksiyaDate,
              priceSettings: [
                {
                  minDays: srok,
                  pricePerDay: periodPrice,
                },
              ],
            }
      )
    );
    setTimeout(async () => {
      res && navigate("/discounts");
    }, 1000);
  };

  const handleDelete = async () => {
    defaultToast(removeTrigger());

    setTimeout(() => {
      !error && navigate("/discounts");
    }, 1);
  };

  return (
    <div className="all-disc-price">
      <div className="left-disc-price-block">
        <div className="select__group discnt-name">
          <label>Название акции</label>
          <input
            className="input"
            value={aksiyaName}
            onChange={(event) => setAksiyaName(event.target.value)}
            type="text"
          />
        </div>
        <div className="upload-photo-block">
          <div style={{ marginRight: 24 }}>
            <ImageUpload
              clsName={"upload-kvadrat-image-container"}
              onChange={uploadImage}
              beforeTitle=""
              title=""
              details=""
            />
          </div>

          <div className="jpg-png-text">JPG or PNG.</div>
        </div>
        <div className="select__group" style={{ marginBottom: 50 }}>
          <label>Автомобиль</label>
          <select
            className="select"
            disabled={isLoading}
            onChange={(e) => {
              setCatalogId(e.target.value);
            }}
            value={catalogId}
            required
          >
            <option hidden selected>
              Марка
            </option>
            {catalogData?.map(({ id, nameEn }) => (
              <option value={id} key={id}>
                {nameEn}
              </option>
            ))}
            {/* {makeData?.map(({ id, name }) => (
                      <option key={id} data-state={name} value={id}>
                        {name}
                      </option>
                    ))} */}
          </select>
        </div>
        <LaguageSwitcher>
          {currentLanguage === "ru" ? (
            <div>
              <TextArea
                title={""}
                subtitle={"Заголовок"}
                maxSymbol={"Максимум 1000 символов"}
                value={headingValueRu}
                onChange={(ev: string) => setHeadingValueRu(ev)}
              />
              <TextArea
                title={""}
                subtitle={"Подзаголовок"}
                maxSymbol={"Максимум 1000 символов"}
                value={subHeadingValueRu}
                onChange={(ev: string) => setSubHeadingValueRu(ev)}
              />
            </div>
          ) : currentLanguage === "az" ? (
            <div>
              <TextArea
                title={""}
                subtitle={"Başlıq"}
                maxSymbol={"Maksimum 500 simvol"}
                value={headingValueAz}
                onChange={(ev: string) => setHeadingValueAz(ev)}
              />
              <TextArea
                title={""}
                subtitle={"Alt başlıq"}
                maxSymbol={"Maksimum 500 simvol"}
                value={subHeadingValueAz}
                onChange={(ev: string) => setSubHeadingValueAz(ev)}
              />
            </div>
          ) : (
            <div>
              <TextArea
                title={""}
                subtitle={"Heading"}
                maxSymbol={"Maximum 500 symbol"}
                value={headingValueEn}
                onChange={(ev: string) => setHeadingValueEn(ev)}
              />
              <TextArea
                title={""}
                subtitle={"Sub heading"}
                maxSymbol={"Maximum 500 symbol"}
                value={subHeadingValueEn}
                onChange={(ev: string) => setSubHeadingValueEn(ev)}
              />
            </div>
          )}
        </LaguageSwitcher>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div
            className="select__group discnt-name"
            style={{ marginRight: 10 }}
          >
            <label>Срок аренды</label>
            <input
              className="input"
              value={srok}
              onChange={(e) =>
                setSrok(
                  Number(e.target.value.replace(/^0/, "").replace(/[^\d]+/, ""))
                )
              }
              type="text"
            />
            <label>Начало срока</label>
            <input
              type="date"
              name="startDate"
              id=""
              value={dayjs(startAksiyaDate).format("YYYY-MM-DD")}
              className="startDate"
              onChange={(event) =>
                setStartAksiyaDate(dayjs(event.target.value).toJSON())
              }
              min={dayjs().format("YYYY-MM-DD")}
            />
            <div style={{ display: "flex", marginTop: 25 }}>
              <input
                checked={buttonActive}
                onChange={(e) => setButtonActive(e.target.checked)}
                type="checkbox"
                name=""
                id=""
                style={{ width: 24, height: 24, marginRight: 10 }}
              />
              <p>Включить кнопку</p>
            </div>
          </div>
          <div className="select__group discnt-name">
            <label>Цена за период</label>
            <input
              className="input"
              value={periodPrice}
              onChange={(e) =>
                setPeriodPrice(
                  Number(e.target.value.replace(/^0/, "").replace(/[^\d]+/, ""))
                )
              }
              type="text"
            />
            <label>Конец срока</label>
            <input
              type="date"
              name="endDate"
              id=""
              className="endDate"
              value={dayjs(endAksiyaDate).format("YYYY-MM-DD")}
              onChange={(event) =>
                setEndAksiyaDate(dayjs(event.target.value).toJSON())
              }
              min={dayjs(startAksiyaDate).format("YYYY-MM-DD")}
            />
            <div style={{ display: "flex", marginTop: 25 }}>
              <div>
                <input
                  checked={promotionActive}
                  onChange={(e) => setPromotionActive(e.target.checked)}
                  type="checkbox"
                  name=""
                  id=""
                  style={{ width: 24, height: 24, marginRight: 10 }}
                />
                {/* <div style={{backgroundColor: "#F5F5F5"}}>AZN</div> */}
              </div>
              <p>Включить акцию сейчас</p>
            </div>
          </div>
        </div>
        {data ? (
          <div className="btn_group">
            <OutlinedButton
              full
              text={"Удалить"}
              onClick={handleDelete}
              disabled={isMutating || removeIsMutation}
            />
            <FilledButton
              full
              text={"Сохранить изменения"}
              onClick={handleSubmit}
              disabled={isMutating || removeIsMutation}
            />
          </div>
        ) : (
          <FilledButton
            text={"Сохранить изменения"}
            onClick={handleSubmit}
            disabled={isMutating || removeIsMutation}
          />
        )}
      </div>
      <div className="right-disc-price-block">
        <img src={photoHertz} />
        <div className="frontPhotoHertz">
          <img src={img || ""} className="fr" />
          <div className="allHeadingAndSub">
            <div>
              {currentLanguage === "az"
                ? subHeadingValueAz
                : currentLanguage === "en"
                ? headingValueEn
                : headingValueRu}
            </div>
            <div>
              {currentLanguage === "az"
                ? subHeadingValueAz
                : currentLanguage === "en"
                ? subHeadingValueEn
                : subHeadingValueRu}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewDiscountPrice;
