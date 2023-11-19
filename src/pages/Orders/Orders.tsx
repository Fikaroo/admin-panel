/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import "./Orders.scss";
import useSWR from "swr";
import { DataTable } from "@/components/ui/data-table";
import { ordersColumns } from "./components/ordersColumns";
import { Order, DataWithPagination, BodyType } from "@/types";
import OutlinedButton from "@/elements/outlinedButton";
import SearchElement from "@/elements/search";
import filterUpLogo from "@/assets/filterIcon.svg";
import download from "@/assets/download.svg";
import { getData, getDataWithPagination, orderApis } from "@/api";
import FilledButton from "@/elements/filledButton";
import useSWRMutation from "swr/mutation";
import * as xlsx from "xlsx";
import { defaultToast, enumToMap } from "@/utils";

import { useAuth } from '@/AuthProvider';
import { useNavigate } from "react-router-dom";

const getOrderExcelJson = (res: Order[]) => {
  const orders: Record<any, any> = {};
  ordersColumns?.map(({ accessorKey, header }: any) =>
    res.map((r: any) => {
      const rowVal = r?.[accessorKey];
      if (rowVal) {
        if (accessorKey === "carName") {
          const value = `${r?.catalog?.makeName} ${r?.catalog?.modelName}`;
          return (orders[header] = value);
        }

        if (accessorKey === "carType") {
          const value = enumToMap(BodyType).find(
            ([key]) => key == r?.catalog?.mbodyType.toString()
          )?.[1];
          return (orders[header] = value);
        }

        if (accessorKey === "startDate") {
          const startDate = r?.startDate;
          const startTime = r?.startTime;
          const value = `${startDate} ${startTime}`;
          return (orders[header] = value);
        }

        if (accessorKey === "endDate") {
          const endDate = r?.endDate;
          const endTime = r?.endTime;
          const value = `${endDate} ${endTime}`;
          return (orders[header] = value);
        }

        return (orders[header] = rowVal);
      }
    })
  );
  return orders;
};

const Orders = () => {
  const [pageNum, setPageNum] = useState(1);
  const {
    data: orderData,
    isLoading,
    error,
  } = useSWR<DataWithPagination<Order[]>>(
    orderApis.search({ pageNum, pageSize: 10, includeCatalog: true }),
    getDataWithPagination
  );

  const { trigger } = useSWRMutation<Order[]>(
    orderApis.search({ includeCatalog: true }),
    getData
  );

  const [sort, setSort] = useState(false);
  const handleFilterClick = () => {
    setSort(!sort);
  };
  const handleOptionClick = () => {};
  const handleExcelDownload = async () => {
    const res = (await defaultToast(trigger())) as Order[];
    if (res) {
      /* generate worksheet from state */
      const ws = xlsx.utils.json_to_sheet([getOrderExcelJson(res)]);
      /* create workbook and append worksheet */
      const wb = xlsx.utils.book_new();
      xlsx.utils.book_append_sheet(wb, ws, "Data");
      /* export to XLSX */
      xlsx.writeFile(wb, "Orders.xlsx");
    }
  };

  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    const navigate = useNavigate();
    navigate('/login');
    return null;
  }
  return (
    <div>
      <div className="headerTitle">Заказы</div>
      <div className="subHeader">
        <SearchElement />

        <div style={{ position: "relative", display: "flex", gap: 10 }}>
          <FilledButton
            icon={download}
            text={"Download Excel"}
            onClick={handleExcelDownload}
          />
          <OutlinedButton
            icon={filterUpLogo}
            text={"Фильтры"}
            onClick={handleFilterClick}
          />
          {sort && (
            <div className="sort-options">
              <ul>
                <li onClick={() => handleOptionClick()}>По клиенту</li>
                <li onClick={() => handleOptionClick()}>
                  По модели автомобиля
                </li>
                <li onClick={() => handleOptionClick()}>По IP</li>
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
