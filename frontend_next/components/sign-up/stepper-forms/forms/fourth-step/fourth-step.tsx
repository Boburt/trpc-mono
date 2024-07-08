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
import { useSession } from "next-auth/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { apiClient } from "@frontend_next/lib/eden";
import { InferInsertModel } from "drizzle-orm";
import { memberships } from "backend/drizzle/schema";
import { toast } from "sonner";
import { FinishAlert } from "./finish-alert";
import { useRouter } from "next/navigation";

export const FourthStep = () => {
  const orgType = signUpWizardStore((state) => state.orgType);
  const { nextStep, prevStep } = useStepper();
  const { data: session } = useSession();
  const queryClient = useQueryClient();
  const profileData: any = queryClient.getQueryData(["profile_data"]);
  const [showFinishAlert, setShowFinishAlert] = useState(false);
  const values = useMemo(() => {
    if (
      profileData &&
      profileData.data &&
      profileData.data.membership_data &&
      "id" in profileData.data.membership_data
    ) {
      return {
        ...profileData.data.membership_data,
        vat: profileData.data.membership_data.vat.toString(),
      };
    }
  }, [profileData]);
  const router = useRouter();

  const form = useForm<{
    name: string;
    short_name: string;
    address: string;
    fact_address: string;
    email: string;
    web_site: string;
    vat: string;
  }>({
    defaultValues: {
      name: "",
      short_name: "",
      address: "",
      fact_address: "",
      email: "",
      web_site: "",
      vat: "",
    },
    values,
  });

  const onSubmit = (data: {
    name: string;
    short_name: string;
    address: string;
    fact_address: string;
    email: string;
    web_site: string;
    vat: string;
  }) => {
    updateMutation.mutate({
      name: data.name,
      short_name: data.short_name,
      address: data.address,
      fact_address: data.fact_address,
      email: data.email,
      web_site: data.web_site,
      vat: data.vat === "true" ? true : false,
      active: true,
    });
  };

  const updateMutation = useMutation({
    mutationFn: (updateMembership: {
      name: string;
      short_name: string;
      address: string;
      fact_address: string;
      email: string;
      web_site: string;
      vat: boolean;
      active: boolean;
    }) => {
      return apiClient.api
        .memberships({ id: profileData.data.membership_data.id })
        .put(
          {
            data: updateMembership,
            fields: ["id"],
          },
          {
            headers: {
              Authorization: `Bearer ${session?.accessToken!}`,
            },
          }
        );
    },
    onSuccess: (data) => {
      if (data.data && "id" in data.data) {
        queryClient.invalidateQueries({ queryKey: ["profile_data"] });
        toast.success("Роль успешно обновлена");
        setShowFinishAlert(true);
      } else {
        toast.error("Роль не обновлена");
      }
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="m-4">
        <h1 className="text-2xl font-bold">{orgType.label}</h1>
        <Separator className="my-4" />
        <h1 className="text-xl font-bold">Название</h1>
        <Separator className="my-2 bg-gray-300" />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <FormField
            control={form.control}
            name="name"
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
            name="short_name"
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="address"
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
            name="vat"
            rules={{ required: "Поле обязательно для заполнения" }}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="">Являетесь плательщиком НДС?</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    className="flex space-x-6 space-y-0 border rounded-md py-2.5"
                    value={field.value}
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
        <FinishAlert
          isOpen={showFinishAlert}
          onFinish={() => router.push("/profile")}
        />
      </form>
    </Form>
  );
};
