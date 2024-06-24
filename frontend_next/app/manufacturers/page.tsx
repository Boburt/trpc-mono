import BaseLayout from "@frontend/src/layouts/BaseLayout.astro";
import { parseQueryParams } from "@frontend/src/utils/manufacturers_filter_fn";
import { ManufacturersPageProvider } from "@frontend/src/components/manufacturers/ManufacturersPage";
import { apiClient } from "@frontend/src/utils/eden";

export default async function ManufacturersPage() {
  const customCrumbs = [
    {
      text: "Главная",
      href: "/",
    },
    {
      text: "Производители",
      href: "/manufacturers",
    },
  ];
  const searchParams = new URL(Astro.request.url4).search;
  const pathname = new URL(Astro.request.url).pathname;

  const manufacturersFilterValues = parseQueryParams(searchParams);
  const filters: any[] = [];

  const { data: manufacturers } =
    await apiClient.api.manufacturers.with_facet.post({
      filters: filters.length ? JSON.stringify(filters) : undefined,
      limit: "20",
      facets: manufacturersFilterValues?.manufacturers_filter ?? undefined,
      imageSizes: [
        {
          image_code: "logo",
          size_code: "300_300",
        },
      ],
    });

  const { data: facets } = await apiClient.api.manufacturers.facet_filter.get({
    $query: {},
  });
  console.log("facets", facets);

  return (
    <ManufacturersPageProvider
      initialData={
        manufacturers ?? {
          items: [],
        }
      }
      searchParams={searchParams}
      pathname={pathname}
      facets={facets}
      filterValues={manufacturersFilterValues?.manufacturers_filter ?? {}}
    />
  );
}
