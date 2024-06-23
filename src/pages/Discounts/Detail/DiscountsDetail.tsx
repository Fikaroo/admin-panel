import { discountApis, getData } from "@/api";
import ArrowLeft from "@/assets/arrow-narrow-left.svg?react";
import Loading from "@/components/Loading";
import Tab from "@/elements/tab";
import { Discount } from "@/types";
import { useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import useSWR from "swr";
import "./DiscountsDetail.scss";
import NewDiscountPrice from "./NewDiscountPrice/newDiscountPrice";
import NewDiscountDays from "./newDiscountDays/newDiscountDays";

const DiscountsDetail = () => {
  const { id } = useParams();
  const { data, isLoading, error, isValidating } = useSWR<Discount>(id && discountApis.getById(id), getData, {
    revalidateOnFocus: false,
  });
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const array = [
    {
      name: "Акционная цена",
      to: id ? `newDiscountPrice/${id}` : "newDiscountPrice",
    },
    {
      name: "Акционные дни",
      to: id ? `newDiscountDays/${id}` : "newDiscountDays",
    },
  ];

  useEffect(() => {
    if (data?.type === 2) {
      navigate(`newDiscountDays/${id}`);
    }
  }, [data, id, navigate]);

  if (isValidating || isLoading) return <Loading />;
  if (error) return "No result";

  const handleBackNavigation = () => navigate("/discounts");
  return (
    <div className="new-discount__price">
      <button className="back__btn" onClick={handleBackNavigation}>
        <ArrowLeft className="left__arrow" />
        <p>Назад</p>
      </button>
      <h1 className="header__title">{id ? `${data?.name} акция` : "Новая акция"}</h1>
      <Tab links={data?.type ? [array?.[data?.type - 1]] : array}>
        {pathname.includes("newDiscountDays") && <NewDiscountDays data={data} />}
        {pathname.includes("newDiscountPrice") && <NewDiscountPrice data={data} />}
      </Tab>
    </div>
  );
};

export default DiscountsDetail;
