"use client";
import { ScrollArea } from "@frontend_next/components/ui/scroll-area";
import { apiClient } from "@frontend_next/lib/eden";
import {
  Checkbox,
  CheckboxGroup,
  Slider,
  SliderValue,
} from "@nextui-org/react";
import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import router from "next/router";
import { use, useEffect, useMemo, useState } from "react";
import { useDebounce } from "@uidotdev/usehooks";
import { Accordion, AccordionItem } from "@radix-ui/react-accordion";
import {
  AccordionContent,
  AccordionTrigger,
} from "@frontend_next/components/ui/accordion";

export default function ProductFilterFacets({
  category,
  properties,
  query,
}: {
  category?: string;
  properties?: string;
  query?: string;
}) {
  const [value, setValue] = useState<SliderValue>([0, 0]);
  const debouncedPriceRange = useDebounce<SliderValue>(value, 300);
  const { push } = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const queryParams = useMemo(() => {
    let res: {
      category?: string;
      properties?: string;
      query?: string;
    } = {};

    if (category) {
      res.category = category;
    }

    if (properties) {
      res.properties = properties;
    }
    if (query) {
      res.query = query;
    }

    return res;
  }, [category, properties, query]);

  const { data: facets } = useSuspenseQuery({
    queryKey: ["products_facets", category, properties, query],
    queryFn: async () => {
      const { data } = await apiClient.api.products.public.facets.get({
        query: queryParams,
      });
      return data;
    },
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });

  const updateFilters = (
    key: string,
    value: string | number | number[] | string[]
  ) => {
    const params = new URLSearchParams(searchParams.toString());
    if (key === "price") {
      if (Array.isArray(value) && value[0] === value[1]) {
        return;
      } else if (Array.isArray(value) && value[0] === 0) {
        params.delete(key);
        return;
      } else if (Array.isArray(value) && value[1] === 0) {
        params.delete(key);
        return;
      } else if (typeof value == "number" && value === 0) {
        params.delete(key);
        return;
      }
    }
    if (typeof value === "string") {
      if (params.get(key)?.includes(value)) {
        params.set(key, params.get(key)!.replace(value, ""));
      } else if (params.get(key)) {
        params.set(key, params.get(key)! + "," + value);
      } else {
        params.set(key, value);
      }
    } else if (Array.isArray(value)) {
      if (params.get(key) && value.length == 0) {
        params.delete(key);
      } else {
        params.set(key, value.join(","));
      }
    } else {
      if (params.get(key)) {
        params.set(key, params.get(key)!.replace(value.toString(), ""));
      } else {
        params.set(key, value.toString());
      }
    }
    push(`${pathname}?${params.toString()}`, {
      scroll: false,
    });
  };

  useEffect(() => {
    if (debouncedPriceRange) {
      updateFilters("price", debouncedPriceRange);
    }
  }, [debouncedPriceRange]);

  if (!facets) {
    return <div></div>;
  }

  return (
    <div className="space-y-4 px-4 mt-4">
      <Slider
        label="Цена"
        minValue={facets.priceRange.min}
        maxValue={facets.priceRange.max}
        step={10}
        value={value}
        formatOptions={{
          style: "currency",
          currency: "UZS",
          minimumFractionDigits: 0,
          maximumFractionDigits: 2,
          minimumSignificantDigits: 1,
          maximumSignificantDigits: 4,
        }}
        onChange={setValue}
      />
      {facets.properties.map((property) => (
        <CheckboxGroup
          label={property.key}
          key={property.key}
          value={
            searchParams.get("properties")
              ? searchParams.get("properties")?.split(",")
              : []
          }
          // value={selected}
          onValueChange={(val) => updateFilters("properties", val)}
        >
          {property.values.map((value) => (
            <Checkbox
              key={value.key}
              // isSelected={searchParams
              //   .get("properties")
              //   ?.includes(`${property.key}:${value.key}`)}
              // onValueChange={(val) =>
              //   updateFilters("properties", `${property.key}:${value.key}`)
              // }
              value={`${property.key}:${value.key}`}
            >
              {value.key} ({value.doc_count})
            </Checkbox>
          ))}
        </CheckboxGroup>
      ))}
    </div>
  );
}
