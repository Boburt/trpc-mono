"use client";

import { Users, Factory, FileSliders } from "lucide-react";
import { roleStore } from "@frontend_next/store/zustand/roleStore";
import { cn } from "@frontend_next/lib/utils";
import { useStepper } from "../use-stepper";
import { toast } from "sonner";
import { Button } from "@frontend_next/components/ui/button";

export const SignupWizardFirstStep: React.FC = () => {
  const role = roleStore((state) => state.role);
  const setRole = roleStore((state) => ({ setRole: state.setRole }));

  console.log("role", role);

  return (
    <div className="flex flex-col p-8 items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold">Выберите Вашу роль</h1>
        <div className="space-x-16 pt-10 flex">
          <button
            onClick={() => setRole.setRole("customer")}
            className={cn(
              "btn btn-primary select flex items-center flex-col rounded-md p-6 shadow-medium hover:shadow-lg  hover:border-gray-300  dark:hover:border-primary-300 border-1 w-56",
              { "border-primary-300": role == "customer" }
            )}
          >
            <Users className=" h-12 w-12" /> Заказчик
          </button>
          <button
            onClick={() => setRole.setRole("manufacturer")}
            className={cn(
              "btn btn-primary select flex items-center flex-col rounded-md p-6 shadow-medium hover:shadow-lg  hover:border-gray-300  dark:hover:border-primary-300 border-1 w-56",
              { "border-primary-300": role == "manufacturer" }
            )}
          >
            <Factory className="h-12 w-12" /> Производитель
          </button>
          <button
            onClick={() => {
              setRole.setRole("service");
            }}
            className={cn(
              "btn btn-primary select flex items-center flex-col rounded-md p-6 shadow-medium hover:shadow-lg  hover:border-gray-300  dark:hover:border-primary-300 border-1 w-56",
              { "border-primary-300": role == "service" }
            )}
          >
            <FileSliders className="h-12 w-12" /> Оказание услуг
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

const Footer = () => {
  const { nextStep } = useStepper();
  const role = roleStore((state) => state.role);

  const gotoNext = () => {
    if (role.length == 0) {
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
