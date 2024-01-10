import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form/form";
import ImageUpload from "@/components/ui/image-upload/image-upload";
import { BodyType, Catalog, Make, Model, SeatMaterialType, TransmissionType } from "@/types";
import { useFormContext } from "react-hook-form";
import { changeArrayByIndex, defaultToast, enumToMap, getSelectAttr, yearsList } from "@/utils";
import { AutoDetailFormSchema } from "../Detail/AutoDetail";
import { makeApis, getData, modelApis, catalogApis, postData } from "@/api";
import useSWR from "swr";
import Switch from "@/components/ui/switch/switch";
import useSWRMutation from "swr/mutation";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";

const AutoDetailForm = ({ id }: { id: string | undefined }) => {
  const navigate = useNavigate();
  const form = useFormContext<AutoDetailFormSchema>();

  const { trigger: saveCatalog, isMutating } = useSWRMutation<Catalog, unknown, string, AutoDetailFormSchema>(
    id ? catalogApis.update(id) : catalogApis.create,
    postData,
  );

  const {
    trigger: removeCatalog,
    isMutating: removeIsMutation,
    error,
  } = useSWRMutation(id ? catalogApis.delete(id) : null, getData);

  const { data: makeData, isLoading: makesLoading } = useSWR<Make[]>(makeApis.getAll, getData);

  const { data: modelData, isLoading: modelLoading } = useSWR<Model[]>(
    form.watch("makeId") ? modelApis.search({ makeIds: form.watch("makeId") }) : null,
    getData,
  );

  const customOnChange = (e: React.ChangeEvent<HTMLSelectElement>, fieldName: keyof AutoDetailFormSchema) => {
    form.setValue(fieldName, getSelectAttr(e));
  };

  async function onSubmit(values: AutoDetailFormSchema) {
    const res = await defaultToast(saveCatalog(values));
    setTimeout(async () => {
      res && navigate("/auto");
    }, 1000);
  }
  console.log(form.watch());

  async function handleDelete() {
    await defaultToast(removeCatalog());
    setTimeout(async () => {
      !error && navigate("/auto");
    }, 1);
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
                      details="PNG, JPG"
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
                      details="SVG, PNG, JPG"
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
                      form.setValue(
                        "makeImageBase64",
                        makeData?.find(({ id }) => id === e.target.value)?.imageBase64 || "",
                      );
                    }}>
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
                    }}>
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
                  <select className="select" {...field} onChange={(e) => field.onChange(Number(e.target.value))}>
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
                    }}>
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
                    }}>
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
                    }}>
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
                  <>
                    <select
                      className="select"
                      {...field}
                      onChange={(e) => {
                        const seats = e.target.value.split("+");
                        field.onChange(Number(seats[0]));
                        form.setValue("extraSeatCount", 1);
                      }}>
                      <option value={-1} disabled selected hidden>
                        Кол-во пассажиров
                      </option>
                      {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
                        <option value={item} key={item}>
                          {item}
                        </option>
                      ))}
                    </select>
                    <div>
                      {/* <input
                        type="checkbox"
                        onChange={(e) =>
                          e.target.checked
                            ? form.setValue("extraSeatCount", 1)
                            : form.setValue("extraSeatCount", 0)
                        }
                      />{" "} */}
                    </div>
                  </>
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
                  <select className="select" {...field} onChange={(e) => field.onChange(Number(e.target.value))}>
                    <option value={-1} disabled selected hidden>
                      Кол-во багажа
                    </option>
                    {[1, 2, 3, 4].map((item) => (
                      <option value={item}>{item}</option>
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
                      const right = form.watch("priceSettings")?.slice(1, 3) || [
                        {
                          minDays: 8,
                          maxDays: 21,
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
                        maxDays: 21,
                        pricePerDay: +event.target.value
                          .replace(/^0+₼$/, "")
                          .replace(/₼/, "")
                          .replace(/[^\d]+/, ""),
                      };
                      const right = form.watch("priceSettings")?.slice(2, 3) || [
                        {
                          minDays: 22,
                          pricePerDay: 0,
                        },
                      ];
                      form.setValue("priceSettings", [...left, current, ...right]);
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
                          maxDays: 21,
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

        <div>
          <div style={{ display: "grid", gap: 24 }}>
            {form.watch("pricePerPeriods")?.map((item, index) => (
              <div style={{ display: "flex", gap: 16 }}>
                <div style={{ display: "grid", gap: 8 }}>
                  <div style={{ display: "flex", gap: "20px" }}>
                    <div style={{ width: "100%" }}>
                      <label style={{ display: "flex" }}>Начало срока</label>
                      <input
                        type="date"
                        name="startDate"
                        id=""
                        value={dayjs(item.startDate).format("YYYY-MM-DD")}
                        className="startDate"
                        onChange={(event) => {
                          const dateString = dayjs(event.target.value).toJSON();
                          const periods = form.watch("pricePerPeriods");
                          periods[index].startDate = dateString;
                          const newPeriods = changeArrayByIndex(periods, index, periods[index]);
                          form.setValue("pricePerPeriods", newPeriods);
                        }}
                        min={dayjs().format("YYYY-MM-DD")}
                        required
                      />
                    </div>

                    <div style={{ width: "100%" }}>
                      <label style={{ display: "flex" }}>Конец срока</label>
                      <input
                        type="date"
                        name="endDate"
                        id=""
                        className="endDate"
                        value={dayjs(item.endDate).format("YYYY-MM-DD")}
                        onChange={(event) => {
                          const dateString = dayjs(event.target.value).toJSON();
                          const periods = form.watch("pricePerPeriods");
                          periods[index].endDate = dateString;
                          const newPeriods = changeArrayByIndex(periods, index, periods[index]);
                          form.setValue("pricePerPeriods", newPeriods);
                        }}
                        min={dayjs(item.startDate).format("YYYY-MM-DD")}
                        required
                      />
                    </div>
                  </div>

                  <div className="columns" key={index}>
                    <FormField
                      control={form.control}
                      name="pricePerPeriods"
                      render={({ field }) => (
                        <FormItem className="select__group">
                          <FormLabel>2-7 дней</FormLabel>
                          <FormControl>
                            <input
                              className="input"
                              {...field}
                              value={field.value?.[index]?.prices?.[0].pricePerDay + "₼"}
                              onChange={(event) => {
                                const current = {
                                  minDays: 2,
                                  maxDays: 7,
                                  pricePerDay: +event.target.value
                                    .replace(/^0+₼$/, "")
                                    .replace(/₼/, "")
                                    .replace(/[^\d]+/, ""),
                                };
                                const right = form.watch("pricePerPeriods")?.[index].prices?.slice(1, 3) || [
                                  {
                                    minDays: 8,
                                    maxDays: 21,
                                    pricePerDay: 0,
                                  },
                                  {
                                    minDays: 22,
                                    pricePerDay: 0,
                                  },
                                ];

                                const periods = form.watch("pricePerPeriods");
                                periods[index].prices = [current, ...right];
                                form.setValue("pricePerPeriods", periods);
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
                      name="pricePerPeriods"
                      render={({ field }) => (
                        <FormItem className="select__group">
                          <FormLabel>8-21 дней</FormLabel>
                          <FormControl>
                            <input
                              className="input"
                              {...field}
                              value={field.value?.[index]?.prices?.[1].pricePerDay + "₼"}
                              onChange={(event) => {
                                const left = form.watch("pricePerPeriods")?.[index].prices?.slice(0, 1) || [
                                  {
                                    minDays: 2,
                                    maxDays: 7,
                                    pricePerDay: 0,
                                  },
                                ];
                                const current = {
                                  minDays: 8,
                                  maxDays: 21,
                                  pricePerDay: +event.target.value
                                    .replace(/^0+₼$/, "")
                                    .replace(/₼/, "")
                                    .replace(/[^\d]+/, ""),
                                };
                                const right = form.watch("pricePerPeriods")?.[index].prices?.slice(2, 3) || [
                                  {
                                    minDays: 22,
                                    pricePerDay: 0,
                                  },
                                ];
                                const periods = form.watch("pricePerPeriods");
                                periods[index].prices = [...left, current, ...right];
                                form.setValue("pricePerPeriods", periods);
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
                      name="pricePerPeriods"
                      render={({ field }) => (
                        <FormItem className="select__group">
                          <FormLabel>22+ дней</FormLabel>
                          <FormControl>
                            <input
                              className="input"
                              {...field}
                              value={field.value?.[index]?.prices?.[2].pricePerDay + "₼"}
                              onChange={(event) => {
                                const left = form.watch("pricePerPeriods")?.[index].prices?.slice(0, 2) || [
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
                                ];
                                const current = {
                                  minDays: 22,
                                  pricePerDay: +event.target.value
                                    .replace(/^0+₼$/, "")
                                    .replace(/₼/, "")
                                    .replace(/[^\d]+/, ""),
                                };
                                const periods = form.watch("pricePerPeriods");
                                periods[index].prices = [...left, current];
                                form.setValue("pricePerPeriods", periods);
                              }}
                              type="text"
                            />
                          </FormControl>
                          <FormMessage className="error" />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <button
                  type="button"
                  className="btn"
                  style={{ width: "fit-content", height: "fit-content", margin: "auto" }}
                  onClick={() => {
                    const periods = form.watch("pricePerPeriods");
                    periods.splice(index, 1);
                    form.setValue("pricePerPeriods", periods);
                  }}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    style={{ widows: 24, height: 24 }}>
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M12 9.75 14.25 12m0 0 2.25 2.25M14.25 12l2.25-2.25M14.25 12 12 14.25m-2.58 4.92-6.374-6.375a1.125 1.125 0 0 1 0-1.59L9.42 4.83c.21-.211.497-.33.795-.33H19.5a2.25 2.25 0 0 1 2.25 2.25v10.5a2.25 2.25 0 0 1-2.25 2.25h-9.284c-.298 0-.585-.119-.795-.33Z"
                    />
                  </svg>
                </button>
              </div>
            ))}
          </div>

          <button
            type="button"
            className="btn btn_outline"
            style={{ width: "fit-content", marginTop: 12 }}
            onClick={() => {
              form.setValue("pricePerPeriods", [
                ...form.watch("pricePerPeriods"),
                {
                  startDate: "",
                  endDate: "",
                  prices: [
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
                },
              ]);
            }}>
            Добавить периоды цена
          </button>
        </div>

        <div>
          <div style={{ display: "grid", gap: 24 }}>
            {form.watch("inactivePeriods")?.map((item, index) => (
              <div style={{ display: "flex", gap: 16 }}>
                <div className="columns" key={index}>
                  <div style={{ display: "flex", gap: "20px" }}>
                    <div style={{ width: "100%" }}>
                      <label style={{ display: "flex" }}>Начало срока</label>
                      <input
                        type="date"
                        name="startDate"
                        id=""
                        value={dayjs(item.startDate).format("YYYY-MM-DD")}
                        className="startDate"
                        onChange={(event) => {
                          const dateString = dayjs(event.target.value).toJSON();
                          const periods = form.watch("inactivePeriods");
                          periods[index].startDate = dateString;
                          const newPeriods = changeArrayByIndex(periods, index, periods[index]);
                          form.setValue("inactivePeriods", newPeriods);
                        }}
                        min={dayjs().format("YYYY-MM-DD")}
                        required
                      />
                    </div>

                    <div style={{ width: "100%" }}>
                      <label style={{ display: "flex" }}>Конец срока</label>
                      <input
                        type="date"
                        name="endDate"
                        id=""
                        className="endDate"
                        value={dayjs(item.endDate).format("YYYY-MM-DD")}
                        onChange={(event) => {
                          const dateString = dayjs(event.target.value).toJSON();
                          const periods = form.watch("inactivePeriods");
                          periods[index].endDate = dateString;
                          const newPeriods = changeArrayByIndex(periods, index, periods[index]);
                          form.setValue("inactivePeriods", newPeriods);
                        }}
                        min={dayjs(item.startDate).format("YYYY-MM-DD")}
                        required
                      />
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  className="btn"
                  style={{ width: "fit-content", height: "fit-content", margin: "auto" }}
                  onClick={() => {
                    const periods = form.watch("inactivePeriods");
                    periods.splice(index, 1);
                    form.setValue("inactivePeriods", periods);
                  }}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    style={{ widows: 24, height: 24 }}>
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M12 9.75 14.25 12m0 0 2.25 2.25M14.25 12l2.25-2.25M14.25 12 12 14.25m-2.58 4.92-6.374-6.375a1.125 1.125 0 0 1 0-1.59L9.42 4.83c.21-.211.497-.33.795-.33H19.5a2.25 2.25 0 0 1 2.25 2.25v10.5a2.25 2.25 0 0 1-2.25 2.25h-9.284c-.298 0-.585-.119-.795-.33Z"
                    />
                  </svg>
                </button>
              </div>
            ))}
          </div>

          <button
            type="button"
            className="btn btn_outline"
            style={{ width: "fit-content", marginTop: 12 }}
            onClick={() => {
              form.setValue("inactivePeriods", [
                ...form.watch("inactivePeriods"),
                {
                  startDate: "",
                  endDate: "",
                },
              ]);
            }}>
            добавить неактивный период
          </button>
        </div>

        <FormField
          control={form.control}
          name="isActive"
          render={({ field }) => (
            <FormItem className="select__group">
              <FormControl>
                <Switch isAcive={field.value} onChange={field.onChange} label="Активизировать карточку" />
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
              disabled={isMutating || removeIsMutation}>
              Удалить
            </button>
            <button type="submit" className="btn btn_primary" disabled={isMutating || removeIsMutation}>
              Сохранить изменения
            </button>
          </div>
        ) : (
          <button type="submit" className="btn btn_primary" disabled={isMutating || removeIsMutation}>
            Сохранить изменения
          </button>
        )}
      </form>
    </Form>
  );
};

export default AutoDetailForm;
