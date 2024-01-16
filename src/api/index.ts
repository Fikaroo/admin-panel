import { Lang } from "@/types";
import axios, { AxiosRequestConfig } from "axios";

const baseUrl = import.meta.env.VITE_API_URL;

export const instance = axios.create({
  baseURL: baseUrl,
  // withCredentials: true,
});

export const getData = async (path: string) => (await instance.get(path)).data;

export const getDataWithBody = async (path: string, { arg }: { arg?: unknown }) =>
  (await instance.get(path, { data: JSON.stringify(arg) })).data;

export const getDataWithHeader = async (path: string, option: AxiosRequestConfig<unknown>) =>
  (await instance.get(path, option)).data;

export const getDataWithPagination = async (path: string) => {
  const res = await instance.get(path);
  const total_records = res.headers["x-pagination-count"];
  const total_pages = res.headers["x-pagination-pages"];
  const next_page = res.headers["x-pagination-has-next"];
  const prev_page = res.headers["x-pagination-has-prev"];
  return {
    data: res.data,
    pagination: { total_records, total_pages, next_page, prev_page },
  };
};

export const postData = async (path: string, { arg }: { arg: unknown }) => (await instance.post(path, arg)).data;

type Params = {
  searchString?: string;
  isActive?: boolean;
  localize?: boolean;
  pageNum?: number;
  pageSize?: number;
  makeIds?: string;
  bodyTypes?: number[];
  gearTypes?: number[];
  seatMaterialTypes?: number[];
  seatCount?: number;
  minSeatCount?: number;
  maxSeatCount?: number;
  luggageCount?: number;
  minLuggageCount?: number;
  maxLuggageCount?: number;
  actionCode?: string;
  minActionDate?: string;
  maxActionDate?: string;
  includeCatalog?: boolean;
  startDate?: string;
  endDate?: string;
};

export const orderApis = {
  getById: (id: string) => `/orders/${id}`,
  getAll: "/orders",
  search: (params: Params) =>
    `/orders?${Object.entries(params)
      .map(([key, value]) => (value ? `${key}=${value}&` : ""))
      .join("")}`,
  create: "/orders/save",
  update: (id: string) => `/orders/save/${id}`,
  cancelByAdmin: (id: string) => `/orders/cancelByAdmin/${id}`,
  cancelByUser: (id: string) => `/orders/cancelByUser/${id}`,
};

export const catalogApis = {
  getById: (id: string) => `/catalog/${id}`,
  getAll: "/catalog",
  search: (params: Params) =>
    `/catalog?${Object.entries(params)
      .map(([key, value]) => (value ? `${key}=${value}&` : ""))
      .join("")}`,
  create: "/catalog/save",
  update: (id: string) => `/catalog/save/${id}`,
  delete: (id: string) => `/catalog/delete/${id}`,
};

export const modelApis = {
  getById: (id: string) => `/models/${id}`,
  getAll: "/models",
  search: (params: Params) =>
    `/models?${Object.entries(params)
      .map(([key, value]) => (value ? `${key}=${value}&` : ""))
      .join("")}`,
  create: "/models/save",
  update: (id: string) => `/models/save/${id}`,
};

export const makeApis = {
  getById: (id: string) => `/makes/${id}`,
  getAll: "/makes",
  search: (params: Params) =>
    `/makes?${Object.entries(params)
      .map(([key, value]) => (value ? `${key}=${value}&` : ""))
      .join("")}`,
  create: "/makes/save",
  update: (id: string) => `/makes/save/${id}`,
};

export const analyticsApis = {
  getAll: "/analytics",
  search: (params: Params) =>
    `/analytics?${Object.entries(params)
      .map(([key, value]) => (value ? `${key}=${value}&` : ""))
      .join("")}`,
  create: "/analytics/save",
  delete: (id: string) => `/analytics/delete/${id}`,
};

export const faqApis = {
  getAll: "/faq",
  search: (params: Params) =>
    `/faq?${Object.entries(params)
      .map(([key, value]) => (value ? `${key}=${value}&` : ""))
      .join("")}`,
  create: "/faq/save",
  delete: (id: string | number, lang: Lang) => `/faq/delete/${id}/${lang}`,
};

export const discountApis = {
  getById: (id: string) => `/promotions/${id}?includeImage=true`,
  getAll: "/promotions",
  search: (params: Params) =>
    `/promotions?${Object.entries(params)
      .map(([key, value]) => (value ? `${key}=${value}&` : ""))
      .join("")}`,
  create: "/promotions/save",
  update: (id: string) => `/promotions/save/${id}`,
  delete: (id: string) => `/promotions/delete/${id}`,
};

export const dynamicContentApis = {
  getById: (id: string) => `/dynamic-content/${id}`,
  getSingleByCode: (code: string) => `/dynamic-content/single/${code}`,
  getArrayByCode: (code: string) => `/dynamic-content/array/${code}`,
  getAll: "/dynamic-content",
  search: (params: Params) =>
    `/dynamic-content?${Object.entries(params)
      .map(([key, value]) => (value ? `${key}=${value}&` : ""))
      .join("")}`,
  create: "/dynamic-content/save",
  update: (id: string) => `/dynamic-content/save/${id}`,
  delete: (id: string) => `/dynamic-content/delete/${id}`,
};
