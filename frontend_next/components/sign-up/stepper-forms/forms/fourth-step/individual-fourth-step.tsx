"use client";
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
import { Button } from "@frontend_next/components/ui/button";
import { useStepper } from "@frontend_next/components/stepper/use-stepper";
import { signUpWizardStore } from "@frontend_next/store/zustand/roleStore";
import { useSession } from "next-auth/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCallback, useMemo, useState } from "react";
import { apiClient } from "@frontend_next/lib/eden";
import { toast } from "sonner";
import { FinishAlert } from "./finish-alert";
import { useRouter } from "next/navigation";

export const IndividualFourthStep = () => {
  const orgType = signUpWizardStore((state) => state.orgType);
  const { nextStep, prevStep } = useStepper();
  const { data: session } = useSession();
  const queryClient = useQueryClient();
  const profileData: any = queryClient.getQueryData(["profile_data"]);
  const [showFinishAlert, setShowFinishAlert] = useState(false);
  const router = useRouter();

  const values = useMemo(() => {
    if (
      profileData &&
      profileData.data &&
      profileData.data.membership_data &&
      "id" in profileData.data.membership_data
    ) {
      return profileData.data.membership_data;
    }
  }, [profileData]);

  const form = useForm<{
    address: string;
    fact_address: string;
    email: string;
  }>({
    defaultValues: {
      address: "",
      fact_address: "",
      email: "",
    },
    values,
  });

  const onSubmit = (data: {
    address: string;
    fact_address: string;
    email: string;
  }) => {
    updateMutation.mutate(data);
  };

  const updateMutation = useMutation({
    mutationFn: (updateMembership: {
      address: string;
      fact_address: string;
      email: string;
    }) => {
      return apiClient.api
        .memberships({ id: profileData.data.membership_data.id })
        .put(
          {
            data: {
              ...updateMembership,
              active: true,
            },
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

        toast.success("Регистрация успешно завершена");
        setShowFinishAlert(true);
        // nextStep();
      } else {
        toast.error("Роль не обновлена");
      }
    },
  });

  const handleFinish = () => {
    router.push("/profile"); // Adjust this path as needed
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
            name="address"
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
        <FinishAlert isOpen={showFinishAlert} onFinish={handleFinish} />
      </form>
    </Form>
  );
};
