import { z } from "zod";
import { ManufactureCard } from "./Card";
import { $values } from "@frontend/src/store/manufacturers_filter";
import { useStore } from "@nanostores/react";
import ManufacturersPagination from "./Pagination";
import { PublicManufacturer } from "@backend/modules/manufacturers/dto/list.dto";
import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@frontend/src/utils/eden";

export default function ManufacturersListClient({
  categorySlug,
  initialData,
  pathname,
}: {
  categorySlug?: string;
  initialData: {
    items: PublicManufacturer[];
  };
  pathname?: string;
}) {
  const values = useStore($values);
  const filters: {
    field: string;
    operator: string;
    value: string;
  }[] = [];
  if (categorySlug) {
    filters.push({
      field: "categories.code",
      operator: "eq",
      value: categorySlug,
    });
  }
  console.log("values", values);
  const { data: manufacturers, isLoading } = useQuery({
    queryKey: [
      "faceted_manufacturers",
      {
        filters: filters.length ? JSON.stringify(filters) : undefined,
        limit: "20",
        facets: JSON.stringify(values),
        imageSizes: [
          {
            image_code: "logo",
            size_code: "300_300",
          },
        ],
      },
    ],
    queryFn: async () => {
      const { data } = await apiClient.api.manufacturers.with_facet.post({
        filters: filters.length ? JSON.stringify(filters) : undefined,
        limit: "20",
        facets: values,
        imageSizes: [
          {
            image_code: "logo",
            size_code: "300_300",
          },
        ],
      });
      return data;
    },
    initialData,
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });
  return (
    <div className="relative mt-8 flex flex-col">
      {manufacturers?.items.map((item) => (
        <ManufactureCard item={item} key={item.id} />
      ))}
      {/* {!isLoading && pathname != "/" && (
        <ManufacturersPagination
          paginationMeta={manufacturers.meta}
          categorySlug={categorySlug}
        />
      )} */}
    </div>
  );
}
