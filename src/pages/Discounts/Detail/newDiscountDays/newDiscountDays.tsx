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
import { Catalog, Discount } from "@/types";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import dayjs from "dayjs";
import { changeArrayByIndex } from "@/utils";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const NewDiscountDays = ({ data }: { data?: Discount }) => {
  const navigate = useNavigate();
  const { trigger, isMutating } = useSWRMutation<
    Discount,
    unknown,
    string,
    Partial<Discount>
  >(data ? discountApis.update(data?.id) : discountApis.create, postData);

  const { trigger: removeTrigger, isMutating: removeIsMutation } =
    useSWRMutation(data ? discountApis.delete(data?.id) : null, getData);
  const [aksiyaName, setAksiyaName] = useState(data?.name || "");
  const [headingValueRu, setHeadingValueRu] = useState(data?.captionRu || "");
  const [subHeadingValueRu, setSubHeadingValueRu] = useState(
    data?.descriptionRu || ""
  );
  const [headingValueAz, setHeadingValueAz] = useState(data?.captionAz || "");
  const [subHeadingAz, setSubHeadingValueAz] = useState(
    data?.descriptionAz || ""
  );
  const [headingValueEn, setHeadingValueEn] = useState(data?.captionEn || "");
  const [subHeadingEn, setSubHeadingValueEn] = useState(
    data?.descriptionEn || ""
  );
  const [catalogId, setCatalogId] = useState(data?.catalogId || "");
  const { currentLanguage } = useContext(LocalizationContext);
  const [img, setImg] = useState(data?.imageBase64 || "");

  const [startAksiyaDate, setStartAksiyaDate] = useState(data?.startDate || "");
  const [endAksiyaDate, setEndAksiyaDate] = useState(data?.endDate || "");
  const [buttonActive, setButtonActive] = useState(
    data?.enableBookButton || false
  );
  const [promotionActive, setPromotionActive] = useState(
    data?.isActive || false
  );

  const [datesList, setDatesList] = useState(
    data?.priceSettings || [
      {
        minDays: 0,
        maxDays: 0,
        pricePerDay: 0,
      },
      {
        minDays: 0,
        maxDays: 0,
        pricePerDay: 0,
      },
      {
        minDays: 0,
        maxDays: 0,
        pricePerDay: 0,
      },
    ]
  );
  const uploadImage = (...event: unknown[]) => {
    setImg(event?.[0] as string);
  };

  const { data: catalogData, isLoading } = useSWR<Catalog[]>(
    catalogApis.search({ isActive: true }),
    getData
  );

  const handleSubmit = async () => {
    const res = await toast.promise(
      trigger({
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
        startDate: startAksiyaDate,
        endDate: endAksiyaDate,
        priceSettings: datesList,
      }),
      {
        pending: "Waiting",
        success: "Action Updated 👌",
        error: "Action Not Update 🤯",
      }
    );

    setTimeout(() => {
      res && navigate("/discounts");
    }, 1);
  };

  const handleDelete = async () => {
    const res = await toast.promise(removeTrigger(), {
      pending: "Waiting",
      success: "Action Deleted 👌",
      error: "Action Not Deleted 🤯",
    });

    setTimeout(() => {
      res && navigate("/discounts");
    }, 1);
  };

  const addDates = () => {
    setDatesList([
      ...datesList,
      {
        minDays: 0,
        maxDays: 0,
        pricePerDay: 0,
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

        <div style={{ display: "flex", gap: "20px" }}>
          <div style={{ width: "100%" }}>
            <label style={{ display: "flex" }}>Начало срока</label>
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
          </div>

          <div style={{ width: "100%" }}>
            <label style={{ display: "flex" }}>Конец срока</label>
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
          </div>
        </div>

        <div className="promoDates">
          <div className="promoDates-titles">
            <p>Начало</p>
            <p>Конец</p>
            <p>Цена за день</p>
          </div>

          <div className="listOfPromoDates">
            {datesList.map((p, index) => {
              return index === 3 ? (
                <div key={index} className="row-date">
                  <input
                    type="text"
                    className="input"
                    value={p.minDays}
                    onChange={(e) =>
                      setDatesList((prev) => {
                        const updateEl = {
                          ...prev[index],
                          minDays: Number(
                            e.target.value
                              .replace(/^0/, "")
                              .replace(/[^\d]+/, "")
                          ),
                        };

                        return changeArrayByIndex(prev, index, updateEl);
                      })
                    }
                  />
                  <input
                    type="text"
                    className="input"
                    value={p.maxDays}
                    onChange={(e) =>
                      setDatesList((prev) => {
                        const updateEl = {
                          ...prev[index],
                          maxDays: Number(
                            e.target.value
                              .replace(/^0/, "")
                              .replace(/[^\d]+/, "")
                          ),
                        };

                        return changeArrayByIndex(prev, index, updateEl);
                      })
                    }
                  />
                  <div className="price-promo">
                    <input
                      type="text"
                      className="price-promo-value"
                      value={p.pricePerDay}
                      onChange={(e) =>
                        setDatesList((prev) => {
                          const updateEl = {
                            ...prev[index],
                            pricePerDay: Number(
                              e.target.value
                                .replace(/^0/, "")
                                .replace(/[^\d]+/, "")
                            ),
                          };
                          return changeArrayByIndex(prev, index, updateEl);
                        })
                      }
                    />
                    <div className="azn">AZN</div>
                  </div>

                  <div
                    className="remove_icon"
                    onClick={() =>
                      setDatesList((prev) => {
                        return prev.slice(0, index);
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
              ) : (
                <div key={index} className="row-date">
                  <input
                    type="text"
                    className="input"
                    value={p.minDays}
                    onChange={(e) =>
                      setDatesList((prev) => {
                        const updateEl = {
                          ...prev[index],
                          minDays: Number(
                            e.target.value
                              .replace(/^0/, "")
                              .replace(/[^\d]+/, "")
                          ),
                        };

                        return changeArrayByIndex(prev, index, updateEl);
                      })
                    }
                  />
                  <input
                    type="text"
                    className="input"
                    value={p.maxDays}
                    onChange={(e) =>
                      setDatesList((prev) => {
                        const updateEl = {
                          ...prev[index],
                          maxDays: Number(
                            e.target.value
                              .replace(/^0/, "")
                              .replace(/[^\d]+/, "")
                          ),
                        };

                        return changeArrayByIndex(prev, index, updateEl);
                      })
                    }
                  />
                  <div className="price-promo">
                    <input
                      type="text"
                      className="price-promo-value"
                      value={p.pricePerDay}
                      onChange={(e) =>
                        setDatesList((prev) => {
                          const updateEl = {
                            ...prev[index],
                            pricePerDay: Number(
                              e.target.value
                                .replace(/^0/, "")
                                .replace(/[^\d]+/, "")
                            ),
                          };
                          return changeArrayByIndex(prev, index, updateEl);
                        })
                      }
                    />
                    <div className="azn">AZN</div>
                  </div>
                </div>
              );
            })}
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
      <div className="right-disc-price-block"></div>
    </div>
  );
};

export default NewDiscountDays;
