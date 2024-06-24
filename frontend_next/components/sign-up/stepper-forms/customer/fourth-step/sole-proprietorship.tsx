import { Input } from "@frontend_next/components/ui/input";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@frontend_next/components/ui/form";
import { on } from "events";
import { Separator } from "@frontend_next/components/ui/separator";
import {
  RadioGroup,
  RadioGroupItem,
} from "@frontend_next/components/ui/radio-group";

export const SoleProprietorshipFourthStep = () => {
  const form = useForm<{
    org_full_name: string;
    org_short_name: string;
    legal_address: string;
    fact_address: string;
    email: string;
    web_site: string;
    vat: boolean;
  }>({
    defaultValues: {
      org_full_name: "",
      org_short_name: "",
      legal_address: "",
      fact_address: "",
      email: "",
      web_site: "",
      vat: false,
    },
  });

  const onSubmit = (data: {
    org_full_name: string;
    org_short_name: string;
    legal_address: string;
    fact_address: string;
    email: string;
    web_site: string;
    vat: boolean;
  }) => {
    console.log("data", data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="">
        {/* <h1 className="text-2xl font-bold">Данные предприятия</h1>
        <p className="text-sm text-gray-500">Введите данные предприятия</p>
        <Separator className="my-4" /> */}
        <h1 className="text-xl font-bold">Название предприятия</h1>
        <Separator className="my-2" />
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="org_full_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Полное название</FormLabel>
                <FormControl>
                  <Input placeholder="Введите название..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="org_short_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Короткое название</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Введите короткое название..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <h1 className="text-xl font-bold mt-8">Юридический адрес</h1>
        <Separator className="my-2" />
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="legal_address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Юридический адрес</FormLabel>
                <FormControl>
                  <Input placeholder="Введите адрес..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="fact_address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Фактический адрес</FormLabel>
                <FormControl>
                  <Input placeholder="Введите адрес..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <h1 className="text-xl font-bold mt-8">Фактический адрес</h1>
        <Separator className="my-2" />
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Электронная почта</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Введите электронную почту..."
                    {...field}
                    type="email"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="web_site"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Web сайт</FormLabel>
                <FormControl>
                  <Input placeholder="Введите сайт..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Separator className="my-4" />
        <FormField
          control={form.control}
          name="vat"
          render={({ field }) => (
            <FormItem className="flex space-x-4">
              <FormLabel className="text-lg">
                Являетес плательщиком НДС?
              </FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex space-x-6 space-y-0"
                >
                  <FormItem className="flex items-center space-x-1 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="true" />
                    </FormControl>
                    <FormLabel className="font-normal">Да</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-1 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="false" />
                    </FormControl>
                    <FormLabel className="font-normal">Нет</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};
