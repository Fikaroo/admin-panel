import { Catalog, Discount } from "@/types";
import { ColumnDef } from "@tanstack/react-table";

export const discountColumns: ColumnDef<Discount>[] = [
  {
    accessorKey: "name",
    header: "НАЗВАНИЕ АКЦИИ",
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
    accessorKey: "type",
    header: "ТИП АКЦИИ",
    cell: ({ row }) => {
      const type = row.getValue("type");

      type === 1 ? "Акционная цена" : type === 2 ? "Акционная дни" : "";
    },
  },
];
