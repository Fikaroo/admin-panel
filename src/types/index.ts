export interface Catalog {
  id: string;
  isActive: boolean;
  isPromotion: boolean;
  makeId: string;
  modelId: string;
  yearOfManufacture: number;
  bodyType: number;
  seatCount: number;
  extraSeatCount: number;
  luggageCount: number;
  seatMaterialType: number;
  gearType: number;
  imageBase64: string;
  makeName: string;
  modelName: string;
  descriptionAz: string;
  descriptionEn: string;
  descriptionRu: string;
  nameAz: string;
  nameEn: string;
  nameRu: string;
}

export type Pagination = {
  total_records: number;
  total_pages: number;
  next_page: "true" | "false";
  prev_page: "true" | "false";
};

export type DataWithPagination<D> = {
  data: D;
  pagination: Pagination;
};
