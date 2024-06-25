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
import {
  RadioGroup,
  RadioGroupItem,
} from "@frontend_next/components/ui/radio-group";
import { Button } from "@frontend_next/components/ui/button";
import { useStepper } from "@frontend_next/components/stepper/use-stepper";

export const SoleProprietorshipFourthStep = () => {
  const { nextStep, prevStep } = useStepper();
  const form = useForm<{
    org_full_name: string;
    org_short_name: string;
    legal_address: string;
    fact_address: string;
    email: string;
    web_site: string;
    vat: boolean;
    file: File | null;
  }>({
    defaultValues: {
      org_full_name: "",
      org_short_name: "",
      legal_address: "",
      fact_address: "",
      email: "",
      web_site: "",
      vat: undefined,
      file: null,
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
    file: File | null;
  }) => {
    console.log("data", data);
    nextStep();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="">
        <h1 className="text-2xl font-bold">Форма производителя</h1>
        <Separator className="my-4" />
        <h1 className="text-xl font-bold">Название</h1>
        <Separator className="my-2 bg-gray-300" />
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="org_full_name"
            rules={{ required: "Поле обязательно для заполнения" }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Полное название</FormLabel>
                <FormControl>
                  <Input placeholder="Введите название..." {...field} />
                </FormControl>
                <FormMessage className="text-xs text-red-600" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="org_short_name"
            rules={{ required: "Поле обязательно для заполнения" }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Короткое название</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Введите короткое название..."
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-xs text-red-600" />
              </FormItem>
            )}
          />
        </div>

        <h1 className="text-xl font-bold mt-8">Адрес</h1>
        <Separator className="my-2 bg-gray-300" />
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="legal_address"
            rules={{ required: "Поле обязательно для заполнения" }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Юридический адрес</FormLabel>
                <FormControl>
                  <Input placeholder="Введите адрес..." {...field} />
                </FormControl>
                <FormMessage className="text-xs text-red-600" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="fact_address"
            rules={{ required: "Поле обязательно для заполнения" }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Фактический адрес</FormLabel>
                <FormControl>
                  <Input placeholder="Введите адрес..." {...field} />
                </FormControl>
                <FormMessage className="text-xs text-red-600" />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-2 gap-4 mt-4">
          <FormField
            control={form.control}
            name="email"
            rules={{ required: "Поле обязательно для заполнения" }}
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
        <Separator className="mt-4 bg-gray-300" />
        <div className="grid grid-cols-2 gap-4 mt-4">
          <FormField
            control={form.control}
            name="file"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Прикипите лицензию/сертификат</FormLabel>
                <FormControl>
                  <Input placeholder="Прикипите файл" type="file" />
                </FormControl>
                <FormMessage className="text-xs text-red-600" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="vat"
            rules={{ required: "Поле обязательно для заполнения" }}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="">Являетесь плательщиком НДС?</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    className="flex space-x-6 space-y-0 border rounded-md py-2.5"
                  >
                    <FormItem className="flex items-center ml-4 space-x-1 space-y-0">
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
                <FormMessage className="text-xs text-red-600" />
              </FormItem>
            )}
          />
        </div>

        <div className="w-full flex justify-between mt-6 gap-2">
          <Button onClick={prevStep} size="sm" variant="secondary">
            Предыдущий шаг
          </Button>
          <Button type="submit" size="sm">
            Завершить
          </Button>
        </div>
      </form>
    </Form>
  );
};
