"use client";

import React, { useEffect, useState } from "react";
import { Input, Select, Checkbox, Button, SelectItem } from "@nextui-org/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { apiClient } from "@frontend_next/lib/eden";
import { Card, CardContent } from "@frontend_next/components/ui/card";

export function ManufacturerFilterSort() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [facets, setFacets] = useState<{
    cities: { key: string; doc_count: number }[];
    profiles: { [key: string]: { key: string; doc_count: number }[] };
  }>({ cities: [], profiles: {} });

  useEffect(() => {
    fetchFacets();
  }, []);

  const fetchFacets = async () => {
    try {
      const { data } = await apiClient.api.manufacturers.facets.get();
      if (data && ("cities" in data || "profiles" in data)) {
        setFacets({
          cities: data.cities || [],
          profiles: data.profiles || {},
        });
      }
    } catch (error) {
      console.error("Failed to fetch facets:", error);
    }
  };

  const updateSearchParams = (key: string, value) => {
    const current = new URLSearchParams(searchParams.toString());
    if (
      value &&
      (Array.isArray(value) ? value.length > 0 : Object.keys(value).length > 0)
    ) {
      console.log("value", value);
      current.set(key, JSON.stringify(value));
    } else {
      current.delete(key);
    }
    const search = current.toString();
    const query = search ? `?${search}` : "";
    router.push(`${pathname}${query}`, {
      scroll: false,
    });
  };

  const getSelectedValues = (key) => {
    const value = searchParams.get(key);
    return value ? JSON.parse(value) : key === "profiles" ? {} : [];
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="grid grid-cols-8 gap-4 mb-4">
          <Input
            placeholder="Search by name"
            value={searchParams.get("name") || ""}
            onChange={(e) => updateSearchParams("name", e.target.value)}
          />
          <Select
            placeholder="Sort by"
            value={searchParams.get("sort") || "rating-desc"}
            onChange={(value) => updateSearchParams("sort", value.target.value)}
          >
            <SelectItem value="rating-desc" key="rating-desc">
              Rating (High to Low)
            </SelectItem>
            <SelectItem value="rating-asc" key="rating-asc">
              Rating (Low to High)
            </SelectItem>
            <SelectItem value="name-asc" key="name-asc">
              Name (A-Z)
            </SelectItem>
            <SelectItem value="name-desc" key="name-desc">
              Name (Z-A)
            </SelectItem>
          </Select>

          <div>
            <h3 className="font-bold mb-2">Cities</h3>
            {facets.cities.map((city) => (
              <Checkbox
                key={city.key}
                isSelected={getSelectedValues("city").includes(city.key)}
                onChange={(isSelected) => {
                  const current = getSelectedValues("city");
                  const updated = isSelected
                    ? [...current, city.key]
                    : current.filter((c) => c !== city.key);
                  updateSearchParams("city", updated);
                }}
              >
                {city.key} ({city.doc_count})
              </Checkbox>
            ))}
          </div>

          {Object.entries(facets.profiles).map(([fieldName, values]) => (
            <div key={fieldName}>
              <h3 className="font-bold mb-2">{fieldName}</h3>
              {values.map((value) => (
                <Checkbox
                  key={value.key}
                  isSelected={getSelectedValues("profiles")[
                    fieldName
                  ]?.includes(value.key)}
                  onChange={(isSelected) => {
                    const current = getSelectedValues("profiles");
                    const fieldValues = current[fieldName] || [];
                    const updatedFieldValues = isSelected
                      ? [...fieldValues, value.key]
                      : fieldValues.filter((v) => v !== value.key);
                    updateSearchParams("profiles", {
                      ...current,
                      [fieldName]: updatedFieldValues,
                    });
                  }}
                >
                  {value.key} ({value.doc_count})
                </Checkbox>
              ))}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
