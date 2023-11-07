import Tab from "@/elements/tab";
import InfoMain from "./InfoMain/InfoMain";
import InfoAbout from "./InfoAbout/InfoAbout";
import InfoFaq from "./InfoFaq/InfoFaq";
import InfoPartners from "./InfoPartners/InfoPartners";
import { useLocation } from "react-router-dom";

const Info = () => {
  const array = [
    { name: "Header & Footer", to: "/info" },
    { name: "About Us & B2B", to: "/info/about" },
    { name: "FAQ", to: "/info/faq" },
    { name: "Partners", to: "/info/partners" },
  ];

  const { pathname } = useLocation();
  console.log(pathname);
  return (
    <div>
      <div className="headerTitle">Информация о сайте</div>
      <Tab links={array}>
        {pathname === "/info" && <InfoMain />}
        {pathname === "/info/about" && <InfoAbout />}
        {pathname === "/info/faq" && <InfoFaq />}
        {pathname === "/info/partners" && <InfoPartners />}
      </Tab>
    </div>
  );
};
export default Info;
