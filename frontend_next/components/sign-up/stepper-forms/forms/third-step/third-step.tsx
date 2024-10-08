"use client";
import * as React from "react";
import { signUpWizardStore } from "@frontend_next/store/zustand/roleStore";
import { useMemo, useState } from "react";
import { CountryDropdown } from "@frontend_next/components/country-select/country-select";
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
import { useStepper } from "@frontend_next/components/stepper/use-stepper";
import { Button } from "@frontend_next/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@frontend_next/components/ui/popover";
import { cn } from "@frontend_next/lib/utils";
import { Check, ChevronsUpDown } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@frontend_next/components/ui/command";

import countryList from "@frontend_next/components/country-select/data/countries.json";
import { Separator } from "@frontend_next/components/ui/separator";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@frontend_next/lib/eden";
import { InferInsertModel } from "drizzle-orm";
import { memberships } from "backend/drizzle/schema";
import { useSession } from "next-auth/react";
import { toast } from "sonner";

export const ThirdStep = () => {
  const { nextStep, prevStep } = useStepper();
  const { data: session } = useSession();
  const queryClient = useQueryClient();
  const orgType = signUpWizardStore((state) => state.orgType);
  const [open, setOpen] = React.useState(false);
  const membership_id: string = signUpWizardStore(
    (state) => state.membershipId
  );
  const profileData: any = queryClient.getQueryData(["profile_data"]);

  const values = useMemo(() => {
    if (
      profileData &&
      profileData.data &&
      profileData.data.membership_data &&
      "country" in profileData.data.membership_data &&
      "ein" in profileData.data.membership_data
    ) {
      return {
        country: profileData.data.membership_data.country,
        ein: profileData.data.membership_data.ein,
      };
    }
  }, [profileData]);

  const form = useForm<{
    country: string;
    ein: number;
  }>({
    defaultValues: {
      country: "",
      ein: undefined,
    },
    values,
  });

  const updateMutation = useMutation({
    mutationFn: (updateMembership: {
      id: string;
      country: string;
      ein: number;
    }) => {
      return apiClient.api.memberships({ id: updateMembership.id! }).put(
        {
          data: {
            country: updateMembership.country!,
            ein: updateMembership.ein!,
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
        toast.success("Роль успешно обновлена");
        nextStep();
      } else {
        toast.error("Роль не обновлена");
      }
    },
  });

  const onSubmit = (data: { country: string; ein: number }) => {
    if (
      profileData.data.membership_data &&
      "id" in profileData.data.membership_data &&
      profileData.data.membership_data.country === data.country &&
      profileData.data.membership_data.ein === data.ein
    ) {
      nextStep();
    } else {
      updateMutation.mutate({
        id: profileData.data.membership_data.id,
        country: data.country,
        ein: data.ein,
      });
    }
  };
  return (
    <Form {...form}>
      <h1 className="text-2xl font-bold pt-6 px-6 justify-center">
        {orgType.label}
      </h1>
      <Separator className="my-4 bg-gray-300 mx-4" />
      <h1 className="text-xl font-bold pt-6 px-6 justify-center">
        Информация о предпринимательстве
      </h1>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 p-6 flex flex-col items-center"
      >
        <FormField
          control={form.control}
          name="country"
          rules={{ required: "Поле обязательно для заполнения" }}
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Страна регистрации</FormLabel>
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "min-w-96 justify-between",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value
                        ? countryList &&
                          countryList.find(
                            (country) => country.name === field.value
                          )?.name
                        : "Выберите страну"}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="min-w-[300px] p-0 bg-white">
                  <Command>
                    <CommandInput placeholder="Поиск страны..." />
                    <CommandEmpty>Не найдено</CommandEmpty>
                    <CommandGroup>
                      <CommandList>
                        {countryList &&
                          countryList.map((country) => (
                            <CommandItem
                              value={country.name}
                              key={country.id}
                              onSelect={() => {
                                form.setValue("country", country.name);
                                setOpen(false);
                              }}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  country.name === field.value
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                              {country.name}
                            </CommandItem>
                          ))}
                      </CommandList>
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormDescription />
              <FormMessage className="text-xs text-red-600" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="ein"
          rules={{ required: "Поле обязательно для заполнения" }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>ИНН организации</FormLabel>
              <FormControl>
                <Input
                  placeholder="Введите ИНН..."
                  {...field}
                  className="w-96"
                />
              </FormControl>
              <FormDescription />
              <FormMessage className="text-xs text-red-600" />
            </FormItem>
          )}
        />
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
