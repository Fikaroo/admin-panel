import { useState } from "react";
import "./Orders.scss";
import useSWR from "swr";
import { DataTable } from "@/components/ui/data-table";
import { ordersColumns } from "./components/ordersColumns";
import { Order, DataWithPagination } from "@/types";
import OutlinedButton from "@/elements/outlinedButton";
import SearchElement from "@/elements/search";
import filterUpLogo from "@/assets/filterIcon.svg";
import { getDataWithPagination } from "@/api";

const Orders = () => {
  const [pageIndex, setPageIndex] = useState(1);
  const {
    data: orderData,
    isLoading,
    error,
  } = useSWR<DataWithPagination<Order[]>>(
    // Todo: Update with order api
    // `/catalog?localize=true&pageNum=${pageIndex}&pageSize=10`,
    "",
    getDataWithPagination
  );
  const handleFilterClick = () => {};

  return (
    <div>
      <div className="headerTitle">Заказы</div>
      <div className="subHeader">
        <SearchElement />
        <div style={{ display: "flex" }}>
          <OutlinedButton
            icon={filterUpLogo}
            text={"Фильтры"}
            onClick={handleFilterClick}
          />
        </div>
      </div>
      {isLoading ? (
        <>Loading...</>
      ) : error ? (
        <>Error</>
      ) : (
        orderData?.data && (
          <DataTable
            rowLink="detail"
            pageIndex={pageIndex}
            setPageIndex={setPageIndex}
            pagination={orderData.pagination}
            data={orderData?.data}
            columns={ordersColumns}
          />
        )
      )}
    </div>
  );
};

export default Orders;
