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

export const SoleProprietorshipSecondStep = () => {
  const form = useForm<{
    first_name: string;
    last_name: string;
    sur_name: string;
    email: string;
    phone: string;
  }>({
    defaultValues: {
      first_name: "",
      last_name: "",
      sur_name: "",
      phone: "",
      email: "",
    },
  });

  const onSubmit = (data: {
    first_name: string;
    last_name: string;
    sur_name: string;
    phone: string;
    email: string;
  }) => {
    console.log("data", data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className=" my-6">
        <h1 className="text-xl font-bold">Контактные данные</h1>
        <p className="text-sm text-gray-500">
          Введите Контактные данные для сотрудничество
        </p>
        <Separator className="my-4" />
        <div className="grid grid-cols-3 gap-4">
          <FormField
            control={form.control}
            name="last_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Фамилия</FormLabel>
                <FormControl>
                  <Input placeholder="Введите Вашу фамилию..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="first_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Имя</FormLabel>
                <FormControl>
                  <Input placeholder="Введите Ваше имя..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="sur_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Отчество</FormLabel>
                <FormControl>
                  <Input placeholder="Введите Ваше отчество..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Контактный номер телефона</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Введите контактный номер телефона..."
                    {...field}
                    type="phone"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
        </div>
      </form>
    </Form>
  );
};
