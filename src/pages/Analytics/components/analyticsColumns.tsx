import { Analytic,  BodyType } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import dayjs from "dayjs";
import { enumToMap } from "@/utils";


export const analyticsColumns: ColumnDef<Analytic>[] = [
  {
    accessorKey: "ip",
    header: "IP АДРЕС",
  },
  {
    accessorKey: "actionDate",
    header: "ДАТА",
    cell: ({ row }) => {
      const date = dayjs(row.getValue("actionDate")).format(
        "YYYY-MM-DD HH:mm:ss"
      );

      return date;
    },
  },
  {
    accessorKey: "actionCode",
    header: "ПОСЛЕДНЕЕ ДЕЙСТВИЕ",
  },
  {
    accessorKey: "placeOfReceipt",
    header: "МЕСТО АРЕНДЫ",
  },
  {
    accessorKey: "startDate",
    header: "ДАТА АРЕНДЫ",
    cell: ({ row }) => {
      const data = row.original;
      const startTime = data?.startTime;
      const startDate = data?.startDate;
      return (
        <>
          {startDate} {startTime}
        </>
      );
    },
  },
  {
    accessorKey: "placeOfHandover",
    header: "МЕСТО ВОЗВРАТА",
  },
  {
    accessorKey: "endDate",
    header: "ДАТА ВОЗВРАТА",
    cell: ({ row }) => {
      const data = row.original;
      const endTime = data?.endTime;
      const endDate = data?.endDate;
      return (
        <>
          {endDate} {endTime}
        </>
      );
    },
  },
  { accessorKey: "catalogBodyType",
  header: "ТИП АВТО",
  cell: ({ row }) => {
    return enumToMap(BodyType).find(
      ([key]) => key == row?.original?.catalogBodyType.toString()
    )?.[1];
  }, },
  {
    accessorKey: "catalogName",
    header: "ИНФО ОБ АВТО",
  },
  {
    accessorKey: "totalPrice",
    header: "ЦЕНА",
  },
];
