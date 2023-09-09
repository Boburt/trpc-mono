import { RouterOutputs } from "../../../utils/trpc";
import CategoriesFilterClient from "./CategoriesClient";
import Providers from "@frontend/src/store/provider";

export default function CategoriesClientProvider({
  categories,
  pathname,
}: {
  categories: RouterOutputs["categories"]["activeCachedCategories"];
  pathname: string;
}) {
  return (
    <Providers>
      <CategoriesFilterClient initialData={categories} pathname={pathname} />
    </Providers>
  );
}
