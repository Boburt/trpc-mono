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
import { signUpWizardStore } from "@frontend_next/store/zustand/roleStore";

export const IndividualFourthStep = () => {
  const orgType = signUpWizardStore((state) => state.orgType);
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
      <form onSubmit={form.handleSubmit(onSubmit)} className="m-4">
        <h1 className="text-2xl font-bold">{orgType.label}</h1>

        <h1 className="text-xl font-bold mt-8">Адрес</h1>
        <Separator className="my-2 bg-gray-300" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <FormField
            control={form.control}
            name="legal_address"
            rules={{ required: "Поле обязательно для заполнения" }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Адрес прописки</FormLabel>
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
