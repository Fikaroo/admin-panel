import { Catalog, Order } from "@/types";
import { ColumnDef } from "@tanstack/react-table";

export const ordersColumns: ColumnDef<Order>[] = [
  {
    accessorKey: "fullname",
    header: "КЛИЕНТ",
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
];
