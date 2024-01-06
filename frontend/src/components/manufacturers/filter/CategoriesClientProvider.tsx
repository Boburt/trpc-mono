import { $facets, $values } from "@frontend/src/store/manufacturers_filter";
import CategoriesFilterClient from "./CategoriesClient";
import Providers from "@frontend/src/store/provider";

export default function CategoriesClientProvider({
  categories,
  pathname,
  facets,
  filterValues,
}: {
  categories: any; // RouterOutputs["categories"]["activeCachedCategories"];
  pathname: string;
  facets: any; // RouterOutputs["manufacturers"]["getFacetFilter"];
  filterValues: {
    [key: string]: string[];
  };
}) {
  // useManufacturersFilterStore.setState({ facets, values: filterValues });

  $facets.set(facets);
  $values.set(filterValues);
  return (
    <Providers>
      dd
      <CategoriesFilterClient initialData={categories} pathname={pathname} />
    </Providers>
  );
}
