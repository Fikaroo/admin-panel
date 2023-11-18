import { Analytic } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import dayjs from "dayjs";

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
    accessorKey: "catalogName",
    header: "ИНФО ОБ АВТО",
  },
];
