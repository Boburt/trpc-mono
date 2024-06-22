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
import { roleStore } from "@frontend_next/store/zustand/roleStore";
import { useStepper } from "@frontend_next/components/stepper/use-stepper";
import { toast } from "sonner";
import { Button } from "@frontend_next/components/ui/button";

export const SoleProprietorshipSecondStep = () => {
  const role = roleStore((state) => state.role);
  const orgType = roleStore((state) => state.orgType);
  const { nextStep, prevStep } = useStepper();
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
    const dataForMutation = {
      ...data,
      role: role,
      org_type: orgType,
    };
    console.log("dataForMutation", dataForMutation);
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
            rules={{
              required: "Поле обязательно для заполнения",
              minLength: { value: 3, message: "Минимум 3 символов" },
            }}
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
            rules={{
              required: "Поле обязательно для заполнения",
              minLength: { value: 3, message: "Минимум 3 символов" },
            }}
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
            rules={{
              required: "Поле обязательно для заполнения",
              minLength: { value: 12, message: "Минимум 12 символов" },
            }}
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
