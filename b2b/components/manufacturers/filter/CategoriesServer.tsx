import { trpcClient } from "@/utils/trpc-server";
import CategoriesFilterClient from "./CategoriesClient";

export async function CategoriesFilterServer() {
  const categories = await trpcClient.categories.activeCachedCategories.query({
    take: 100,
  });

  return <CategoriesFilterClient initialData={categories} />;
}
