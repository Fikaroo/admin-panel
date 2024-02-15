import { dynamicContentApis, getData, orderApis, postData } from "@/api";
import Dialog from "@/components/Dialog/Dialog";
import { BodyType, Order, Status } from "@/types";
import { defaultToast, enumToMap } from "@/utils";
import { ColumnDef } from "@tanstack/react-table";
import { useOrderStore } from "../Orders";
import { format } from "date-fns";

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
    accessorKey: "createdAt",
    header: "ДАТА ЗАКАЗА",
    cell: ({ row }) => {
      const date = row.getValue("createdAt") as Date;
      return format(new Date(date), "yyyy-MM-dd hh:mm:ss");
    },
  },
  {
    accessorKey: "",
    header: "СТАТУС",
    cell: ({ row }) => {
      const data = row.original;
      return enumToMap(Status)?.find(([key]) => Number(key) === data?.status)?.[1];
    },
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
      const status = row.original?.status;
      const getMails = async () => {
        return await getData(dynamicContentApis.getArrayByCode("orderMail"));
      };
      const handleCancelOrder = async () => {
        const mails = await getMails();
        defaultToast(
          postData(orderApis.cancelByAdmin(id || ""), {
            arg: {
              emailTo: mails.map((mail: { data: unknown }) => mail.data),
            },
          }),
        )
          .then((res) => {
            res === "" && useOrderStore.getState().mutator();
          })
          .finally(() => {
            useOrderStore.getState().cancelModal();
          });
      };

      return status === 1 ? (
        <Dialog>
          <h2>Вы абсолютно уверены?</h2>
          <p>Это действие не может быть отменено.</p>
          <button className="dialog-action-btn" onClick={handleCancelOrder}>
            отменить заказ
          </button>
        </Dialog>
      ) : null;
    },
  },
];
