import ImageUpload from "@/components/ui/image-upload/image-upload";
import "./newDiscountPrice.scss";
import OutlinedButton from "@/elements/outlinedButton";

const NewDiscountPrice = () => {
  const uploadImg = () => {
    // setValue("");
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
          <div style={{marginRight: 24}}>
            <ImageUpload
              clsName={"upload-kvadrat-image-container"}
              setValue={() => uploadImg()}
              name="carImg"
              beforeTitle=""
              title=""
              details=""
            />
          </div>
          <div style={{marginRight: 24}}>
             <OutlinedButton icon={""} text={"Добавить фото"} onClick={() => {}} />
          </div>
         <div className="jpg-png-text">JPG or PNG. 1 MB max.</div>
        </div>
        <div className="select__group">
                  <label>Автомобиль</label>
                  <select
                    className="select"
                    
                    onChange={(e) => {
                     
                    }}
                    required
                  >
                    <option value="" disabled selected hidden>
                      Марка
                    </option>
                    {/* {makeData?.map(({ id, name }) => (
                      <option key={id} data-state={name} value={id}>
                        {name}
                      </option>
                    ))} */}
                  </select>
                </div>
      </div>
      <div className="right-disc-price-block"></div>
    </div>
  );
};

export default NewDiscountPrice;
