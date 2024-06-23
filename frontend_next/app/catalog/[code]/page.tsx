import { apiClient } from "@frontend_next/lib/eden";
import { notFound } from "next/navigation";
import ProductToolbar from "../product-toolbar";
import { Suspense } from "react";
import ProductListSkeleton from "../product-list-skeleton";
import ProductList from "../product-list";
import ProductPaginationSkeleton from "../product-pagination-skeleton";
import ProductPagination from "../product-pagination";

export default async function CatalogCategoryPage({
  params: { code },
  searchParams,
}: {
  params: { code: string };
  searchParams: {
    page?: string;
    page_size?: string;
  };
}) {
  const itemJson = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/categories/public_code/${code}`
  );

  if (itemJson.status == 404) {
    return notFound();
  }

  const data = await itemJson.json();
  const pageSize = searchParams.page_size ?? "25";
  return (
    <>
      <h1 className="text-3xl font-bold lg:text-5xl dark:text-white">
        {data.name}
      </h1>
      {data.description && <p>{data.description}</p>}
      <div className="flex gap-x-6 mt-10">
        <div className="hidden h-full overflow-x-hidden overflow-y-scroll sm:flex"></div>
        <div className="w-full flex-1 flex-col">
          <ProductToolbar page_size={pageSize} />
          <Suspense
            key={searchParams.page + pageSize}
            fallback={<ProductListSkeleton />}
          >
            <ProductList
              page={searchParams.page}
              page_size={pageSize}
              category={code}
            />
          </Suspense>
          <Suspense
            key={searchParams.page + pageSize}
            fallback={<ProductPaginationSkeleton />}
          >
            <ProductPagination
              page={searchParams.page}
              page_size={pageSize}
              category={code}
            />
          </Suspense>
        </div>
      </div>
    </>
  );
}
