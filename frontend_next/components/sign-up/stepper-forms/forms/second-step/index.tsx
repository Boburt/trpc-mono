"use client";

import { signUpWizardStore } from "@frontend_next/store/zustand/roleStore";
import { SoleProprietorshipSecondStep } from "./sole-proprietorship";
import { LegalEntitySecondStep } from "./legal-entity";
import { Button } from "@frontend_next/components/ui/button";
import { Label } from "@radix-ui/react-label";

const orgTypes = [
  { label: "Индивидуальный предприниматель", value: "sole-proprietorship" },
  { label: "Юридическое лицо", value: "legal-entity" },
  { label: "Физическое лицо", value: "individual" },
];

export const SecondStep = () => {
  const role = signUpWizardStore((state) => state.role);
  const orgType = signUpWizardStore((state) => state.orgType);
  const setOrgType = signUpWizardStore((state) => state.setOrgType);
  const filteredOrgTypes =
    role.value === "manufacturer" || role.value === "customer"
      ? orgTypes.filter(
          (type) =>
            type.value === "sole-proprietorship" ||
            type.value === "legal-entity"
        )
      : orgTypes;

  return (
    <div className="flex flex-col px-4">
      <div className="grid grid-cols-1  justify-start items-center pt-6">
        <Label className="text-xl font-bold mb-1">
          Выберите тип организации
        </Label>
        <div
          className={`grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-0 ${
            filteredOrgTypes.length > 2 ? "md:grid-cols-3" : ""
          }`}
        >
          {filteredOrgTypes.map((type, index) => (
            <Button
              key={type.value + index}
              onClick={() =>
                setOrgType({
                  value: type.value,
                  label: type.label,
                })
              }
              className={`rounded-lg md:rounded-none border w-full bg-white text-gray-700 hover:bg-blue-50 ${
                orgType.value === type.value ? "bg-blue-100/70" : ""
              } ${index === 0 ? "md:rounded-none md:rounded-l-lg" : ""} ${
                index === filteredOrgTypes.length - 1
                  ? "md:rounded-none md:rounded-r-lg"
                  : ""
              } `}
            >
              <Label
                htmlFor="option-one"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 py-1"
              >
                {type.label}
              </Label>
            </Button>
          ))}
        </div>
      </div>

      {orgType.value === "legal-entity" ? (
        <LegalEntitySecondStep />
      ) : (
        <SoleProprietorshipSecondStep />
      )}
    </div>
  );
};
