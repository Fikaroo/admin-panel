/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef, useState } from "react";
import "./Orders.scss";
import useSWR from "swr";
import { DataTable } from "@/components/ui/data-table";
import { ordersColumns } from "./components/ordersColumns";
import { Order, DataWithPagination, BodyType } from "@/types";
import SearchElement from "@/elements/search";
import download from "@/assets/download.svg";
import { getData, getDataWithPagination, orderApis } from "@/api";
import FilledButton from "@/elements/filledButton";
import useSWRMutation from "swr/mutation";
import * as xlsx from "xlsx";
import { defaultToast, enumToMap } from "@/utils";
import OutlinedButton from "@/elements/outlinedButton";
import calendarLogo from "@/assets/calendarIcon.svg";
import useOutSideClick from "@/hooks/useOutSideClick";
import dayjs from "dayjs";
import { DateRange, DayPicker } from "react-day-picker";

const getOrderExcelJson = (res: Order[]) => {
  const orders: any[] = [];
  const order: Record<any, any> = {};
  res.map((r: any) => {
    ordersColumns?.map(({ accessorKey, header }: any) => {
      const rowVal = r?.[accessorKey];
      if (rowVal) {
        if (accessorKey === "phoneNumber") {
          const value = `${r?.phoneNumber} \n ${r?.email}`;
          return (order[header] = value);
        }

        if (accessorKey === "carName") {
          const value = `${r?.catalog?.makeName} ${r?.catalog?.modelName}`;
          return (order[header] = value);
        }

        if (accessorKey === "carType") {
          const value = enumToMap(BodyType).find(
            ([key]) => key == r?.catalog?.mbodyType.toString()
          )?.[1];
          return (order[header] = value);
        }

        if (accessorKey === "startDate") {
          const startDate = r?.startDate;
          const startTime = r?.startTime;
          const value = `${startDate} ${startTime}`;
          return (order[header] = value);
        }

        if (accessorKey === "endDate") {
          const endDate = r?.endDate;
          const endTime = r?.endTime;
          const value = `${endDate} ${endTime}`;
          return (order[header] = value);
        }

        return (order[header] = rowVal);
      }
    });
    orders.push(order);
  });
  return orders;
};

const Orders = () => {
  const [searchString, setSearchString] = useState("");
  const [value, setValue] = useState<DateRange | undefined>();
  const ref = useRef(null);
  const { isOpen: show, setIsOpen: setShow } = useOutSideClick(ref);
  const [minActionDate, setMinActionDate] = useState(dayjs(1997).toISOString());
  const [maxActionDate, setMaxActionDate] = useState(dayjs().toISOString());
  const [pageNum, setPageNum] = useState(1);
  const {
    data: orderData,
    isLoading,
    error,
  } = useSWR<DataWithPagination<Order[]>>(
    orderApis.search({
      pageNum,
      pageSize: 10,
      includeCatalog: true,
      minActionDate,
      maxActionDate,
      searchString,
    }),
    getDataWithPagination
  );

  const { trigger } = useSWRMutation<Order[]>(
    orderApis.search({ includeCatalog: true }),
    getData
  );

  const handleExcelDownload = async () => {
    const res = (await defaultToast(trigger())) as Order[];
    if (res) {
      /* generate worksheet from state */
      const ws = xlsx.utils.json_to_sheet(getOrderExcelJson(res));
      /* create workbook and append worksheet */
      const wb = xlsx.utils.book_new();
      xlsx.utils.book_append_sheet(wb, ws, "Data");
      /* export to XLSX */
      xlsx.writeFile(wb, "Orders.xlsx");
    }
  };

  const handleDateSelect = (newValue: DateRange | undefined) => {
    newValue?.from !== undefined
      ? setMinActionDate(newValue?.from.toISOString())
      : setMinActionDate("");

    newValue?.to !== undefined
      ? setMaxActionDate(newValue?.to.toISOString())
      : setMaxActionDate("");

    setValue({ from: newValue?.from, to: newValue?.to });
  };

  const handleSearch = (str: string) => setSearchString(str);

  return (
    <div>
      <div className="headerTitle">Заказы</div>
      <div className="subHeader">
        <SearchElement onChange={handleSearch} />

        <div
          ref={ref}
          style={{ position: "relative", display: "flex", gap: 10 }}
        >
          <FilledButton
            icon={download}
            text={"Download Excel"}
            onClick={handleExcelDownload}
          />

          <OutlinedButton
            icon={calendarLogo}
            text={"Выберите даты"}
            onClick={() => setShow(!show)}
          />

          {show ? (
            <DayPicker
              style={{
                position: "absolute",
                background: "white",
                padding: 20,
                top: 40,
                right: -6,
                zIndex: 10,
                border: "1px solid var(--gray-200, #EAECF0)",
                borderRadius: "4px",
              }}
              defaultMonth={new Date()}
              mode="range"
              selected={value}
              onSelect={(newValue) => handleDateSelect(newValue)}
              // footer={footer}
            />
          ) : null}
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
