import { Discount } from "@/types";
import { ColumnDef } from "@tanstack/react-table";

export const discountColumns: ColumnDef<Discount>[] = [
  {
    accessorKey: "discountName",
    header: "НАЗВАНИЕ АКЦИИ",
  },
  {
    accessorKey: "carName",
    header: "АВТОМОБИЛЬ",
  },
  {
    accessorKey: "discountType",
    header: "ТИП АКЦИИ",
  }
];
