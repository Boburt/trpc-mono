"use client";

import React, { useCallback, useEffect, useState } from "react";
import { Input, Select, Checkbox, Button, SelectItem } from "@nextui-org/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { apiClient } from "@frontend_next/lib/eden";
import { Card, CardContent } from "@frontend_next/components/ui/card";
import { FacetedFilter } from "@frontend_next/components/ui/faceted-filter";
import { useSuspenseQuery } from "@tanstack/react-query";
import { searchParams, searchParamsCache } from "./searchParams";
import { useQueryState } from "nuqs";

const measureCodes = {
  million_piece: "млн.дона",
  thousand_ton: "минг тонна",
  million_pair: "млн.жуфт",
  million_square_meter: "млн.кв.м",
};

const getCapacityLabel = (capacity: string) => {
  let [label, count, measure] = capacity.split(":");

  return `${label}: ${count} ${measureCodes[measure]}`;
};

export function ManufacturerFilterSort() {
  const [page, setPage] = useQueryState("page", searchParams.page);
  const [sort, setSort] = useQueryState("sort", searchParams.sort);
  const [city, setCity] = useQueryState("city", searchParams.city);
  const [capacity, setCapacity] = useQueryState(
    "capacity",
    searchParams.capacity
  );

  const changeCityCallback = useCallback((value: string[]) => {
    setPage(1);
    setCity(value);
  }, []);

  const changeCapacityCallback = useCallback((value: string[]) => {
    setPage(1);
    setCapacity(value);
  }, []);

  const { data: facets } = useSuspenseQuery({
    queryKey: ["manufacturers_facets"],
    queryFn: async () => {
      const { data } = await apiClient.api.manufacturers.facets.get({
        query: {},
      });
      return data;
    },
  });

  return (
    <Card>
      <CardContent className="pt-6 ">
        <div className="flex items-center justify-between">
          <div className="flex space-x-4 items-center">
            {facets && facets.cities && facets.cities.length > 0 && (
              <FacetedFilter
                title="Город"
                options={facets.cities.map((city) => ({
                  label: city.value,
                  value: city.value,
                  count: city.count,
                }))}
                value={city}
                onChange={(value) => changeCityCallback(value)}
              />
            )}
            {facets && facets.capacity && facets.capacity.length > 0 && (
              <FacetedFilter
                title="Производственная мощность"
                options={facets.capacity.map((capacity) => ({
                  label: getCapacityLabel(capacity.value),
                  value: capacity.value,
                  count: capacity.count,
                }))}
                value={capacity}
                onChange={(value) => changeCapacityCallback(value)}
              />
            )}
          </div>
          <div>
            <Select
              placeholder="Сортировка"
              value={sort}
              onChange={(value) => setSort(value.target.value)}
              className="w-48"
            >
              <SelectItem value="rating:desc" key="rating:desc">
                Рейтинг (по убыванию)
              </SelectItem>
              <SelectItem value="rating:asc" key="rating:asc">
                Рейтинг (по возрастанию)
              </SelectItem>
              <SelectItem value="name:asc" key="name:asc">
                Название (А-Я)
              </SelectItem>
              <SelectItem value="name:desc" key="name:desc">
                Название (Я-А)
              </SelectItem>
            </Select>
          </div>
        </div>
        {/* <div className="flex space-x-2">
        <Input
          placeholder="Search manufacturers"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button onClick={handleSearch}>Search</Button>
      </div> */}
      </CardContent>
    </Card>
  );
}
