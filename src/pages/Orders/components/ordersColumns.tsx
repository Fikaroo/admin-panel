import { BodyType, Order } from "@/types";
import { enumToMap } from "@/utils";
import { ColumnDef } from "@tanstack/react-table";

export const ordersColumns: ColumnDef<Order>[] = [
  { accessorKey: "ip", header: "IP АДРЕС" },
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
    header: "НОМЕР ТЕЛЕФОНА \n EMAIL",
    cell: ({ row }) => {
      const email = row.original.email;
      const phoneNumber = row.original.phoneNumber;
      return `${phoneNumber} \n ${email}`;
    },
  },

  {
    accessorKey: "carName",
    header: "АВТОМОБИЛЬ",
    cell: ({ row }) => {
      const catalog = row?.original?.catalog;
      return `${catalog?.makeName} ${catalog?.modelName}`;
    },
  },
  {
    accessorKey: "carType",
    header: "ТИП АВТО",
    cell: ({ row }) => {
      const catalog = row?.original?.catalog;
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
