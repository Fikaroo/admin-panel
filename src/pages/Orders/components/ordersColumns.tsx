import { Order } from "@/types";
import { ColumnDef } from "@tanstack/react-table";

export const ordersColumns: ColumnDef<Order>[] = [
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