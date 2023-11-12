import ArrowLeft from "@/assets/arrow-narrow-left.svg?react";
import { useNavigate, useLocation } from "react-router-dom";
import "./DiscountsDetail.scss";
import Tab from "@/elements/tab";
import NewDiscountPrice from "./NewDiscountPrice/newDiscountPrice";
import NewDiscountDays from "./newDiscountDays/newDiscountDays";

const DiscountsDetail = () => {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const array = [
        { name: "Акционная цена", to: "/discounts/detail" },
        { name: "Акционные дни", to: "/discounts/detail/newDiscountDays" }
      ];
    const handleBackNavigation = () => navigate("/discounts");
  return (
    <div className="new-discount__price">
      <button className="back__btn" onClick={handleBackNavigation}>
        <ArrowLeft className="left__arrow" />
        <p>Назад</p>
      </button>
      <h1 className="header__title">Новая акция</h1>
      <Tab links={array}>
        {pathname === "/discounts/detail" && <NewDiscountPrice />}
        {pathname === "/discounts/detail/newDiscountDays" && <NewDiscountDays />}
      </Tab>
    </div>
  );
};

export default DiscountsDetail;
