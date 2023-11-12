import axios, { AxiosRequestConfig } from "axios";

const baseUrl = import.meta.env.VITE_API_URL;

const instance = axios.create({
  baseURL: baseUrl,
  // withCredentials: true,
});

export const getData = async (
  path: string,
  option?: AxiosRequestConfig<unknown>
) => (await instance.get(path, option)).data;

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
};

export const calatogApis = {
  getById: (id: string) => `/catalog/${id}`,
  getAll: "/catalog",
  search: (params: Params) =>
    `/catalog?${Object.entries(params)
      .map(([key, value]) => (value ? `${key}=${value}&` : ""))
      .join("")}`,
  create: "/catalog/save",
  update: (id: string) => `/catalog/save/${id}`,
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
  delete: (id: string) => `/faq/delete/${id}`,
};

export const discountApis = {
  getAll: "/promotions",
  search: (params: Params) =>
    `/promotions?${Object.entries(params)
      .map(([key, value]) => (value ? `${key}=${value}&` : ""))
      .join("")}`,
  create: "/promotions/save",
  delete: (id: string) => `/promotions/delete/${id}`,
};
