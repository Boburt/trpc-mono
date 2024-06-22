"use client";

import { Users, Factory, FileSliders } from "lucide-react";
import { roleStore } from "@frontend_next/store/zustand/roleStore";

export const SignupWizardFirstStep: React.FC = () => {
  const role = roleStore((state) => ({ role: state.role }));
  const setRole = roleStore((state) => ({ setRole: state.setRole }));

  console.log("role", role);

  return (
    <div className="flex flex-col p-8 items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold">Выберите Вашу роль</h1>
        <div className="space-x-16 pt-10 flex">
          <button
            onClick={() => setRole.setRole("customer")}
            className="btn btn-primary select flex items-center flex-col rounded-md p-6 shadow-medium hover:shadow-lg  hover:border-gray-300  dark:hover:border-gray-300 border-3 w-56"
          >
            <Users className=" h-12 w-12" /> Заказчик
          </button>
          <button
            onClick={() => setRole.setRole("manufacturer")}
            className="btn btn-primary flex items-center flex-col rounded-md p-6 shadow-medium hover:shadow-lg  hover:border-gray-300  dark:hover:border-gray-300 border-3 w-56"
          >
            <Factory className="h-12 w-12" /> Производитель
          </button>
          <button
            onClick={() => {
              setRole.setRole("service");
            }}
            className="btn btn-primary flex items-center flex-col rounded-md p-6 shadow-medium hover:shadow-lg  hover:border-gray-300  dark:hover:border-gray-300 border-3 w-56"
          >
            <FileSliders className="h-12 w-12" /> Оказание услуг
          </button>
        </div>
      </div>
    </div>
  );
};
