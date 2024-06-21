"use client";

import { Button } from "@frontend_next/components/ui/button";
import { Input } from "@frontend_next/components/ui/input";
import { Label } from "@frontend_next/components/ui/label";
import {
  RadioGroup,
  RadioGroupItem,
} from "@frontend_next/components/ui/radio-group";
import { roleStore } from "@frontend_next/store/zustand/roleStore";
import { SoleProprietorshipSecondStep } from "./sole-proprietorship";
import { LegalEntitySecondStep } from "./legal-entity";
import { use, useState } from "react";
import { set } from "react-hook-form";
import { Checkbox } from "@frontend_next/components/ui/checkbox";

export const CustomerSecondStep = () => {
  const [orgType, setOrgType] = useState<string>("sole-proprietorship");
  return (
    <div className="flex flex-col px-4">
      <div className="flex justify-start items-center gap-4 pt-6">
        {/* <RadioGroup
          defaultValue="sole-proprietorship"
          onValueChange={(value) => setOrgType(value)}
          className="flex space-x-4 py-2"
        >
          <div className="flex items-center space-x-2 border border-gray-700 rounded-md p-2">
            <RadioGroupItem value="sole-proprietorship" id="option-one" />
            <Label htmlFor="sole-proprietorship">
              Индивидуальный предприниматель
            </Label>
          </div>
          <div className="flex items-center space-x-2 border border-gray-700 rounded-md p-2">
            <RadioGroupItem value="legal-entity" id="option-two" />
            <Label htmlFor="legal-entity">Юридическое лицо</Label>
          </div>
        </RadioGroup> */}
        <div
          onClick={() => setOrgType("sole-proprietorship")}
          className={`flex items-center space-x-2 border border-gray-700 rounded-md p-2 w-80 h-12 cursor-pointer ${
            orgType === "sole-proprietorship" ? "bg-blue-100" : ""
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
            orgType === "legal-entity" ? "bg-blue-100" : ""
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
