import { useState } from "react";
import "./Orders.scss";
import useSWR from "swr";
import { DataTable } from "@/components/ui/data-table";
import { ordersColumns } from "./components/ordersColumns";
import { Order, DataWithPagination } from "@/types";
import OutlinedButton from "@/elements/outlinedButton";
import SearchElement from "@/elements/search";
import filterUpLogo from "@/assets/filterIcon.svg";
import { getDataWithPagination, orderApis } from "@/api";

const Orders = () => {
  const [pageNum, setPageNum] = useState(1);
  const {
    data: orderData,
    isLoading,
    error,
  } = useSWR<DataWithPagination<Order[]>>(
    orderApis.search({ pageNum, pageSize: 10, includeCatalog: false }),
    getDataWithPagination
  );
  const [sort, setSort] = useState(false);
  const handleFilterClick = () => {
    setSort(!sort);
  };
  const handleOptionClick = () => {

  }

  return (
    <div>
      <div className="headerTitle">Заказы</div>
      <div className="subHeader">
        <SearchElement />
        <div style={{ position:"relative" }}>
          <OutlinedButton
            icon={filterUpLogo}
            text={"Фильтры"}
            onClick={handleFilterClick}
          />
          {sort && (
                <div className="sort-options">
                  <ul>
                    <li onClick={() => handleOptionClick("")}>
                      По клиенту
                    </li>
                    <li onClick={() => handleOptionClick("")}>
                      По модели автомобиля
                    </li>
                    <li onClick={() => handleOptionClick("")}>
                      По IP
                    </li>
                  </ul>
                </div>
              )}
        </div>
      </div>
      {isLoading ? (
        <>Loading...</>
      ) : error ? (
        <>Error</>
      ) : (
        orderData?.data && (
          <DataTable
            rowLink=""
            pageNum={pageNum}
            setPageNum={setPageNum}
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
