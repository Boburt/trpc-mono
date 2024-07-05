"use client";

import {
  Users,
  Factory,
  FileSliders,
  Truck,
  Scale,
  SlidersHorizontal,
} from "lucide-react";
import { signUpWizardStore } from "@frontend_next/store/zustand/roleStore";
import { cn } from "@frontend_next/lib/utils";
import { useStepper } from "../use-stepper";
import { toast } from "sonner";
import { Button } from "@frontend_next/components/ui/button";
import { useSession } from "next-auth/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferInsertModel } from "drizzle-orm";
import { memberships } from "backend/drizzle/schema";
import { apiClient } from "@frontend_next/lib/eden";
import { useEffect } from "react";
import next from "next";

const roles = [
  {
    label: "Заказчик",
    value: "customer",
    icon: Users,
  },
  {
    label: "Производитель",
    value: "manufacturer",
    icon: Factory,
  },
  {
    label: "Логистика",
    value: "logistics",
    icon: Truck,
  },
  {
    label: "Юрист",
    value: "lawyer",
    icon: Scale,
  },
  {
    label: "Контролер",
    value: "controller",
    icon: SlidersHorizontal,
  },
];

export const SignupWizardFirstStep: React.FC = () => {
  const { data: session } = useSession();
  const { nextStep } = useStepper();
  const role = signUpWizardStore((state) => state.role);
  const setRole = signUpWizardStore((state) => ({ setRole: state.setRole }));
  const setMembershipId = signUpWizardStore((state) => state.setMembershipId);

  const queryClient = useQueryClient();

  const profileData: any = queryClient.getQueryData(["profile_data"]);

  useEffect(() => {
    if (
      profileData &&
      profileData.data &&
      profileData.data.membership_data &&
      "id" in profileData.data.membership_data
    ) {
      setMembershipId(profileData.data.membership_data.id);
      setRole.setRole({
        value: profileData.data.membership_data.type.toString(),
        label: roles.find(
          (role) => role.value === profileData.data.membership_data.type
        )?.label!,
      });
    }
  }, [profileData]);

  const gotoNext = () => {
    if (role.value.length == 0) {
      return toast.error("Выберите роль");
    } else {
      checkBeforeMutation();
    }
  };

  const checkBeforeMutation = () => {
    console.log("checkBeforeMutation in to");
    if (profileData && profileData.data && profileData.data.membership_data) {
      if (
        profileData.data.membership_data &&
        "id" in profileData.data.membership_data &&
        profileData.data.membership_data.type === role.value
      ) {
        nextStep();
      } else if (
        profileData.data.membership_data &&
        "id" in profileData.data.membership_data &&
        profileData.data.membership_data.type !== role.value
      ) {
        updateMutation.mutate({
          type: role.value,
          id: profileData.data.membership_data.id,
        });
      }
    } else {
      console.log("createMutation");
      createMutation.mutate({
        type: role.value,
      });
    }
  };

  const updateMutation = useMutation({
    mutationFn: (updateMembership: InferInsertModel<typeof memberships>) => {
      return apiClient.api.memberships({ id: updateMembership.id! }).put(
        {
          data: {
            type: updateMembership.type,
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
        setMembershipId(data.data.id);
        toast.success("Роль успешно обновлена");
        nextStep();
      } else {
        toast.error("Роль не обновлена");
      }
    },
  });

  const createMutation = useMutation({
    mutationFn: (newMembership: InferInsertModel<typeof memberships>) => {
      return apiClient.api.memberships.post(
        {
          data: {
            type: newMembership.type,
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
        setMembershipId(data.data.id);
        toast.success("Роль успешно присвоена");
        nextStep();
      } else {
        toast.error("Роль не присвоена");
      }
    },
  });

  return (
    <div className="p-8">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold text-center">Выберите Вашу роль</h1>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {roles.map((role) => (
            <button
              onClick={() =>
                setRole.setRole({
                  value: role.value,
                  label: role.label,
                })
              }
              key={role.value}
              className={cn(
                "btn btn-primary select flex mx-auto items-center flex-col rounded-md p-6 shadow-medium hover:shadow-lg  hover:border-gray-300  dark:hover:border-primary-300 border-1 w-full",
                {
                  "bg-blue-100/70":
                    role.value ===
                    signUpWizardStore((state) => state.role.value),
                }
              )}
            >
              <role.icon className=" h-12 w-12" /> {role.label}
            </button>
          ))}
        </div>
      </div>
      <div className="w-full flex justify-end mt-6">
        <Button size="sm" onClick={gotoNext}>
          Следующий шаг
        </Button>
      </div>
    </div>
  );
};
