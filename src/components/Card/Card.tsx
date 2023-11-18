import carIcon from "@/assets/car.svg";
import carSeatIcon from "@/assets/carSeat.svg";
import calendartIcon from "@/assets/calendar.svg";
import userIcon from "@/assets/user.svg";
import transmissionIcon from "@/assets/transmission.svg";
import luggageIcon from "@/assets/luggage.svg";
import ImageIcon from "@/assets/image-icon.svg?react";
import "./Card.scss";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { AutoDetailFormSchema } from "@/pages/Auto/Detail/AutoDetail";
import { enumToMap } from "@/utils";
import { BodyType, SeatMaterialType, TransmissionType } from "@/types";

const findEnumNameForId = (id: number, enumType: object) => {
  return enumToMap(enumType).find(([key]) => Number(key) === id)?.[1];
};

const Card = () => {
  const { watch } = useFormContext<AutoDetailFormSchema>();
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
              (Number(watch().yearOfManufacture) === -1 && "-") ||
              watch().yearOfManufacture ||
              "-",
          },
          {
            id: "bodyType",
            icon: carIcon,
            title:
              findEnumNameForId(Number(watch().bodyType), BodyType) ||
              "-" ||
              watch().bodyType ||
              "-",
          },
        ],
        [
          {
            id: "seatCount",
            icon: userIcon,
            title:
              (Number(watch().seatCount) === -1 && "-") ||
              watch().seatCount ||
              "-",
          },
          {
            id: "luggageCount",
            icon: luggageIcon,
            title:
              (Number(watch().luggageCount) === -1 && "-") ||
              watch().luggageCount ||
              "-",
          },
        ],
        [
          {
            id: "seatMaterialType",
            icon: carSeatIcon,
            title:
              findEnumNameForId(
                Number(watch().seatMaterialType),
                SeatMaterialType
              ) || "-",
          },

          {
            id: "gearType",
            icon: transmissionIcon,
            title:
              findEnumNameForId(Number(watch().gearType), TransmissionType) ||
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
          subtitle: `${watch()?.priceSettings?.[0].minDays}-${
            watch()?.priceSettings?.[0].maxDays
          }  дней`,
          title: watch().priceSettings?.[0]?.pricePerDay || 0,
        },
        {
          id: "secondPrice",
          subtitle: `${watch()?.priceSettings?.[1].minDays}-${
            watch()?.priceSettings?.[1].maxDays
          }  дней`,
          title: watch().priceSettings?.[1]?.pricePerDay || 0,
        },
        {
          id: "thirdPrice",
          subtitle: `${watch()?.priceSettings?.[2].minDays}+  дней`,
          title: watch().priceSettings?.[2]?.pricePerDay || 0,
        },
      ];

      return updatedData;
    });
  }, [
    watch().yearOfManufacture,
    watch().bodyType,
    watch().priceSettings,
    watch().seatCount,
    watch().luggageCount,
    watch().seatMaterialType,
    watch().gearType,
  ]);

  return (
    <div className="card">
      {/* {isPromo && <div className="card-promo">АКЦИЯ</div>} */}
      <div className="card-wrapper">
        <div className="card-header">
          {watch().makeImageBase64 ? (
            <img
              className="car-logo"
              src={watch()?.makeImageBase64 || ""}
              alt="card-logo"
            />
          ) : (
            <div className="car-logo">
              <ImageIcon />
            </div>
          )}
          <p className="card-title">
            {watch().makeName || "Марка авто"} {watch().modelName}
          </p>
        </div>
        {watch().imageBase64 ? (
          <img
            className="car-image"
            src={watch()?.imageBase64 || ""}
            alt="car-image"
          />
        ) : (
          <div className="car-image" style={{ background: "#f5f5f5" }}>
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
