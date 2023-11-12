import { useState } from "react";
import "./InfoPartners.scss";

const InfoPartners = () => {
  const [img, setImg] = useState<File>();
  const [partnerList, setPartnerList] = useState(["TTI-logo.jpg"]);

  const handleImg = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.files?.[0] && setImg(e.target.files?.[0]);

    if (e.target.files?.[0]) {
      e.target.value = e.target.files?.[0].name;
    }
  };

  const addPartner = () => {
    setPartnerList([...partnerList, " "]);
  };

  return (
    <div className="info_partners">
      <div className="lists">
        {partnerList.map((p, index) => (
          <div key={index}>
            <div className="partner">Партнер {index + 1}</div>
            <div className="list-icons">
              <input className="list" value={img ? img.name : ""} disabled />

              <div className="icons">
                <label htmlFor="upload_img" className="upload_img">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M8 16L12 12M12 12L16 16M12 12V21M20 16.7428C21.2215 15.734 22 14.2079 22 12.5C22 9.46243 19.5376 7 16.5 7C16.2815 7 16.0771 6.886 15.9661 6.69774C14.6621 4.48484 12.2544 3 9.5 3C5.35786 3 2 6.35786 2 10.5C2 12.5661 2.83545 14.4371 4.18695 15.7935"
                      stroke="#424242"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  <input
                    onChange={handleImg}
                    type="file"
                    id="upload_img"
                    className="edit_icon"
                    required
                  />
                </label>

                <div className="remove_icon">
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
            </div>
          </div>
        ))}
      </div>

      <div className="btn btn_add" onClick={addPartner}>
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
        </svg>{" "}
        Добавить партнера
      </div>

      <div className="btn btn_primary">Сохранить изменения</div>
    </div>
  );
};
export default InfoPartners;
