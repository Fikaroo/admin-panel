import "./AutoDetail.scss";
import { useNavigate, useParams } from "react-router-dom";
import ArrowLeft from "@/assets/arrow-narrow-left.svg?react";
import Card from "@/components/Card/Card";

import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { zodResolver } from "@hookform/resolvers/zod";
import useSWR from "swr";
import { makeApis, getData, modelApis, calatogApis } from "@/api";
import {
  BodyType,
  Make,
  Model,
  TransmissionType,
  SeatMaterialType,
} from "@/types";
import { enumToMap, getSelectAttr, yearsList } from "@/utils";
import Switch from "@/components/ui/switch/switch";
import ImageUpload from "@/components/ui/image-upload/image-upload";
import { useEffect } from "react";

const schema = z.object({
  carLogoImg: z.string().min(1),
  carImg: z.string().min(1),
  makeId: z.string().min(1),
  make: z.string().min(1),
  modelId: z.string().min(1),
  model: z.string().min(1),
  yearOfManufacture: z.number().min(1),
  gearTypeId: z.number().min(1),
  gearType: z.string().min(1),
  bodyTypeId: z.number().min(1),
  bodyType: z.string().min(1),
  seatMaterialTypeId: z.number().min(1),
  seatMaterialType: z.string().min(1),
  seatCount: z.number().min(1),
  extraSeatCount: z.number().min(1),
  luggageCount: z.number().min(1),
  firstPrice: z.number().min(1),
  secondPrice: z.number().min(1),
  thirdPrice: z.number().min(1),
  isActive: z.boolean(),
});

export type AutoDetailForm = z.infer<typeof schema>;

const AutoDetail = () => {
  const { id } = useParams();
  const { data } = useSWR(id && calatogApis.getById(id), getData);
  const navigate = useNavigate();

  // Todo create a logic for preview card details
  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isDirty, isValid },
  } = useForm<AutoDetailForm>({
    mode: "onChange",
    resolver: zodResolver(schema),
    defaultValues: {
      carLogoImg: "",
      carImg: "",
      make: "",
      makeId: "",
      model: "",
      yearOfManufacture: -1,
      gearType: "",
      gearTypeId: -1,
      bodyType: "",
      bodyTypeId: -1,
      seatMaterialType: "",
      seatMaterialTypeId: -1,
      seatCount: -1,
      extraSeatCount: -1,
      luggageCount: -1,
      firstPrice: 0,
      secondPrice: 0,
      thirdPrice: 0,
      isActive: false,
    },
    values: {
      ...data,
      gearType: TransmissionType?.[data?.gearType],
      gearTypeId: data?.gearType,
      bodyType: BodyType?.[data?.bodyType],
      bodyTypeId: data?.bodyType,
      // need add seatMaterialtype enum
      seatMaterialType: SeatMaterialType?.[data?.seatMaterialType],
      seatMaterialTypeId: data?.seatMaterialType,
      firstPrice: data?.priceSettings?.at(0)?.pricePerDay,
      secondPrice: data?.priceSettings?.at(1)?.pricePerDay,
      thirdPrice: data?.priceSettings?.at(2)?.pricePerDay,
    },
  });

  const { data: makeData, isLoading: makesLoading } = useSWR<Make[]>(
    makeApis.getAll,
    getData
  );
  const { data: modelData } = useSWR<Model[]>(
    watch("makeId") ? modelApis.search({ makeIds: watch("makeId") }) : null,
    getData
  );

  const handleBackNavigation = () => navigate(-1);

  useEffect(() => {
    if (id) {
      const currentCar = modelData?.find(
        ({ makeId }) => watch("makeId") === makeId
      );
      currentCar?.makeName && setValue("make", currentCar?.makeName);
      currentCar?.name && setValue("model", currentCar?.name);
    }
  }, [modelData]);

  const customOnChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
    fieldName: keyof AutoDetailForm
  ) => {
    setValue(fieldName, getSelectAttr(e));
  };

  const onSubmit = (data: AutoDetailForm) => console.log(data);
  return (
    <div className="auto__detail">
      <button className="back__btn" onClick={handleBackNavigation}>
        <ArrowLeft className="left__arrow" />
        <p>Назад</p>
      </button>

      <h1 className="header__title">Карточка авто</h1>

      <div className="form__container">
        <form className="form" onSubmit={handleSubmit(onSubmit)}>
          <div className="columns">
            <div className="columns_group">
              <ImageUpload
                setValue={setValue}
                name="carImg"
                title="фото"
                details="SVG, PNG, JPG or GIF (max. 464 x 240 px)"
              />
              {errors?.carImg?.message && (
                <span className="error">{errors?.carImg?.message}</span>
              )}
            </div>

            <div className="columns_group">
              <ImageUpload
                setValue={setValue}
                name="carLogoImg"
                title="логотип"
                details="SVG, PNG, JPG or GIF (max. 72 x 72 px)"
              />
              {errors?.carLogoImg?.message && (
                <span className="error">{errors?.carLogoImg?.message}</span>
              )}
            </div>
          </div>

          <div className="columns">
            <Controller
              control={control}
              name="makeId"
              render={({ field }) => (
                <div className="select__group">
                  <label>Марка</label>
                  <select
                    className="select"
                    {...field}
                    onChange={(e) => {
                      field.onChange(e);
                      customOnChange(e, "make");
                    }}
                    required
                  >
                    <option value="" disabled selected hidden>
                      Марка
                    </option>
                    {makeData?.map(({ id, name }) => (
                      <option key={id} data-state={name} value={id}>
                        {name}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            />

            <Controller
              control={control}
              name="modelId"
              render={({ field }) => (
                <div className="select__group">
                  <label>Модель</label>
                  <select
                    className="select"
                    {...field}
                    onChange={(e) => {
                      field.onChange(e);
                      customOnChange(e, "model");
                    }}
                    required
                    disabled={makesLoading || watch("makeId") ? false : true}
                  >
                    <option value="" disabled selected hidden>
                      Модель
                    </option>
                    {modelData?.map(({ id, name }) => (
                      <option key={id} data-state={name} value={id}>
                        {name}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            />
          </div>

          <div className="columns">
            <Controller
              control={control}
              name="yearOfManufacture"
              render={({ field }) => (
                <div className="select__group">
                  <label>Год выпуска</label>
                  <select
                    className="select"
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                    required
                  >
                    <option value={-1} disabled selected hidden>
                      Год выпуска
                    </option>
                    {yearsList?.map((year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            />

            <Controller
              control={control}
              name="gearTypeId"
              render={({ field }) => (
                <div className="select__group">
                  <label>Коробка передач</label>
                  <select
                    className="select"
                    {...field}
                    onChange={(e) => {
                      field.onChange(Number(e.target.value));
                      customOnChange(e, "gearType");
                    }}
                    required
                  >
                    <option value={-1} disabled selected hidden>
                      Коробка передач
                    </option>
                    {enumToMap(TransmissionType).map(([key, value]) => (
                      <option key={key} data-state={value} value={key}>
                        {value}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            />
          </div>

          <div className="columns">
            <Controller
              control={control}
              name="bodyTypeId"
              render={({ field }) => (
                <div className="select__group">
                  <label>Категория</label>
                  <select
                    className="select"
                    {...field}
                    onChange={(e) => {
                      field.onChange(Number(e.target.value));

                      customOnChange(e, "bodyType");
                    }}
                    required
                  >
                    <option value={-1} disabled selected hidden>
                      Категория
                    </option>
                    {enumToMap(BodyType)?.map(([key, value]) => (
                      <option key={key} data-state={value} value={key}>
                        {value}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            />
            <Controller
              control={control}
              name="seatMaterialTypeId"
              render={({ field }) => (
                <div className="select__group">
                  <label>Салон</label>
                  <select
                    className="select"
                    {...field}
                    onChange={(e) => {
                      field.onChange(Number(e.target.value));
                      customOnChange(e, "seatMaterialType");
                    }}
                    required
                  >
                    <option value={-1} disabled selected hidden>
                      Салон
                    </option>
                    {enumToMap(SeatMaterialType)?.map(([key, value]) => (
                      <option key={key} data-state={value} value={key}>
                        {value}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            />
          </div>

          <div className="columns">
            <Controller
              control={control}
              name="seatCount"
              render={({ field }) => (
                <div className="select__group">
                  <label>Кол-во пассажиров</label>
                  <select
                    className="select"
                    {...field}
                    onChange={(e) => {
                      const seats = e.target.value.split("+");
                      setValue("extraSeatCount", Number(seats?.[1]));
                      field.onChange(Number(seats[0]));
                    }}
                    required
                  >
                    <option value={-1} disabled selected hidden>
                      Кол-во пассажиров
                    </option>
                    {/* //Todo need update with dynamic data */}
                    <option value={"6+1"}>6 + 1</option>
                  </select>
                </div>
              )}
            />

            {errors?.seatCount?.message && (
              <span className="error">{errors?.seatCount?.message}</span>
            )}
            <Controller
              control={control}
              name="luggageCount"
              render={({ field }) => (
                <div className="select__group">
                  <label>Кол-во багажа</label>
                  <select className="select" {...field} required>
                    <option value={-1} disabled selected hidden>
                      Кол-во багажа
                    </option>
                    {/* //Todo need update with dynamic data */}
                    <option value={4}>4</option>
                  </select>
                </div>
              )}
            />
          </div>

          <div className="columns">
            <Controller
              control={control}
              name="firstPrice"
              render={({ field }) => (
                <div className="select__group">
                  <label>2-7 дней</label>
                  <input
                    className="input"
                    {...field}
                    value={field.value + "₼"}
                    onChange={(event) =>
                      field.onChange(
                        +event.target.value
                          .replace(/^0+₼$/, "")
                          .replace(/₼/, "")
                          .replace(/[^\d]+/, "")
                      )
                    }
                    type="text"
                  />
                </div>
              )}
            />
            <Controller
              control={control}
              name="secondPrice"
              render={({ field }) => (
                <div className="select__group">
                  <label>8-21 дней</label>
                  <input
                    className="input"
                    {...field}
                    value={field.value + "₼"}
                    onChange={(event) =>
                      field.onChange(
                        +event.target.value
                          .replace(/^0+₼$/, "")
                          .replace(/₼/, "")
                          .replace(/[^\d]+/, "")
                      )
                    }
                    type="text"
                  />
                </div>
              )}
            />
            <Controller
              control={control}
              name="thirdPrice"
              render={({ field }) => (
                <div className="select__group">
                  <label>22+ дней</label>
                  <input
                    className="input"
                    {...field}
                    value={field.value + "₼"}
                    onChange={(event) =>
                      field.onChange(
                        +event.target.value
                          .replace(/^0+₼$/, "")
                          .replace(/₼/, "")
                          .replace(/[^\d]+/, "")
                      )
                    }
                    type="text"
                  />
                </div>
              )}
            />
          </div>

          <Switch isAcive={watch("isActive")} label="Активизировать карточку" />
          <DevTool control={control} />

          {id ? (
            <button
              type="submit"
              className="btn btn_primary"
              disabled={!isDirty || !isValid}
            >
              Сохранить изменения
            </button>
          ) : (
            <div className="btn_group">
              <button type="submit" className="btn btn_outline">
                Удалить
              </button>
              <button type="submit" className="btn btn_primary">
                Сохранить изменения
              </button>
            </div>
          )}
        </form>
        <Card carForm={watch()} carData={data} />
      </div>
    </div>
  );
};

export default AutoDetail;
