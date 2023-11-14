import ImageUpload from "@/components/ui/image-upload/image-upload";
import { useState, useContext } from "react";
import { LocalizationContext } from "@/hooks/customLangHook";
import "./newDiscountDays.scss";
import OutlinedButton from "@/elements/outlinedButton";
import LaguageSwitcher from "@/elements/laguageSwitcher";
import TextArea from "@/components/ui/textarea/textarea";
import FilledButton from "@/elements/filledButton";
import plusIcon from "@/assets/plusIcon.svg";

const NewDiscountDays = () => {
  const [headingValueRu, setHeadingValueRu] = useState("");
  const [subHeadingValueRu, setSubHeadingValueRu] = useState("");
  const [headingValueAz, setHeadingValueAz] = useState("");
  const [subHeadingAz, setSubHeadingValueAz] = useState("");
  const [headingValueEn, setHeadingValueEn] = useState("");
  const [subHeadingEn, setSubHeadingValueEn] = useState("");
  const saveData = () => {};
  const [datesList, setDatesList] = useState([
    {
      startDate: "",
      endDate: "",
      price: "",
    },
  ]);

  const { currentLanguage, setCurrentLanguage, translate } =
    useContext(LocalizationContext);
  const uploadImg = () => {
    // setValue("");
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
            //   value={}
            //   onChange={(event) => onChange(+event.target.value) }
            type="text"
          />
        </div>
        <div className="upload-photo-block">
          <div style={{ marginRight: 24 }}>
            <ImageUpload
              clsName={"upload-kvadrat-image-container"}
              setValue={() => uploadImg()}
              name="carImg"
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
          <select className="select" onChange={(e) => {}} required>
            <option value="">Марка</option>
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
                <input type="date" className="row-date-end" value={p.endDate} />
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
            />
            <p>Включить кнопку</p>
          </div>
          <div style={{ display: "flex", width: "45%", }}>
            <input
              type="checkbox"
              name=""
              id=""
              style={{ width: 24, height: 24, marginRight: 10 }}
            />
            <p>Включить акцию сейчас</p>
          </div>
        </div>

        <FilledButton text={"Сохранить изменения"} onClick={() => saveData()} />
      </div>
      <div className="right-disc-price-block"></div>
    </div>
  );
};

export default NewDiscountDays;
