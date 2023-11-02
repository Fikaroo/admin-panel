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

type CardProps = Partial<AutoDetailForm>;

const Card = (props: CardProps) => {
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
      id: "firstPrice",
      subtitle: "8-21 дней",
      title: 0,
    },
    {
      id: "firstPrice",
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
              (Number(props.yearOfManufacture) === -1 && "-") ||
              props.yearOfManufacture ||
              "-",
          },
          {
            id: "bodyType",
            icon: carIcon,
            title:
              (Number(props.bodyType) === -1 && "-") || props.bodyType || "-",
          },
        ],
        [
          {
            id: "seatCount",
            icon: userIcon,
            title:
              (Number(props.seatCount) === -1 && "-") || props.seatCount || "-",
          },
          {
            id: "luggageCount",
            icon: luggageIcon,
            title:
              (Number(props.luggageCount) === -1 && "-") ||
              props.luggageCount ||
              "-",
          },
        ],
        [
          {
            id: "seatMaterialType",
            icon: carSeatIcon,
            title:
              (Number(props.seatMaterialType) === -1 && "-") ||
              props.seatMaterialType ||
              "-",
          },

          {
            id: "gearType",
            icon: transmissionIcon,
            title:
              (Number(props.gearType) === -1 && "-") || props.gearType || "-",
          },
        ],
      ];

      return updatedData;
    });

    setPrices(() => {
      const updatedData = [
        {
          id: "firstPrice",
          subtitle: "2-7 дней",
          title: props.firstPrice || 0,
        },
        {
          id: "firstPrice",
          subtitle: "8-21 дней",
          title: props.secondPrice || 0,
        },
        {
          id: "firstPrice",
          subtitle: "22+ дней",
          title: props.thirdPrice || 0,
        },
      ];

      return updatedData;
    });
  }, [props]);

  return (
    <div className="card">
      {/* {isPromo && <div className="card-promo">АКЦИЯ</div>} */}
      <div className="card-wrapper">
        <div className="card-header">
          {/* <img className="card-logo" src={""} alt="card-logo" /> */}
          <div className="car-logo">
            <ImageIcon />
          </div>
          <p className="card-title">{props.make || "Марка авто"}</p>
        </div>

        <div className="car-image">
          <ImageIcon />
        </div>
        {/* <img className="car-image" src={""} alt="car-image" /> */}

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
