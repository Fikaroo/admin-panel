import { getData, orderApis } from "@/api";
import Dialog from "@/components/Dialog/Dialog";
import { BodyType, Order, Status } from "@/types";
import { defaultToast, enumToMap } from "@/utils";
import { ColumnDef } from "@tanstack/react-table";
import { useOrderStore } from "../Orders";

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
      return enumToMap(BodyType).find(([key]) => key == catalog?.bodyType.toString())?.[1];
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
  {
    accessorKey: "status",
    header: "СТАТУС",
    cell: ({ row }) => {
      const data = row.original;

      return enumToMap(Status)?.find(([key]) => Number(key) === data?.status)?.[1];
    },
  },

  {
    id: "action",
    cell: ({ row }) => {
      const id = row.original?.system_id;

      const handleCancelOrder = async () => {
        defaultToast(getData(orderApis.cancelByAdmin(id || "")))
          .then((res) => {
            !res && useOrderStore.getState().mutator();
          })
          .finally(() => {
            useOrderStore.getState().setCancelModal(false);
          });
      };

      return (
        <Dialog>
          <h2>Вы абсолютно уверены?</h2>
          <p>Это действие не может быть отменено.</p>
          <button className="dialog-action-btn" onClick={handleCancelOrder}>
            отменить заказ
          </button>
        </Dialog>
      );
    },
  },
];
