"use client";

import { roleStore } from "@frontend_next/store/zustand/roleStore";
import { SoleProprietorshipSecondStep } from "./sole-proprietorship";
import { LegalEntitySecondStep } from "./legal-entity";

export const CustomerSecondStep = () => {
  // const [orgType, setOrgType] = useState<string>("sole-proprietorship");
  const orgType: string = roleStore((state) => state.orgType);
  const setOrgType = roleStore((state) => state.setOrgType);
  return (
    <div className="flex flex-col px-4">
      <div className="flex justify-start items-center gap-4 pt-6">
        <div
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
        </div>
      </div>
      {orgType === "sole-proprietorship" ? (
        <SoleProprietorshipSecondStep />
      ) : (
        <LegalEntitySecondStep />
      )}
    </div>
  );
};
