import Tab from "@/elements/tab";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Info = () => {
  const array = [
    { name: "Header & Footer", to: "/info/detail" },
    { name: "О нас & B2B", to: "/info/about" },
    { name: "FAQ", to: "/info/faq" },
    { name: "Партнеры", to: "/info/partners" },
    { name: "E-mails", to: "/info/emails" },
    { name: "Minimum Book Hours", to: "/info/min-book-hours" },
  ];

  const { pathname } = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    pathname === "/info" && navigate("detail");
  }, [navigate, pathname]);

  return (
    <div>
      <div className="headerTitle">Информация о сайте</div>
      <Tab links={array}>
        <Outlet />
      </Tab>
    </div>
  );
};
export default Info;
