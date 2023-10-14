import { ManufacturersWhereInputSchema } from "@backend/lib/zod";
import { RouterOutputs, trpc } from "@frontend/src/utils/trpc";
import { z } from "zod";
import { ManufactureCard } from "./Card";
import { $values } from "@frontend/src/store/manufacturers_filter";
import { useShallow } from "zustand/react/shallow";
import { useStore } from "@nanostores/react";
import ManufacturersPagination from "./Pagination";

export default function ManufacturersListClient({
  categorySlug,
  initialData,
}: {
  categorySlug?: string;
  initialData: RouterOutputs["manufacturers"]["publicList"];
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
        facets: values,
      },
      {
        initialData,
        refetchOnMount: false,
        refetchOnReconnect: false,
      }
    );
  return (
    <div className="relative mt-8 flex flex-col">
      {manufacturers.items.map((item) => (
        <ManufactureCard item={item} key={item.id} />
      ))}
      {!isLoading && (
        <ManufacturersPagination
          paginationMeta={manufacturers.meta}
          categorySlug={categorySlug}
        />
      )}
    </div>
  );
}
