import { useState } from "react";
import "./Discounts.scss";
import useSWR from "swr";
import { DataTable } from "@/components/ui/data-table";
import { discountColumns } from "./components/discountColumns";
import { discountApis, getDataWithPagination } from "@/api";
import { Discount, DataWithPagination } from "@/types";
import SearchElement from "@/elements/search";
import OutlinedButton from "@/elements/outlinedButton";
import FilledButton from "@/elements/filledButton";
import filterUpLogo from "@/assets/filterIcon.svg";
import plusLogo from "@/assets/plusIcon.svg";
import { useNavigate } from "react-router-dom";
import Loading from "@/components/Loading";

const Discounts = () => {
  const navigate = useNavigate();
  const [pageNum, setPageNum] = useState(1);
  const {
    data: discountData,
    isLoading,
    error,
    isValidating,
  } = useSWR<DataWithPagination<Discount[]>>(
    // Update with discount api
    discountApis.search({ pageNum, pageSize: 10, includeCatalog: true }),
    getDataWithPagination
  );

  const handleFilterClick = () => {};

  const handleNewDiscountClick = () => {
    navigate("detail/newDiscountPrice");
  };

  return (
    <div>
      <div className="headerTitle">Акции</div>
      <div className="subHeader">
        <SearchElement />
        <div style={{ display: "flex" }}>
          <OutlinedButton
            icon={filterUpLogo}
            text={"Фильтры"}
            onClick={handleFilterClick}
          />
          <FilledButton
            icon={plusLogo}
            text={"Новая акция"}
            onClick={handleNewDiscountClick}
          />
        </div>
      </div>

      {isValidating || isLoading ? (
        <Loading />
      ) : error ? (
        <>Error</>
      ) : (
        discountData?.data && (
          <DataTable
            rowLink="detail/newDiscountPrice"
            pageNum={pageNum}
            setPageNum={setPageNum}
            pagination={discountData.pagination}
            data={discountData?.data}
            columns={discountColumns}
          />
        )
      )}
    </div>
  );
};

export default Discounts;
