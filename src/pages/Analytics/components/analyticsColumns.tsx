import { Analytic } from "@/types";
import { ColumnDef } from "@tanstack/react-table";

export const analyticsColumns: ColumnDef<Analytic>[] = [
  {
    accessorKey: "ipAdress",
    header: "IP АДРЕС",
  },
  {
    accessorKey: "region",
    header: "РЕГИОН",
  },
  {
    accessorKey: "date",
    header: "ДАТА",
  },
  {
    accessorKey: "lastAction",
    header: "ПОСЛЕДНЕЕ ДЕЙСТВИЕ",
  },
  {
    accessorKey: "infoAuto",
    header: "ИНФО ОБ АВТО",
  },

];