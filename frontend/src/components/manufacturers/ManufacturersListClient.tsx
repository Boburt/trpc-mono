import { ManufacturersWhereInputSchema } from "@backend/lib/zod";
import { RouterOutputs, trpc } from "@frontend/src/utils/trpc";
import { z } from "zod";
import { ManufactureCard } from "./Card";

export default function ManufacturersListClient({
  categorySlug,
  initialData,
}: {
  categorySlug?: string;
  initialData: RouterOutputs["manufacturers"]["list"];
}) {
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
    </div>
  );
}
