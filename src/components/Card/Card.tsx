import carIcon from "@/assets/car.svg";
import carSeatIcon from "@/assets/carSeat.svg";
import calendartIcon from "@/assets/calendar.svg";
import userIcon from "@/assets/user.svg";
import transmissionIcon from "@/assets/transmission.svg";
import luggageIcon from "@/assets/luggage.svg";
import ImageIcon from "@/assets/image-icon.svg?react";
import "./Card.scss";
import { AutoDetailForm } from "@/pages/Auto/Detail/AutoDetail";
import { useEffect, useState } from "react";
import { Catalog } from "@/types";

type CardProps = {
  carForm: Partial<AutoDetailForm>;
  carData: Catalog;
};

const Card = ({ carForm, carData }: CardProps) => {
  const [details, setDetails] = useState<
    { id: string; icon: string; title: string | number }[][]
  >([
    [
      {
        id: "yearOfManufacture",
        icon: calendartIcon,
        title: "-",
      },
      {
        id: "bodyType",
        icon: carIcon,
        title: "-",
      },
    ],
    [
      {
        id: "seatCount",
        icon: userIcon,
        title: "-",
      },
      {
        id: "luggageCount",
        icon: luggageIcon,
        title: "-",
      },
    ],
    [
      {
        id: "seatMaterialType",
        icon: carSeatIcon,
        title: "-",
      },

      {
        id: "gearType",
        icon: transmissionIcon,
        title: "-",
      },
    ],
  ]);

  const [prices, setPrices] = useState([
    {
      id: "firstPrice",
      subtitle: "2-7 дней",
      title: 0,
    },
    {
      id: "secondPrice",
      subtitle: "8-21 дней",
      title: 0,
    },
    {
      id: "thirdPrice",
      subtitle: "22+ дней",
      title: 0,
    },
  ]);

  useEffect(() => {
    setDetails(() => {
      const updatedData = [
        [
          {
            id: "yearOfManufacture",
            icon: calendartIcon,
            title:
              (Number(carForm.yearOfManufacture) === -1 && "-") ||
              carForm.yearOfManufacture ||
              "-",
          },
          {
            id: "bodyType",
            icon: carIcon,
            title:
              (Number(carForm.bodyType) === -1 && "-") ||
              carForm.bodyType ||
              "-",
          },
        ],
        [
          {
            id: "seatCount",
            icon: userIcon,
            title:
              (Number(carForm.seatCount) === -1 && "-") ||
              carForm.seatCount ||
              "-",
          },
          {
            id: "luggageCount",
            icon: luggageIcon,
            title:
              (Number(carForm.luggageCount) === -1 && "-") ||
              carForm.luggageCount ||
              "-",
          },
        ],
        [
          {
            id: "seatMaterialType",
            icon: carSeatIcon,
            title:
              (Number(carForm.seatMaterialType) === -1 && "-") ||
              carForm.seatMaterialType ||
              "-",
          },

          {
            id: "gearType",
            icon: transmissionIcon,
            title:
              (Number(carForm.gearType) === -1 && "-") ||
              carForm.gearType ||
              "-",
          },
        ],
      ];

      return updatedData;
    });

    setPrices(() => {
      const updatedData = [
        {
          id: "firstPrice",
          subtitle: `${carData?.priceSettings?.[0].minDays || "2"}-${
            carData?.priceSettings?.[0].maxDays || "7"
          }  дней`,
          title: carForm.firstPrice || 0,
        },
        {
          id: "secondPrice",
          subtitle: `${carData?.priceSettings?.[1].minDays || "8"}-${
            carData?.priceSettings?.[1].maxDays || "21"
          }  дней`,
          title: carForm.secondPrice || 0,
        },
        {
          id: "thirdPrice",
          subtitle: `${carData?.priceSettings?.[2].minDays || "22"}+${
            carData?.priceSettings?.[2].maxDays || ""
          }  дней`,
          title: carForm.thirdPrice || 0,
        },
      ];

      return updatedData;
    });
  }, [carData?.priceSettings, carForm]);

  return (
    <div className="card">
      {/* {isPromo && <div className="card-promo">АКЦИЯ</div>} */}
      <div className="card-wrapper">
        <div className="card-header">
          {carForm.carLogoImg ? (
            <img
              className="car-logo"
              src={carForm.carLogoImg}
              alt="card-logo"
            />
          ) : (
            <div className="car-logo">
              <ImageIcon />
            </div>
          )}
          <p className="card-title">
            {carForm.make || "Марка авто"} {carForm.model}
          </p>
        </div>
        {carForm.carImg ? (
          <img className="car-image" src={carForm.carImg} alt="car-image" />
        ) : (
          <div className="car-image">
            <ImageIcon />
          </div>
        )}
        <div className="details">
          {details.map((detail, index) => (
            <div className="detail-container" key={index}>
              {detail.map(({ icon, title }, index) => (
                <div className="detail" key={index}>
                  <img
                    className="detail-icon"
                    src={icon}
                    alt={title.toString()}
                  />
                  <p className="detail-title">{title}</p>
                </div>
              ))}
            </div>
          ))}
        </div>

        <div className="divider" />

        <div className="prices">
          {prices.map(({ title, subtitle }, index) => (
            <div className="price" key={index}>
              <p className="subtitle">{subtitle}</p>
              <p className="title">{title}₼</p>
            </div>
          ))}
        </div>

        <div className="book__btn">BOOK NOW</div>
      </div>
    </div>
  );
};

export default Card;
