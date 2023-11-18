import { BodyType, Catalog, Order } from "@/types";
import { enumToMap } from "@/utils";
import { ColumnDef } from "@tanstack/react-table";

export const ordersColumns: ColumnDef<Order>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "fullname",
    header: "КЛИЕНТ",
  },
  {
    accessorKey: "phoneNumber",
    header: "НОМЕР ТЕЛЕФОНА",
  },

  {
    accessorKey: "catalog",
    header: "АВТОМОБИЛЬ",
    cell: ({ row }) => {
      const catalog = row.getValue<Catalog>("catalog");
      return `${catalog?.makeName} ${catalog?.modelName}`;
    },
  },
  {
    accessorKey: "catalog",
    header: "ТИП АВТО",
    cell: ({ row }) => {
      const catalog = row.getValue<Catalog>("catalog");
      return enumToMap(BodyType).find(
        ([key]) => key == catalog?.bodyType.toString()
      )?.[1];
    },
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
  {
    accessorKey: "comment",
    header: "КОММЕНТАРИЙ",
  },
  {
    accessorKey: "calculatedPrice",
    header: "ЦЕНА",
  },
];
