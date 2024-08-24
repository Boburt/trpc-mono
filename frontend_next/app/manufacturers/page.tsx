import React, { Suspense } from "react";
import { ManufacturerFilterSort } from "./ManufacturerFilterSort";
import { searchParamsCache } from "./searchParams";
import ManufacturersListSkeleton from "./ManufacturersListSkeleton";
import ManufacturersList from "./ManufacturersList";
// import { ManufacturerList } from "./ManufacturerList";

export default function ManufacturersPage({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) {
  const { page, page_size, query, capacity, city } =
    searchParamsCache.parse(searchParams);
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Manufacturers</h1>
      <ManufacturerFilterSort />
      <div className="my-8">
        <Suspense
          key={`${page}${page_size}${query}${capacity.join("|")}${city.join(
            "|"
          )}`}
          fallback={<ManufacturersListSkeleton />}
        >
          <ManufacturersList />
        </Suspense>
      </div>
      {/* <Suspense fallback={<div>Loading...</div>}>
        <ManufacturerList />
      </Suspense> */}
    </div>
  );
}
