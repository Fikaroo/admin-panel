import "./SideBar.scss";
import { Link, useLocation } from "react-router-dom";
import logoHertz from "@/assets/Logo.svg";
import logOut from "@/assets/logOut.svg";
import zakaz from "@/assets/zakaz.svg";
import auto from "@/assets/auto.svg";
import akcii from "@/assets/akcii.svg";
import infocircle from "@/assets/info-circle.svg";
import analitika from "@/assets/analitika.svg";

import zakazBlack from "@/assets/zakazBlack.svg";
import autoBlack from "@/assets/autoBlack.svg";
import akciiBlack from "@/assets/akciiBlack.svg";
import infocircleBlack from "@/assets/info-circleBlack.svg";
import analitikaBlack from "@/assets/analitikaBlack.svg";

type Routes = {
  name: string;
  path: string;
  icon: string;
  iconBlack: string;
};

const routes: Routes[] = [
  {
    name: "Заказы",
    path: "/",
    icon: zakaz,
    iconBlack: zakazBlack,
  },
  {
    name: "Авто",
    path: "/auto",
    icon: auto,
    iconBlack: autoBlack,
  },
  {
    name: "Акции",
    path: "/stocks",
    icon: akcii,
    iconBlack: akciiBlack,
  },
  {
    name: "Инфо",
    path: "/info",
    icon: infocircle,
    iconBlack: infocircleBlack,
  },
  {
    name: "Аналитика",
    path: "/analytics",
    icon: analitika,
    iconBlack: analitikaBlack,
  },
];

const SideBar = () => {
  const location = useLocation();
  const pathName = location.pathname;

  return (
    <div className="sidebar__container">
      <div className="sidebar__container_up">
        <img src={logoHertz} alt="" className="logo-herts" />
        <div className="link__list">
          {routes.map(({ name, path, icon, iconBlack }) => (
            <Link
              key={name}
              to={path}
              className="link"
              style={
                pathName === path
                  ? {
                      backgroundColor: "#FC0",
                      color: "#434244",
                    }
                  : {
                      backgroundColor: "transparent",
                      color: "#fff",
                    }
              }
            >
              <img src={pathName === path ? iconBlack : icon} alt="" />
              <span style={{ marginLeft: 10 }}>{name}</span>
            </Link>
          ))}
        </div>
      </div>
      <div>
        <button className="sidebar__container_bottom">
          <img src={logOut} alt="logout" />
          <span style={{ marginLeft: 5 }}>Выход</span>
        </button>
      </div>
    </div>
  );
};

export default SideBar;
