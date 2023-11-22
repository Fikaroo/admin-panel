/* eslint-disable @typescript-eslint/no-explicit-any */
import { catalogApis, postData } from "@/api";
import Switch from "@/components/ui/switch/switch";
import { BodyType, Catalog, SeatMaterialType, TransmissionType } from "@/types";
import { defaultToast, enumToMap } from "@/utils";
import { ColumnDef } from "@tanstack/react-table";
import { mutate } from "swr";

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
    cell: ({ row }) =>
      enumToMap(TransmissionType).find(
        ([key]) => key == row.getValue("gearType")
      )?.[1],
  },
  {
    accessorKey: "bodyType",
    header: "КАТЕГОРИЯ",
    cell: ({ row }) =>
      enumToMap(BodyType).find(([key]) => key == row.getValue("bodyType"))?.[1],
  },
  {
    accessorKey: "seatMaterialType",
    header: "САЛОН",
    cell: ({ row }) =>
      enumToMap(SeatMaterialType).find(
        ([key]) => key == row.getValue("seatMaterialType")
      )?.[1],
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
      const onChange = (props: unknown) => {
        defaultToast(
          postData(catalogApis.update(car?.id), {
            arg: { ...car, isActive: props },
          })
        ).then((res) => {
          res && mutate("/catalog");
        });
      };

      return (
        <div onClick={(e) => e.stopPropagation()}>
          <Switch isAcive={car.isActive} onChange={onChange} />
        </div>
      );
    },
  },
];
