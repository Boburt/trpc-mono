"use client";

import { roleStore } from "@frontend_next/store/zustand/roleStore";
import { SoleProprietorshipSecondStep } from "./sole-proprietorship";
import { LegalEntitySecondStep } from "./legal-entity";
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@frontend_next/components/ui/toggle-group";
import { Button } from "@frontend_next/components/ui/button";
import { Label } from "@radix-ui/react-label";

export const ServiceSecondStep = () => {
  // const [orgType, setOrgType] = useState<string>("sole-proprietorship");
  const orgType: string = roleStore((state) => state.orgType);
  const setOrgType = roleStore((state) => state.setOrgType);
  const service_type: string = roleStore((state) => state.service_type);
  const setService_type = roleStore((state) => state.setService_type);
  return (
    <div className="flex flex-col px-4">
      <h1 className="text-2xl font-bold mt-2">Форма для оказывающих услуг</h1>
      <div className="grid grid-cols-1  justify-start items-center pt-6">
        <Label className="text-sm mb-1">Выберите тип организации</Label>
        <div className="flex">
          <Button
            onClick={() => setOrgType("sole-proprietorship")}
            className={`rounded-none border w-full rounded-l-lg bg-white text-gray-700 hover:bg-blue-50 ${
              orgType === "sole-proprietorship" ? "bg-blue-100/70" : ""
            } `}
          >
            Индивидуальный предприниматель
          </Button>
          <Button
            onClick={() => setOrgType("legal-entity")}
            className={`rounded-none border w-full rounded-r-lg  bg-white text-gray-700 hover:bg-blue-50 ${
              orgType === "legal-entity" ? "bg-blue-100/70" : ""
            } `}
          >
            Юридическое лицо
          </Button>
        </div>
        <Label className="text-sm mb-1 mt-4">Выберите тип услугу</Label>
        <div className="flex">
          <Button
            onClick={() => setService_type("logistics")}
            className={`rounded-none border w-full rounded-l-lg bg-white text-gray-700 hover:bg-blue-50 ${
              service_type === "logistics" ? "bg-blue-100/70" : ""
            } `}
          >
            Логистика
          </Button>
          <Button
            onClick={() => setService_type("lawyer")}
            className={`rounded-none border w-full  bg-white text-gray-700 hover:bg-blue-50 ${
              service_type === "lawyer" ? "bg-blue-100/70" : ""
            } `}
          >
            Юрист
          </Button>
          <Button
            onClick={() => setService_type("controller")}
            className={`rounded-none border w-full rounded-r-lg bg-white text-gray-700 hover:bg-blue-50 ${
              service_type === "controller" ? "bg-blue-100/70" : ""
            } `}
          >
            Контроллер
          </Button>
        </div>
      </div>

      <div className="flex justify-start items-center gap-4 pt-6">
        {/* <div
          onClick={() => setOrgType("sole-proprietorship")}
          className={`flex items-center space-x-2 border border-gray-700 rounded-md p-2 w-80 h-12 cursor-pointer ${
            orgType === "sole-proprietorship" ? "bg-primary-200" : ""
          }`}
        >
          <label
            htmlFor="option-one"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 py-1"
          >
            Индивидуальный предприниматель
          </label>
        </div>
        <div
          onClick={() => setOrgType("legal-entity")}
          className={`flex items-center space-x-2 border border-gray-700 rounded-md p-2 w-80 h-12 ${
            orgType === "legal-entity" ? "bg-primary-200" : ""
          }`}
        >
          <label
            htmlFor="option-two"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 py-1 cursor-pointer"
          >
            Юридическое лицо
          </label>
        </div> */}
      </div>
      {orgType === "sole-proprietorship" ? (
        <SoleProprietorshipSecondStep />
      ) : (
        <LegalEntitySecondStep />
      )}
    </div>
  );
};
