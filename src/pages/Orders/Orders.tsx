/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from "react";
import "./Orders.scss";
import useSWR, { KeyedMutator } from "swr";
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
import { DateRange, DayPicker } from "react-day-picker";
import Loading from "@/components/Loading";
import { create } from "zustand";
import { addMinutes, differenceInDays, format, parseISO } from "date-fns";

interface OrderState {
  cancelModal: () => void;
  setCancelModal: (newCancelModal: () => void) => void;
  mutator: KeyedMutator<DataWithPagination<Order[]>> | KeyedMutator<null>;
  setMutator: (newMutator: KeyedMutator<DataWithPagination<Order[]>>) => void;
}

// eslint-disable-next-line react-refresh/only-export-components
export const useOrderStore = create<OrderState>()((set) => ({
  cancelModal: () => "",
  setCancelModal: (newCancelModal) => set(() => ({ cancelModal: newCancelModal })),
  mutator: async () => null,
  setMutator: (newMutator) => set(() => ({ mutator: newMutator })),
}));

const getOrderExcelJson = (res: Order[]) => {
  const orders: any[] = [];
  res.map((r: any) => {
    const order: Record<any, any> = {};

    ordersColumns
      .filter(({ accessorKey }: any) => accessorKey)
      ?.map(({ accessorKey, header }: any) => {
        const rowVal = r?.[accessorKey];
        console.log(accessorKey);
        if (accessorKey === "phoneNumber") {
          const value = `${r?.phoneNumber} \n ${r?.email}`;
          order[header] = value;
        } else if (accessorKey === "carName") {
          const value = `${r?.catalog?.makeName} ${r?.catalog?.modelName}`;
          order[header] = value;
        } else if (accessorKey === "carType") {
          const value = enumToMap(BodyType).find(([key]) => key == r?.catalog?.bodyType?.toString())?.[1];
          order[header] = value;
        } else if (accessorKey === "startDate") {
          const startDate = r?.startDate;
          const startTime = r?.startTime;
          const value = `${startDate} ${startTime}`;
          order[header] = value;
        } else if (accessorKey === "endDate") {
          const endDate = r?.endDate;
          const endTime = r?.endTime;
          const value = `${endDate} ${endTime}`;
          order[header] = value;
        } else if (accessorKey === "createdAt") {
          const value = format(new Date(r.createdAt), "yyyy-MM-dd hh:mm:ss");
          order[header] = value;
        } else if (accessorKey === "diffDays") {
          const startDateTime = addMinutes(parseISO(r.startDate + "T" + r.startTime), -new Date().getTimezoneOffset());
          const endDateTime = addMinutes(parseISO(r.endDate + "T" + r.endTime), -new Date().getTimezoneOffset());
          return (order[header] = differenceInDays(endDateTime, startDateTime));
        } else {
          order[header] = rowVal;
        }
      });

    orders.push(order);
  });
  return orders;
};

const Orders = () => {
  const { setMutator } = useOrderStore();
  const [searchString, setSearchString] = useState("");
  const [value, setValue] = useState<DateRange | undefined>();
  const ref = useRef(null);
  const { isOpen: show, setIsOpen: setShow } = useOutSideClick(ref);
  const [minActionDate, setMinActionDate] = useState("");
  const [maxActionDate, setMaxActionDate] = useState("");
  const [pageNum, setPageNum] = useState(1);
  const {
    data: orderData,
    isLoading,
    isValidating,
    mutate,
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
    getDataWithPagination,
    { revalidateOnFocus: false, refreshInterval: 300000 },
  );

  const { trigger } = useSWRMutation<Order[]>(
    orderApis.search({ includeCatalog: true, minActionDate, maxActionDate, searchString }),
    getData,
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
    newValue?.from !== undefined ? setMinActionDate(newValue?.from.toISOString()) : setMinActionDate("");

    newValue?.to !== undefined ? setMaxActionDate(newValue?.to.toISOString()) : setMaxActionDate("");

    setValue({ from: newValue?.from, to: newValue?.to });
  };

  const handleSearch = (str: string) => setSearchString(str);

  useEffect(() => {
    setMutator(mutate);
  }, [mutate, setMutator]);

  return (
    <div>
      <div className="headerTitle">Заказы</div>
      <div className="subHeader">
        <SearchElement onChange={handleSearch} />

        <div ref={ref} style={{ position: "relative", display: "flex", gap: 10 }}>
          <FilledButton
            icon={download}
            text={"Download Excel"}
            onClick={handleExcelDownload}
            disabled={isValidating || isLoading}
          />

          <OutlinedButton
            icon={calendarLogo}
            text={"Выберите даты"}
            onClick={() => setShow(!show)}
            disabled={isValidating || isLoading}
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
      {isValidating || isLoading ? (
        <Loading />
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
