import { RouterOutputs, trpc } from "../../../utils/trpc";
import clsx from "clsx";
import { useShallow } from "zustand/shallow";
import { useMemo } from "react";
import { FilterFacetedDropdown } from "../../filter-ui/faceted-dropdown";
import { Flowbite } from "flowbite-react";
import { useManufacturersFilterStore } from "@frontend/src/store/manufacturers_filter";

export default function CategoriesFilterClient({
  initialData,
  pathname,
}: {
  initialData: RouterOutputs["categories"]["activeCachedCategories"];
  pathname: string;
}) {
  const { data: categories, isLoading } =
    trpc.categories.activeCachedCategories.useQuery(
      {
        take: 100,
      },
      {
        initialData,
        refetchOnMount: false,
        refetchOnReconnect: false,
      }
    );

  const [facets, values, isValuesFilled] = useManufacturersFilterStore(
    (state) => [state.facets, state.values, state.isValuesFilled()]
  );
  const [setValue, removeValue, resetValues] = useManufacturersFilterStore(
    (state) => [state.setValue, state.removeValue, state.resetValues]
  );

  const isHome = useMemo(() => {
    return pathname === "/";
  }, [pathname]);

  return (
    <>
      <div className=" bg-white mx-auto rounded-md items-center p-4 mb-2">
        <div className="flex gap-4">
          <a
            href="/"
            className={isHome ? "border-b-2 border-black" : "cursor-pointer"}
          >
            All
          </a>
          {categories.map((category) => {
            const isActive =
              pathname === `/manufacturer/categories/${category.code}`;
            return (
              <a
                href={`/manufacturer/categories/${category.code}`}
                className={clsx("border-b-2", {
                  "border-black": isActive,
                  "cursor-pointer": !isActive,
                  "border-transparent": !isActive,
                })}
                key={category.code}
              >
                {category.name}
              </a>
            );
          })}
        </div>
        <div className="divider my-2"></div>
        <div className="flex items-center gap-2">
          {facets &&
            facets.map((facet) => (
              <FilterFacetedDropdown
                items={facet.value}
                value={values[facet.code] ?? []}
                multiple={facet.multiple}
                key={facet.code}
                label={facet.name}
                searchInputName={facet.code}
                setValue={(value) => {
                  setValue(facet.code, value);
                }}
                removeValue={(value) => {
                  removeValue(facet.code, value);
                }}
              />
            ))}
          {isValuesFilled && (
            <button
              className="btn btn-outline btn-sm flex"
              onClick={() => {
                resetValues();
              }}
            >
              <span>Сбросить фильтр</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          )}
        </div>
      </div>
    </>
  );
}
