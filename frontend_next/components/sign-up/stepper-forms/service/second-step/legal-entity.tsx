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
import { Separator } from "@frontend_next/components/ui/separator";

import { useStepper } from "@frontend_next/components/stepper/use-stepper";
import { Button } from "@frontend_next/components/ui/button";

export const LegalEntitySecondStep = () => {
  const { nextStep, prevStep } = useStepper();
  const form = useForm<{
    first_name: string;
    last_name: string;
    sur_name: string;
    job_title: string;
    email: string;
    phone: string;
    extra_first_name: string;
    extra_last_name: string;
    extra_sur_name: string;
    extra_job_title: string;
    extra_email: string;
    extra_phone: string;
  }>({
    defaultValues: {
      first_name: "",
      last_name: "",
      sur_name: "",
      job_title: "",
      phone: "",
      email: "",
      extra_first_name: "",
      extra_last_name: "",
      extra_sur_name: "",
      extra_job_title: "",
      extra_email: "",
      extra_phone: "",
    },
  });

  const onSubmit = (data: {
    first_name: string;
    last_name: string;
    sur_name: string;
    phone: string;
    email: string;
    extra_first_name: string;
    extra_last_name: string;
    extra_sur_name: string;
    extra_job_title: string;
    extra_email: string;
    extra_phone: string;
  }) => {
    console.log("data", data);
    nextStep();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="my-4">
        <h1 className="text-xl font-bold">Данные контактного лица</h1>
        <p className="text-sm text-gray-500">
          Введите данные контактного лица для сотрудничество
        </p>
        <Separator className="my-4 bg-gray-300" />
        <div className="grid grid-cols-3 gap-4">
          <FormField
            control={form.control}
            name="last_name"
            rules={{ required: "Поле обязательно для заполнения" }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Фамилия</FormLabel>
                <FormControl>
                  <Input placeholder="Введите фамилию..." {...field} />
                </FormControl>
                <FormMessage className="text-xs text-red-600" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="first_name"
            rules={{ required: "Поле обязательно для заполнения" }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Имя</FormLabel>
                <FormControl>
                  <Input placeholder="Введите имя..." {...field} />
                </FormControl>
                <FormMessage className="text-xs text-red-600" />
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
                  <Input placeholder="Введите отчество..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="job_title"
            rules={{ required: "Поле обязательно для заполнения" }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Должность</FormLabel>
                <FormControl>
                  <Input placeholder="Введите должность..." {...field} />
                </FormControl>
                <FormMessage className="text-xs text-red-600" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            rules={{ required: "Поле обязательно для заполнения" }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Контактный номер</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Введите номер телефона..."
                    {...field}
                    type="phone"
                  />
                </FormControl>
                <FormMessage className="text-xs text-red-600" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            rules={{
              required: "Поле обязательно для заполнения",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Неверный формат",
              },
            }}
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
                <FormMessage className="text-xs text-red-600" />
              </FormItem>
            )}
          />
        </div>

        <h1 className="text-xl font-bold pt-10">
          Данные дополнительного контактного лица
        </h1>
        <p className="text-sm text-gray-500">
          Введите данные дополнительного контактного лица для сотрудничество
        </p>
        <Separator className="my-4 bg-gray-300" />
        <div className="grid grid-cols-3 gap-4">
          <FormField
            control={form.control}
            name="extra_last_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Фамилия</FormLabel>
                <FormControl>
                  <Input placeholder="Введите фамилию..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="extra_first_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Имя</FormLabel>
                <FormControl>
                  <Input placeholder="Введите имя..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="extra_sur_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Отчество</FormLabel>
                <FormControl>
                  <Input placeholder="Введите отчество..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="extra_job_title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Должность</FormLabel>
                <FormControl>
                  <Input placeholder="Введите должность..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="extra_phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Контактный номер</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Введите номер телефона..."
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
            name="extra_email"
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
        <div className="w-full flex justify-between mt-6 gap-2">
          <Button onClick={prevStep} size="sm" variant="secondary">
            Предыдущий шаг
          </Button>
          <Button type="submit" size="sm">
            Следующий шаг
          </Button>
        </div>
      </form>
    </Form>
  );
};
