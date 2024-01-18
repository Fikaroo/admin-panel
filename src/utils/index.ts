/* eslint-disable @typescript-eslint/no-explicit-any */
import { toast } from "react-toastify";

const date = new Date();
const currentYear = date.getFullYear();
date.setFullYear(2000);
const year = date.getFullYear();
const diffYear = currentYear - year;
export const yearsList = Array.from(new Array(diffYear + 1), (_, index) => index + year);

export const enumToMap = (enumObj: object) => {
  const entries = Object.entries(enumObj);
  const halfLenth = Math.ceil((entries?.length - 1) / 2);
  const newEntries = entries.slice(0, halfLenth);
  return newEntries;
};

export const getSelectAttr = (e: React.ChangeEvent<HTMLSelectElement>) => {
  const selectedOption = e.currentTarget.options.selectedIndex;
  return e.currentTarget.options[selectedOption].getAttribute("data-state") || "";
};

export const getBase64 = (file: Blob, cb: (arg0: string | ArrayBuffer | null) => void) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = function () {
    cb(reader.result);
  };
  reader.onerror = function (error) {
    return error;
  };
};

export const changeArrayByIndex = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  array: any[],
  index: number,
  changeElement: unknown,
) => [...array.slice(0, index), changeElement, ...array.slice(index + 1, array.length)];

export const defaultToast = async (fetch: any) => {
  return await toast.promise(fetch, {
    pending: "Waiting",
    success: "Done 👌",
    error: "Error 🤯",
  });
};
