import "./SideBar.scss";
import { Link, useLocation, useNavigate } from "react-router-dom";
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
import { useAuth } from "@/AuthProvider";

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
    path: "/discounts",
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
  const { logout } = useAuth();
  const location = useLocation();
  const pathName = location.pathname;
  const navigate = useNavigate();
  const handleLogOutClick = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="sidebar__container">
      <div className="sidebar__container_up">
        <img src={logoHertz} alt="" className="logo-herts" />
        <div className="link__list">
          {routes.map(({ name, path, icon, iconBlack }, index) => (
            <Link
              key={name}
              to={path}
              className="link"
              style={
                index === 0 && pathName === "/"
                  ? {
                      backgroundColor: "#FC0",
                      color: "#434244",
                    }
                  : index !== 0 && pathName.includes(path)
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
              <img
                src={
                  index === 0 && pathName === "/"
                    ? iconBlack
                    : index !== 0 && pathName.includes(path)
                    ? iconBlack
                    : icon
                }
                alt=""
              />
              <span style={{ marginLeft: 10 }}>{name}</span>
            </Link>
          ))}
        </div>
      </div>
      <div>
        <button className="sidebar__container_bottom">
          <img src={logOut} alt="logout" />
          <span style={{ marginLeft: 5 }} onClick={handleLogOutClick}>
            Выход
          </span>
        </button>
      </div>
    </div>
  );
};

export default SideBar;
