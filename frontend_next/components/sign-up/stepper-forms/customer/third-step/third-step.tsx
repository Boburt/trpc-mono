"use client";
import * as React from "react";
import { roleStore } from "@frontend_next/store/zustand/roleStore";
import { useState } from "react";
import { CountryDropdown } from "@frontend_next/components/country-select/country-select";
import { Input } from "@frontend_next/components/ui/input";
import { MultiSelect } from "@frontend_next/components/multi-select/multi-select";

const categoryList = [
  {
    value: "yarn",
    label: "Пряжа",
  },
  {
    value: "fabrics",
    label: "Ткани",
  },
  {
    value: "nested_fabric",
    label: "Швейные ткани",
  },
  {
    value: "remix",
    label: "Remix",
  },
  {
    value: "astro",
    label: "Astro",
  },
];

export const CustomerThirdStep = () => {
  const [orgType, setOrgType] = useState<string>("sole-proprietorship");
  return (
    <div className="">
      <h1 className="text-2xl font-bold pt-6 px-6">
        Информация о предпринимательстве
      </h1>
      <div className="flex justify-around gap-4 p-6">
        <div className="flex flex-col">
          <span>Укажите страну регистрации</span>
          <CountryDropdown />
        </div>
        <div>
          <span>Введите ИНН организации</span>
          <Input className="min-w-64" />
        </div>
        {/* <div>
          <span>Интересующие продукты</span>
          <MultiSelect
            options={categoryList}
            placeholder="Выберите..."
            onValueChange={(value) => "yarn"}
            defaultValue={"yarn"}
            variant="inverted"
            animation={2}
            maxCount={3}
          />
        </div> */}
      </div>
    </div>
  );
};
