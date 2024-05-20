import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form/form";
import { defaultToast } from "@/utils";
import useSWRMutation from "swr/mutation";
import { dynamicContentApis, getData, postData } from "@/api";
import useSWRImmutable from "swr/immutable";
import Loading from "@/components/Loading";

import "./InfoMinBookHours.scss";

const FormSchema = z.object({
  data: z.string().min(1),
});

const InfoMinBookHours = () => {
  const { data, isLoading, error } = useSWRImmutable(dynamicContentApis.getSingleByCode("min_book_hours"), getData);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    values: { data: data?.data },
  });

  const { trigger, isMutating } = useSWRMutation(data?.id ? dynamicContentApis.update(data?.id) : null, postData);

  function onSubmit(data: z.infer<typeof FormSchema>) {
    defaultToast(trigger(data));
  }

  if (isLoading) {
    return <Loading />;
  }
  if (error) {
    <code>{error}</code>;
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="min_book_days">
        <FormField
          control={form.control}
          name="data"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Минимальное количество дней бронирования</FormLabel>
              <FormControl>
                <input
                  className="input"
                  style={{ marginTop: 8 }}
                  placeholder="0"
                  {...field}
                  onChange={(event) => {
                    field.onChange(event.target.value.replace(/[^\d]+/, ""));
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <button className="btn btn_primary" type="submit" disabled={isMutating}>
          Сохранить изменения
        </button>
      </form>
    </Form>
  );
};

export default InfoMinBookHours;
