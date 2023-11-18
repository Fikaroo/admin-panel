import Tab from "@/elements/tab";
import InfoMain from "./InfoMain/InfoMain";
import InfoAbout from "./InfoAbout/InfoAbout";
import InfoFaq from "./InfoFaq/InfoFaq";
import InfoPartners from "./InfoPartners/InfoPartners";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Info = () => {
  const array = [
    { name: "Header & Footer", to: "/info/detail" },
    { name: "О нас & B2B", to: "/info/about" },
    { name: "FAQ", to: "/info/faq" },
    { name: "Партнеры", to: "/info/partners" },
  ];

  const { pathname } = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    navigate("detail");
  }, []);
  return (
    <div>
      <div className="headerTitle">Информация о сайте</div>
      <Tab links={array}>
        {pathname === "/info/detail" && <InfoMain />}
        {pathname === "/info/about" && <InfoAbout />}
        {pathname === "/info/faq" && <InfoFaq />}
        {pathname === "/info/partners" && <InfoPartners />}
      </Tab>
    </div>
  );
};
export default Info;
