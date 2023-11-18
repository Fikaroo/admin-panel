export interface PriceSetting {
  minDays: number;
  maxDays?: number;
  pricePerDay: number;
}

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
  priceSettings: PriceSetting[];
  makeName: string;
  makeImageBase64: null;
  modelName: string;
  descriptionAz: null;
  descriptionEn: null;
  descriptionRu: null;
  nameAz: string;
  nameEn: string;
  nameRu: string;
}
export interface Discount {
  id: string;
  name: string;
  type: number;
  isActive: boolean;
  imageBase64?: string;
  enableBookButton: boolean;
  catalogId: string;
  startDate: string;
  endDate: string;
  discountPercentage: null;
  priceSettings: PriceSetting[];
  descriptionAz: string;
  descriptionEn: string;
  descriptionRu: string;
  captionAz: string;
  captionEn: string;
  captionRu: string;
  catalog?: Catalog;
}
export interface Order {
  id?: string;
  placeOfReceipt: string;
  placeOfHandover: string;
  startDate: Date;
  endDate: Date;
  startTime: string;
  calculatedPrice?: number;
  endTime: string;
  fullname: string;
  phoneNumber: string;
  email: string;
  comment: string;
  catalogId: string;
  status: number;
  catalog?: Catalog;
}
export interface Analytic {}
export interface Make {
  id: string;
  name: string;
  isActive: boolean;
  imageBase64: string;
}

export interface Model {
  id: string;
  name: string;
  isActive: boolean;
  makeId: string;
  makeName: string;
  imageBase64: string;
}

export interface Partner {
  id: string;
  code: string;
  content?: string;
  contentAz?: string;
  contentEn?: string;
  contentRu?: string;
  data: string;
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

export enum DriveUnit {
  Full = 1,
  Fron = 2,
  Back = 3,
}

export enum TransmissionType {
  Empty = 0,
  Mechanical = 1,
  Automatic = 2,
  Robot = 3,
  Variable = 4,
}

export enum EngineType {
  Petrol = 1,
  Diesel = 2,
  Gas = 3,
  Electro = 4,
  Hybrid = 5,
  PlugInHybrid = 6,
}

export enum BodyType {
  Sedan = 1,
  Hatchback = 2,
  Liftback = 3,
  SUV = 4,
  StationWagon = 5,
  Coupe = 6,
  Minivan = 7,
  Pickup = 8,
  Limousine = 9,
  Van = 10,
  Cabriolet = 11,
  Bus = 12,
  Minibus = 13,
  Track = 14,
  Motorcycle = 15,
  Agricultural = 16,
  Trailer = 17,
  Crane = 18,
  Loader = 19,
  GolfCar = 20,
  Universal = 21,
  Crossover = 22,
  Quadrocycle = 23,
  Scooter = 24,
  ConstructionEquipment = 25,
  Caravan = 26,
}

export enum SeatMaterialType {
  Leather = 1,
  Alcantara = 2,
  Vinyl = 3,
  Polyester = 4,
  Nylon = 5,
  Other = 6,
}

export enum Lang {
  Az = "az",
  En = "en",
  Ru = "ru",
}

export interface Faq {
  num: number;
  lang: Lang;
  question: string;
  answer: string;
}
