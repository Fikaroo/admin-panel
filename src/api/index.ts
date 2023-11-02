import axios from "axios";

const baseUrl = import.meta.env.VITE_API_URL;

const instance = axios.create({
  baseURL: baseUrl,
  // withCredentials: true,
});

export const getData = async (path: string) => (await instance.get(path)).data;

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

// export const searchDat

type Params = {
  searchString?: string;
  isActive?: boolean;
  pageNum?: number;
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
};

export const modelsApis = {
  getById: (id: string) => `/models/${id}`,
  getAll: "/models",
  search: (params: Params) =>
    `/models?${Object.entries(params).map(([key, value]) =>
      value ? `${key}=${value}&` : ""
    )}`,
  create: "/models/save",
  update: (id: string) => `/models/save/${id}`,
};

export const makesApis = {
  getById: (id: string) => `/makes/${id}`,
  getAll: "/makes",
  search: (params: Params) =>
    `/models?${Object.entries(params).map(([key, value]) =>
      value ? `${key}=${value}&` : ""
    )}`,
  create: "/makes/save",
  update: (id: string) => `/makes/save/${id}`,
};
