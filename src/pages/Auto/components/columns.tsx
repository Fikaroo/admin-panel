import Switch from "@/components/ui/switch/switch";
import { Catalog } from "@/types";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<Catalog>[] = [
  {
    accessorKey: "makeName",
    header: "МАРКА",
  },
  {
    accessorKey: "modelName",
    header: "МОДЕЛЬ",
  },
  {
    accessorKey: "yearOfManufacture",
    header: "ГОД ВЫПУСКА",
  },
  {
    accessorKey: "gearType",
    header: "КОРОБКА ПЕРЕДАЧ",
  },
  {
    accessorKey: "bodyType",
    header: "КАТЕГОРИЯ",
  },
  {
    accessorKey: "seatMaterialType",
    header: "САЛОН",
  },
  {
    accessorKey: "seatCount",
    header: "ПАССАЖИРЫ",
  },
  {
    accessorKey: "luggageCount",
    header: "БАГАЖ",
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const car = row.original;
      return <Switch isAcive={car.isActive} />;
    },
  },
];
