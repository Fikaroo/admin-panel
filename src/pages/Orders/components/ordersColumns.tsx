import { Orders } from "@/types";
import { ColumnDef } from "@tanstack/react-table";

export const ordersColumns: ColumnDef<Orders>[] = [
  {
    accessorKey: "сlientName",
    header: "КЛИЕНТ",
  },
  {
    accessorKey: "carName",
    header: "АВТОМОБИЛЬ",
  },
  {
    accessorKey: "rentPoint",
    header: "МЕСТО АРЕНДЫ",
  },
  {
    accessorKey: "DatePlace",
    header: "ДАТА АРЕНДЫ",
  },
  {
    accessorKey: "returnPoint",
    header: "МЕСТО ВОЗВРАТА",
  },
  {
    accessorKey: "returnDate",
    header: "ДАТА ВОЗВРАТА",
  },
  {
    accessorKey: "ipAdress",
    header: "IP АДРЕС",
  }
];