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
import { signUpWizardStore } from "@frontend_next/store/zustand/roleStore";
import { useStepper } from "@frontend_next/components/stepper/use-stepper";
import { Button } from "@frontend_next/components/ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useMemo } from "react";
import { apiClient } from "@frontend_next/lib/eden";
import { toast } from "sonner";

export const SoleProprietorshipSecondStep = () => {
  const queryClient = useQueryClient();
  const { data: session } = useSession();
  const { nextStep, prevStep } = useStepper();
  const membership_id: string = signUpWizardStore(
    (state) => state.membershipId
  );
  const orgType: {
    value: string;
    label: string;
  } = signUpWizardStore((state) => state.orgType);

  const profileData: any = queryClient.getQueryData(["profile_data"]);

  const values = useMemo(() => {
    if (
      profileData &&
      profileData.data &&
      profileData.data.profile_data &&
      "email" in profileData.data.profile_data
    ) {
      return profileData.data.profile_data;
    }
  }, [profileData]);

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
    values,
  });

  const createMutation = useMutation({
    mutationFn: async ({
      newProfile,
      token,
      reference_id,
      org_type,
    }: {
      newProfile: Record<string, any>;
      token: string;
      reference_id: string;
      org_type: string;
    }) => {
      return await apiClient.api.profiles.post(
        {
          data: newProfile,
          reference_id,
          org_type,
          fields: ["id"],
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    },
    onSuccess: (data) => {
      if (data.data && "id" in data.data) {
        queryClient.invalidateQueries({ queryKey: ["profile_data"] });
        toast.success("Профиль успешно создан");
        nextStep();
      } else {
        toast.error("Профиль не создан");
      }
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({
      updateProfile,
      token,
      reference_id,
      org_type,
    }: {
      updateProfile: Record<string, any>;
      token: string;
      reference_id: string;
      org_type: string;
    }) => {
      return await apiClient.api.profiles.put(
        {
          data: updateProfile,
          reference_id,
          org_type,
          fields: ["id"],
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    },
    onSuccess: (data) => {
      if (data.data && "id" in data.data) {
        queryClient.invalidateQueries({ queryKey: ["profile_data"] });
        toast.success("Профиль успешно обновлен");
        nextStep();
      } else {
        toast.error("Профиль не обновлен");
      }
    },
  });

  const onSubmit = (data: {
    first_name: string;
    last_name: string;
    sur_name: string;
    phone: string;
    email: string;
  }) => {
    checkBeforeMutation(data);
  };

  const checkBeforeMutation = (data: {
    first_name: string;
    last_name: string;
    sur_name: string;
    phone: string;
    email: string;
  }) => {
    if (
      profileData.data.membership_data &&
      "id" in profileData.data.membership_data &&
      profileData.data.profile_data &&
      "email" in profileData.data.profile_data
    ) {
      updateMutation.mutate({
        updateProfile: data,
        token: session?.accessToken!,
        reference_id: membership_id,
        org_type: orgType.value,
      });
    } else {
      createMutation.mutate({
        newProfile: data,
        token: session?.accessToken!,
        reference_id: membership_id,
        org_type: orgType.value,
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="my-6">
        <h1 className="text-xl font-bold">Контактные данные</h1>
        <p className="text-sm text-gray-500">
          Введите Контактные данные для сотрудничество
        </p>
        <Separator className="my-4 bg-gray-300" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
                <FormMessage className="text-xs text-red-600" />
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
                  <Input placeholder="Введите Ваше отчество..." {...field} />
                </FormControl>
                <FormMessage className="text-xs text-red-600" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            rules={{
              required: "Поле обязательно для заполнения",
            }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Контактный номер телефона</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Введите контактный номер телефона..."
                    {...field}
                    type="tel"
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
