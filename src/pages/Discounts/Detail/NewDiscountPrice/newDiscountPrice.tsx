import ImageUpload from "@/components/ui/image-upload/image-upload";
import { useState, useContext } from "react";
import { LocalizationContext } from "@/hooks/customLangHook";
import "./newDiscountPrice.scss";
import OutlinedButton from "@/elements/outlinedButton";
import LaguageSwitcher from "@/elements/laguageSwitcher";
import TextArea from "@/components/ui/textarea/textarea";
import FilledButton from "@/elements/filledButton";

const NewDiscountPrice = () => {
  const [headingValueRu, setHeadingValueRu] = useState("");
  const [subHeadingValueRu, setSubHeadingValueRu] = useState("");
  const [headingValueAz, setHeadingValueAz] = useState("");
  const [subHeadingAz, setSubHeadingValueAz] = useState("");
  const [headingValueEn, setHeadingValueEn] = useState("");
  const [subHeadingEn, setSubHeadingValueEn] = useState("");
  const saveRuData = () => {};
  const saveAzData = () => {};
  const saveEnData = () => {};

  const { currentLanguage, setCurrentLanguage, translate } =
    useContext(LocalizationContext);
  const uploadImg = () => {
    // setValue("");
  };
  const [srok, setSrok] = useState('');
  const [periodPrice, setPeriodPrice] = useState('');
  const [startAksiyaDate, setStartAksiyaDate] = useState();
  const [endAksiyaDate, setEndAksiyaDate] = useState();
 
  
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
        <div className="select__group" style={{marginBottom: 50}}>
          <label>Автомобиль</label>
          <select className="select" onChange={() => {}} required>
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
      <div style={{display:"flex", justifyContent:"space-between"}}>
      <div className="select__group discnt-name"  style={{marginRight: 10}} >
          <label>Срок аренды</label>
          <input
            className="input" 
            value={srok}
            onChange={(event) => setSrok(event.target.value) }
            type="text"
          />
          <label>Начало срока</label>
          <input type="date" name="startDate" id=""
           value={startAksiyaDate} className="startDate"
           onChange={(event) => setStartAksiyaDate(event.target.value) }
          //  min={formattedDate}
            />
          <div  style={{display:"flex", marginTop: 25}}>
            <input type="checkbox" name="" id="" style={{ width:24,height:24,marginRight:10 }}/>
            <p>Включить кнопку</p> 
          </div>
          
        </div>
        <div className="select__group discnt-name">
          <label>Цена за период</label>
          <input
            className="input"
              value={periodPrice}
              onChange={(event) => setPeriodPrice(event.target.value) }
            type="text"
          />
          <label>Конец срока</label>
          <input type="date" 
                 name="endDate"
                 id=""
                 className="endDate"
                 value={endAksiyaDate}
                 onChange={(event) => setStartAksiyaDate(event.target.value) }
                  />
          <div  style={{display:"flex", marginTop: 25}}>
            <div>
              <input type="checkbox" name="" id="" style={{ width:24,height:24,marginRight:10 }} />
              {/* <div style={{backgroundColor: "#F5F5F5"}}>AZN</div> */}
            </div> 
            <p>Включить акцию сейчас</p>
          </div>
           
        </div>
      </div>


      <FilledButton
              text={"Сохранить изменения"}
              onClick={() => saveRuData()}
            />
      </div>
      <div className="right-disc-price-block"></div>
    </div>
  );
};

export default NewDiscountPrice;
