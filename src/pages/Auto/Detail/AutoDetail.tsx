import "./AutoDetail.scss";
import { useNavigate, useParams } from "react-router-dom";
import ArrowLeft from "@/assets/arrow-narrow-left.svg?react";
import Card from "@/components/Card/Card";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { catalogApis, getData } from "@/api";
import AutoDetailForm from "../components/AutoDetailForm";
import * as z from "zod";
import useSWR from "swr";
import Loading from "@/components/Loading";

const formSchema = z.object({
  isActive: z.boolean().default(false),
  isPromotion: z.boolean().default(false),
  makeId: z.string(),
  modelId: z.string(),
  yearOfManufacture: z.number().min(1),
  bodyType: z.number().min(1),
  seatCount: z.number().min(1),
  extraSeatCount: z.number().default(0),
  luggageCount: z.number().min(1),
  seatMaterialType: z.number().min(1),
  gearType: z.number().min(-1),
  imageBase64: z.string(),
  priceSettings: z.array(
    z.object({
      minDays: z.number().min(1),
      maxDays: z.number().optional(),
      pricePerDay: z.number().min(1),
    }),
  ),
  pricePerPeriods: z.nullable(
    z.array(
      z.object({
        startDate: z.string(),
        endDate: z.string(),
        prices: z
          .array(
            z.object({
              minDays: z.number().min(1),
              maxDays: z.number().optional(),
              pricePerDay: z.number().min(1),
            }),
          )
          .optional(),
      }),
    ),
  ),
  inactivePeriods: z.nullable(
    z.array(
      z.object({
        startDate: z.string(),
        endDate: z.string(),
      }),
    ),
  ),
  makeName: z.string(),
  makeImageBase64: z.string(),
  modelName: z.string(),
});

export type AutoDetailFormSchema = z.infer<typeof formSchema>;

const AutoDetail = () => {
  const { id } = useParams();
  const { data, isLoading, error } = useSWR<AutoDetailFormSchema>(id && catalogApis.getById(id), getData);

  const navigate = useNavigate();

  const form = useForm<AutoDetailFormSchema>({
    mode: "onChange",
    resolver: zodResolver(formSchema),
    defaultValues: {
      extraSeatCount: 0,
      isActive: false,
      modelId: "",
      modelName: "",
      priceSettings: [
        {
          minDays: 2,
          maxDays: 7,
          pricePerDay: 0,
        },
        {
          minDays: 8,
          maxDays: 21,
          pricePerDay: 0,
        },
        {
          minDays: 22,
          pricePerDay: 0,
        },
      ],
      pricePerPeriods: [],
      inactivePeriods: [],
    },
    values: data,
  });

  const handleBackNavigation = () => navigate(-1);

  if (isLoading) return <Loading />;
  if (error) return "No result";

  return (
    <FormProvider {...form}>
      <div className="auto__detail">
        <button className="back__btn" onClick={handleBackNavigation}>
          <ArrowLeft className="left__arrow" />
          <p>Назад</p>
        </button>

        <h1 className="header__title">{id ? "Карточка авто" : "Добавить авто"}</h1>

        <div className="form__container">
          <AutoDetailForm id={id} />
          <Card />
        </div>
      </div>
    </FormProvider>
  );
};

export default AutoDetail;
