import { Suspense } from "react";
import ProductList from "./product-list";
import ProductPagination from "./product-pagination";
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
  };
}) {
  const pageSize = searchParams.page_size ?? "25";
  return (
    <div className="">
      <h1 className="text-3xl font-bold lg:text-5xl dark:text-white">
        Каталог
      </h1>
      <div className="flex gap-x-6 mt-10">
        <div className="hidden h-full overflow-x-hidden overflow-y-scroll sm:flex">
          <ProductFilter />
        </div>
        <div className="w-full flex-1 flex-col">
          <ProductToolbar page_size={pageSize} />
          <Suspense
            key={searchParams.page + pageSize}
            fallback={<ProductListSkeleton />}
          >
            <ProductList page={searchParams.page} page_size={pageSize} />
          </Suspense>
          <Suspense
            key={searchParams.page + pageSize}
            fallback={<ProductPaginationSkeleton />}
          >
            <ProductPagination page={searchParams.page} page_size={pageSize} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
