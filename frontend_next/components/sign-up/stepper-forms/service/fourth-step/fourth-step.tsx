"use client";
import * as React from "react";
import { roleStore } from "@frontend_next/store/zustand/roleStore";
import { useState } from "react";
import { CountryDropdown } from "@frontend_next/components/country-select/country-select";
import { Input } from "@frontend_next/components/ui/input";
import { MultiSelect } from "@frontend_next/components/multi-select/multi-select";
import { SoleProprietorshipFourthStep } from "./sole-proprietorship";

export const ServiceFourthStep = () => {
  const [orgType, setOrgType] = useState<string>("sole-proprietorship");
  return (
    <div className="p-4">
      <SoleProprietorshipFourthStep />
    </div>
  );
};
