import { Suspense } from "react";
import ProductList from "./product-list";
import ProductListSkeleton from "./product-list-skeleton";
import ProductPaginationSkeleton from "./product-pagination-skeleton";
import ProductToolbar from "./product-toolbar";
import ProductFilter from "./product-filter";

export default function Catalog({
  searchParams,
}: {
  searchParams: {
    page?: string;
    page_size?: string;
    properties?: string;
    query?: string;
  };
}) {
  const pageSize = searchParams.page_size ?? "24";
  return (
    <div className="">
      <h1 className="text-3xl font-bold lg:text-5xl dark:text-white">
        Каталог
      </h1>
      <div className="flex gap-x-6 mt-10">
        <div className="hidden h-full overflow-x-hidden overflow-y-scroll lg:flex">
          <ProductFilter properties={searchParams.properties} />
        </div>
        <div className="w-full flex-1 flex-col">
          <ProductToolbar
            page_size={pageSize}
            properties={searchParams.properties}
          />
          <Suspense
            key={searchParams.page + pageSize + `?${searchParams.query}`}
            fallback={<ProductListSkeleton />}
          >
            <ProductList
              page={searchParams.page}
              page_size={pageSize}
              properties={searchParams.properties}
              query={searchParams.query}
            />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
