import Tab from "@/elements/tab";
import InfoMain from "./InfoMain/InfoMain";
import InfoAbout from "./InfoAbout/InfoAbout";
import InfoFaq from "./InfoFaq/InfoFaq";
import InfoPartners from "./InfoPartners/InfoPartners";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import InfoMails from "./InfoMails/InfoMails";

const Info = () => {
  const array = [
    { name: "Header & Footer", to: "/info/detail" },
    { name: "О нас & B2B", to: "/info/about" },
    { name: "FAQ", to: "/info/faq" },
    { name: "Партнеры", to: "/info/partners" },
    { name: "E-mails", to: "/info/emails" },
  ];

  const { pathname } = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    pathname === "/info" && navigate("detail");
  }, [pathname]);

  return (
    <div>
      <div className="headerTitle">Информация о сайте</div>
      <Tab links={array}>
        {pathname === "/info/detail" && <InfoMain />}
        {pathname === "/info/about" && <InfoAbout />}
        {pathname === "/info/faq" && <InfoFaq />}
        {pathname === "/info/partners" && <InfoPartners />}
        {pathname === "/info/emails" && <InfoMails />}
      </Tab>
    </div>
  );
};
export default Info;
