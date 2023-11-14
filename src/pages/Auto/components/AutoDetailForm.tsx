import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form/form";
import ImageUpload from "@/components/ui/image-upload/image-upload";
import {
  BodyType,
  Catalog,
  Make,
  Model,
  SeatMaterialType,
  TransmissionType,
} from "@/types";
import { useFormContext } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { enumToMap, getSelectAttr, yearsList } from "@/utils";
import { AutoDetailFormSchema } from "../Detail/AutoDetail";
import { makeApis, getData, modelApis, catalogApis, postData } from "@/api";
import useSWR from "swr";
import Switch from "@/components/ui/switch/switch";
import useSWRMutation from "swr/mutation";
import { useNavigate } from "react-router-dom";

const AutoDetailForm = ({ id }: { id: string | undefined }) => {
  const navigate = useNavigate();
  const form = useFormContext<AutoDetailFormSchema>();

  const { trigger: saveCatalog } = useSWRMutation<
    Catalog,
    unknown,
    string,
    AutoDetailFormSchema
  >(id ? catalogApis.update(id) : catalogApis.create, postData);

  const { trigger: removeCatalog } = useSWRMutation(
    id ? catalogApis.delete(id) : null,
    getData
  );

  const { data: makeData, isLoading: makesLoading } = useSWR<Make[]>(
    makeApis.getAll,
    getData
  );

  const { data: modelData, isLoading: modelLoading } = useSWR<Model[]>(
    form.watch("makeId")
      ? modelApis.search({ makeIds: form.watch("makeId") })
      : null,
    getData
  );

  const customOnChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
    fieldName: keyof AutoDetailFormSchema
  ) => {
    form.setValue(fieldName, getSelectAttr(e));
  };

  async function onSubmit(values: AutoDetailFormSchema) {
    saveCatalog(values);
    id && navigate(-1);
  }

  async function handleDelete() {
    removeCatalog();
    navigate(-1);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="form">
        <div className="columns">
          <div className="columns_group">
            <FormField
              control={form.control}
              name="imageBase64"
              rules={{ required: true }}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <ImageUpload
                      clsName={"upload-image-container"}
                      beforeTitle="Добавить в "
                      title="фото"
                      details="SVG, PNG, JPG or GIF (max. 464 x 240 px)"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="error" />
                </FormItem>
              )}
            />
          </div>

          <div className="columns_group">
            <FormField
              control={form.control}
              name="makeImageBase64"
              rules={{ required: true }}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <ImageUpload
                      clsName={"upload-image-container"}
                      beforeTitle="Добавить в "
                      title="логотип"
                      details="SVG, PNG, JPG or GIF (max. 72 x 72 px)"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="error" />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="columns">
          <FormField
            control={form.control}
            name="makeId"
            disabled={makesLoading}
            render={({ field }) => (
              <FormItem className="select__group">
                <FormLabel>Марка</FormLabel>
                <FormControl>
                  <select
                    className="select"
                    {...field}
                    onChange={(e) => {
                      field.onChange(e);
                      customOnChange(e, "makeName");
                      form.setValue("modelId", "");
                    }}
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
                </FormControl>
                <FormMessage className="error" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="modelId"
            disabled={modelLoading || form.watch("makeId") ? false : true}
            render={({ field }) => (
              <FormItem className="select__group">
                <FormLabel>Модель</FormLabel>
                <FormControl>
                  <select
                    className="select"
                    {...field}
                    onChange={(e) => {
                      field.onChange(e);
                      customOnChange(e, "modelName");
                    }}
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
                </FormControl>
                <FormMessage className="error" />
              </FormItem>
            )}
          />
        </div>

        <div className="columns">
          <FormField
            control={form.control}
            name="yearOfManufacture"
            render={({ field }) => (
              <FormItem className="select__group">
                <FormLabel>Год выпуска</FormLabel>
                <FormControl>
                  <select
                    className="select"
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
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
                </FormControl>
                <FormMessage className="error" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="gearType"
            render={({ field }) => (
              <FormItem className="select__group">
                <FormLabel>Коробка передач</FormLabel>
                <FormControl>
                  <select
                    className="select"
                    {...field}
                    onChange={(e) => {
                      field.onChange(Number(e.target.value));
                    }}
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
                </FormControl>
                <FormMessage className="error" />
              </FormItem>
            )}
          />
        </div>

        <div className="columns">
          <FormField
            control={form.control}
            name="bodyType"
            render={({ field }) => (
              <FormItem className="select__group">
                <FormLabel>Категория</FormLabel>
                <FormControl>
                  <select
                    className="select"
                    {...field}
                    onChange={(e) => {
                      field.onChange(Number(e.target.value));
                    }}
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
                </FormControl>
                <FormMessage className="error" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="seatMaterialType"
            render={({ field }) => (
              <FormItem className="select__group">
                <FormLabel>Салон</FormLabel>
                <FormControl>
                  <select
                    className="select"
                    {...field}
                    onChange={(e) => {
                      field.onChange(Number(e.target.value));
                    }}
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
                </FormControl>
                <FormMessage className="error" />
              </FormItem>
            )}
          />
        </div>

        <div className="columns">
          <FormField
            control={form.control}
            name="seatCount"
            render={({ field }) => (
              <FormItem className="select__group">
                <FormLabel>Кол-во пассажиров</FormLabel>
                <FormControl>
                  <select
                    className="select"
                    {...field}
                    onChange={(e) => {
                      const seats = e.target.value.split("+");
                      form.setValue("extraSeatCount", Number(seats?.[1]));
                      field.onChange(Number(seats[0]));
                    }}
                  >
                    <option value={-1} disabled selected hidden>
                      Кол-во пассажиров
                    </option>
                    <option value={"6+1"}>6 + 1</option>
                  </select>
                </FormControl>
                <FormMessage className="error" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="luggageCount"
            render={({ field }) => (
              <FormItem className="select__group">
                <FormLabel>Кол-во багажа</FormLabel>
                <FormControl>
                  <select
                    className="select"
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  >
                    <option value={-1} disabled selected hidden>
                      Кол-во багажа
                    </option>
                    <option value={4}>4</option>
                  </select>
                </FormControl>
                <FormMessage className="error" />
              </FormItem>
            )}
          />
        </div>

        <div className="columns">
          <FormField
            control={form.control}
            name="priceSettings"
            render={({ field }) => (
              <FormItem className="select__group">
                <FormLabel>2-7 дней</FormLabel>
                <FormControl>
                  <input
                    className="input"
                    {...field}
                    value={field.value?.[0]?.pricePerDay + "₼"}
                    onChange={(event) => {
                      const current = {
                        minDays: 2,
                        maxDays: 7,
                        pricePerDay: +event.target.value
                          .replace(/^0+₼$/, "")
                          .replace(/₼/, "")
                          .replace(/[^\d]+/, ""),
                      };
                      const right = form
                        .watch("priceSettings")
                        ?.slice(1, 3) || [
                        {
                          minDays: 8,
                          maxDays: 12,
                          pricePerDay: 0,
                        },
                        {
                          minDays: 22,
                          pricePerDay: 0,
                        },
                      ];
                      form.setValue("priceSettings", [current, ...right]);
                    }}
                    type="text"
                  />
                </FormControl>
                <FormMessage className="error" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="priceSettings"
            render={({ field }) => (
              <FormItem className="select__group">
                <FormLabel>8-21 дней</FormLabel>
                <FormControl>
                  <input
                    className="input"
                    {...field}
                    value={field.value?.[1]?.pricePerDay + "₼"}
                    onChange={(event) => {
                      const left = form.watch("priceSettings")?.slice(0, 1) || [
                        {
                          minDays: 2,
                          maxDays: 7,
                          pricePerDay: 0,
                        },
                      ];
                      const current = {
                        minDays: 8,
                        maxDays: 12,
                        pricePerDay: +event.target.value
                          .replace(/^0+₼$/, "")
                          .replace(/₼/, "")
                          .replace(/[^\d]+/, ""),
                      };
                      const right = form
                        .watch("priceSettings")
                        ?.slice(2, 3) || [
                        {
                          minDays: 22,
                          pricePerDay: 0,
                        },
                      ];
                      form.setValue("priceSettings", [
                        ...left,
                        current,
                        ...right,
                      ]);
                    }}
                    type="text"
                  />
                </FormControl>
                <FormMessage className="error" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="priceSettings"
            render={({ field }) => (
              <FormItem className="select__group">
                <FormLabel>22+ дней</FormLabel>
                <FormControl>
                  <input
                    className="input"
                    {...field}
                    value={field.value?.[2]?.pricePerDay + "₼"}
                    onChange={(event) => {
                      const left = form.watch("priceSettings")?.slice(0, 2) || [
                        {
                          minDays: 2,
                          maxDays: 7,
                          pricePerDay: 0,
                        },
                        {
                          minDays: 8,
                          maxDays: 12,
                          pricePerDay: 0,
                        },
                      ];
                      const current = {
                        minDays: 22,
                        pricePerDay: +event.target.value
                          .replace(/^0+₼$/, "")
                          .replace(/₼/, "")
                          .replace(/[^\d]+/, ""),
                      };
                      form.setValue("priceSettings", [...left, current]);
                    }}
                    type="text"
                  />
                </FormControl>
                <FormMessage className="error" />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="isActive"
          render={({ field }) => (
            <FormItem className="select__group">
              <FormControl>
                <Switch
                  isAcive={field.value}
                  onChange={field.onChange}
                  label="Активизировать карточку"
                />
              </FormControl>
              <FormMessage className="error" />
            </FormItem>
          )}
        />

        {id ? (
          <div className="btn_group">
            <button
              type="button"
              onClick={handleDelete}
              className="btn btn_outline"
            >
              Удалить
            </button>
            <button type="submit" className="btn btn_primary">
              Сохранить изменения
            </button>
          </div>
        ) : (
          <button type="submit" className="btn btn_primary">
            Сохранить изменения
          </button>
        )}
      </form>

      <DevTool control={form.control} />
    </Form>
  );
};

export default AutoDetailForm;