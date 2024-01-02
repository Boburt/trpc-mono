import { ManufacturersWhereInputSchema } from "@backend/lib/zod";
import { RouterOutputs, trpc } from "@frontend/src/utils/trpc";
import { z } from "zod";
import { ManufactureCard } from "./Card";
import { $values } from "@frontend/src/store/manufacturers_filter";
import { useShallow } from "zustand/react/shallow";
import { useStore } from "@nanostores/react";
import ManufacturersPagination from "./Pagination";
import { PublicManufacturer } from "@backend/modules/manufacturers/dto/list.dto";

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
  const where: z.infer<typeof ManufacturersWhereInputSchema> = {};
  if (categorySlug) {
    where.manufacturers_categories = {
      some: {
        manufacturers_categories_categories: {
          code: {
            equals: categorySlug,
          },
        },
      },
    };
  }
  const { data: manufacturers, isLoading } =
    trpc.manufacturers.publicList.useQuery(
      {
        where,
        take: 20,
        include: {
          cities: true,
          manufacturers_categories: {
            include: {
              manufacturers_categories_categories: true,
            },
          },
        },
        imageSizes: [
          {
            image_code: "logo",
            size_code: "300_300",
          },
        ],
        facets: values,
      },
      {
        initialData,
        refetchOnMount: false,
        refetchOnReconnect: false,
        refetchOnWindowFocus: false,
      }
    );
  return (
    <div className="relative mt-8 flex flex-col">
      {manufacturers.items.map((item) => (
        <ManufactureCard item={item} key={item.id} />
      ))}
      {!isLoading && pathname != "/" && (
        <ManufacturersPagination
          paginationMeta={manufacturers.meta}
          categorySlug={categorySlug}
        />
      )}
    </div>
  );
}
