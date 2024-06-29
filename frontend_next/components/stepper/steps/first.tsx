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
  const role = signUpWizardStore((state) => state.role);
  const setRole = signUpWizardStore((state) => ({ setRole: state.setRole }));

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
                  "border-primary-300":
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
      <Footer />
    </div>
  );
};

const Footer = () => {
  const { nextStep } = useStepper();
  const role = signUpWizardStore((state) => state.role);

  const gotoNext = () => {
    if (role.value.length == 0) {
      return toast.error("Выберите роль");
    } else {
      nextStep();
    }
  };

  return (
    <div className="w-full flex justify-end mt-6">
      <Button size="sm" onClick={gotoNext}>
        Следующий шаг
      </Button>
    </div>
  );
};
