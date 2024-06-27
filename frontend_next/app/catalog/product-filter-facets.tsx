"use client";
import { ScrollArea } from "@frontend_next/components/ui/scroll-area";
import { apiClient } from "@frontend_next/lib/eden";
import { Checkbox, Slider, SliderValue } from "@nextui-org/react";
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

export default function ProductFilterFacets() {
  const [value, setValue] = useState<SliderValue>(0);
  const debouncedPriceRange = useDebounce<SliderValue>(value, 300);
  const { push } = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const searchMinPrice = searchParams.get("price")
    ? searchParams.get("price")?.split(",")[0]
    : 0;
  const searchMaxPrice = searchParams.get("price")
    ? searchParams.get("price")?.split(",")[1]
    : 0;

  const { data: facets } = useSuspenseQuery({
    queryKey: ["products_facets"],
    queryFn: async () => {
      const { data } = await apiClient.api.products.public.facets.get();
      return data;
    },
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });

  const updateFilters = (key: string, value: string | number | number[]) => {
    const params = new URLSearchParams(searchParams.toString());
    if (Array.isArray(value)) {
      params.set(key, value.join(","));
    } else {
      params.set(key, value.toString());
    }
    push(`${pathname}?${params.toString()}`);
  };

  const twoProperties = useMemo(() => {
    if (facets && facets.properties.length > 1) {
      return facets.properties.slice(1);
    } else {
      return [];
    }
  }, [facets]);

  useEffect(() => {
    let res = [0, 0];
    if (searchMinPrice && searchMaxPrice) {
      res = [parseInt(searchMinPrice), parseInt(searchMaxPrice)];
    } else if (facets && facets.priceRange) {
      res = [facets.priceRange.min, facets.priceRange.max];
    }
    setValue(res);
  }, [facets, searchMinPrice, searchMaxPrice]);

  useEffect(() => {
    if (debouncedPriceRange) {
      updateFilters("price", debouncedPriceRange);
    }
  }, [debouncedPriceRange]);

  if (!facets) {
    return <div></div>;
  }

  const firstProperty = facets.properties[0];

  return (
    <ScrollArea className="h-[calc(100vh-12rem)] mt-4">
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="price">
          <AccordionTrigger>Цена</AccordionTrigger>
          <AccordionContent>
            <Slider
              label=" "
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
          </AccordionContent>
        </AccordionItem>
        {facets.properties.map((property) => (
          <AccordionItem value={property.key} key={property.key}>
            <AccordionTrigger>{property.key}</AccordionTrigger>
            <AccordionContent>
              {property.values.map((value) => (
                <Checkbox
                  key={value.key}
                  isSelected={searchParams
                    .get("properties")
                    ?.includes(`${property.key}:${value.key}`)}
                  onValueChange={(val) =>
                    updateFilters("properties", `${property.key}:${value.key}`)
                  }
                >
                  {value.key} ({value.doc_count})
                </Checkbox>
              ))}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
      {/* <Accordion
        isCompact
        selectionMode="multiple"
        className="w-full"
        defaultExpandedKeys={["price_range", "properties"]}
      >
        <AccordionItem key="price_range" aria-label="Price Range" title="Цена">
          <Slider
            label=" "
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
        </AccordionItem>
        <AccordionItem
          key={firstProperty.key}
          aria-label={firstProperty.key}
          title={firstProperty.key}
        >
          {firstProperty.values.map((value) => (
            <Checkbox
              key={value.key}
              isSelected={searchParams
                .get("properties")
                ?.includes(`${firstProperty.key}:${value.key}`)}
              onValueChange={(val) =>
                updateFilters("properties", `${firstProperty.key}:${value.key}`)
              }
            >
              {value.key} ({value.doc_count})
            </Checkbox>
          ))}
        </AccordionItem>
        {twoProperties.map((property) => (
          <AccordionItem
            key={property.key}
            aria-label={property.key}
            title={property.key}
          >
            {property.values.map((value) => (
              <Checkbox
                key={value.key}
                isSelected={searchParams
                  .get("properties")
                  ?.includes(`${property.key}:${value.key}`)}
                onValueChange={(val) =>
                  updateFilters("properties", `${property.key}:${value.key}`)
                }
              >
                {value.key} ({value.doc_count})
              </Checkbox>
            ))}
          </AccordionItem>
        ))}
      </Accordion> */}
    </ScrollArea>
  );
}
