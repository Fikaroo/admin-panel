import ImageUpload from "@/components/ui/image-upload/image-upload";
import { useState, useContext } from "react";
import { LocalizationContext } from "@/hooks/customLangHook";
import "./newDiscountDays.scss";
import OutlinedButton from "@/elements/outlinedButton";
import LaguageSwitcher from "@/elements/laguageSwitcher";
import TextArea from "@/components/ui/textarea/textarea";
import FilledButton from "@/elements/filledButton";
import plusIcon from "@/assets/plusIcon.svg";
import { catalogApis, discountApis, getData, postData } from "@/api";
import { Catalog } from "@/types";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import dayjs from "dayjs";

const NewDiscountDays = () => {
  const { trigger } = useSWRMutation(discountApis.create, postData);

  const [headingValueRu, setHeadingValueRu] = useState("");
  const [subHeadingValueRu, setSubHeadingValueRu] = useState("");
  const [headingValueAz, setHeadingValueAz] = useState("");
  const [subHeadingAz, setSubHeadingValueAz] = useState("");
  const [headingValueEn, setHeadingValueEn] = useState("");
  const [subHeadingEn, setSubHeadingValueEn] = useState("");
  const [img, setImg] = useState("");
  const [buttonActive, setButtonActive] = useState(false);
  const [promotionActive, setPromotionActive] = useState(false);
  const [aksiyaName, setAksiyaName] = useState("");
  const [catalogId, setCatalogId] = useState("");

  const [datesList, setDatesList] = useState([
    {
      startDate: "",
      endDate: "",
      price: "",
    },
  ]);

  const { currentLanguage } = useContext(LocalizationContext);
  const uploadImage = (...event: unknown[]) => {
    setImg(event?.[0] as string);
  };

  const { data: catalogData, isLoading } = useSWR<Catalog[]>(
    catalogApis.search({ isActive: true }),
    getData
  );

  const handleSubmit = async () => {
    console.log(
      await trigger({
        type: 2,
        name: aksiyaName,
        captionAz: headingValueAz,
        captionEn: headingValueEn,
        captionRu: headingValueRu,
        descriptionAz: subHeadingAz,
        descriptionRu: subHeadingValueRu,
        descriptionEn: subHeadingEn,
        enableBookButton: buttonActive,
        catalogId: catalogId,
        isActive: promotionActive,
        imageBase64: img,
        // startDate: startAksiyaDate,
        // endDate: endAksiyaDate,
        priceSettings: [
          {
            minDays: 1,
            maxDays: 7,
            pricePerDay: 30,
          },
          {
            minDays: 8,
            maxDays: 15,
            pricePerDay: 25,
          },
          {
            minDays: 15,
            maxDays: 30,
            pricePerDay: 20,
          },
          {
            minDays: 31,
            pricePerDay: 15,
          },
        ],
      })
    );
  };

  const addDates = () => {
    setDatesList([
      ...datesList,
      {
        startDate: "",
        endDate: "",
        price: "",
      },
    ]);
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
            //   value={}
            //   onChange={(event) => onChange(+event.target.value) }
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
          <div style={{ marginRight: 24 }}>
            <OutlinedButton
              icon={""}
              text={"Добавить фото"}
              onClick={() => {}}
            />
          </div>
          <div className="jpg-png-text">JPG or PNG. 1 MB max.</div>
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
                maxSymbol={"Максимум 500 символов"}
                value={headingValueRu}
                onChange={(ev: string) => setHeadingValueRu(ev)}
              />
              <TextArea
                title={""}
                subtitle={"Подзаголовок"}
                maxSymbol={"Максимум 500 символов"}
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
                value={subHeadingAz}
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
                value={subHeadingEn}
                onChange={(ev: string) => setSubHeadingValueEn(ev)}
              />
            </div>
          )}
        </LaguageSwitcher>

        <div className="promoDates">
          <div className="promoDates-titles">
            <p>Начало</p>
            <p>Конец</p>
            <p>Цена за день</p>
          </div>

          <div className="listOfPromoDates">
            {datesList.map((p, index) => (
              <div key={index} className="row-date">
                <input
                  type="date"
                  className="row-date-start"
                  value={p.startDate}
                />
                <input
                  type="date"
                  className="row-date-end"
                  value={dayjs(p.endDate).format("YYYY-MM-DD")}
                  // onChange={(e) =>
                  //   setDatesList([
                  //     {
                  //       ...datesList?.at(index),
                  //       endDate: dayjs(e.target.value).toJSON(),
                  //     },
                  //   ])
                  // }
                />
                <div className="price-promo">
                  <input
                    type="text"
                    className="price-promo-value"
                    value={p.price}
                  />
                  <div className="azn">AZN</div>
                </div>
              </div>
            ))}
          </div>
          <OutlinedButton
            icon={plusIcon}
            text={"Добавить"}
            onClick={addDates}
          />
        </div>
        <div style={{ display: "flex", marginBlock: 32 }}>
          <div style={{ display: "flex", width: "45%", marginRight: 32 }}>
            <input
              type="checkbox"
              name=""
              id=""
              style={{ width: 24, height: 24, marginRight: 10 }}
              checked={buttonActive}
              onChange={(e) => setButtonActive(e.target.checked)}
            />
            <p>Включить кнопку</p>
          </div>
          <div style={{ display: "flex", width: "45%" }}>
            <input
              type="checkbox"
              name=""
              id=""
              style={{ width: 24, height: 24, marginRight: 10 }}
              onChange={(e) => setPromotionActive(e.target.checked)}
              checked={promotionActive}
            />
            <p>Включить акцию сейчас</p>
          </div>
        </div>

        <FilledButton text={"Сохранить изменения"} onClick={handleSubmit} />
      </div>
      <div className="right-disc-price-block"></div>
    </div>
  );
};

export default NewDiscountDays;
