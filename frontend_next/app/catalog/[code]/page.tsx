import { apiClient } from "@frontend_next/lib/eden";
import { notFound } from "next/navigation";
import ProductToolbar from "../product-toolbar";
import { Suspense } from "react";
import ProductListSkeleton from "../product-list-skeleton";
import ProductList from "../product-list";
import ProductPaginationSkeleton from "../product-pagination-skeleton";
import ProductPagination from "../product-pagination";
import ProductFilter from "../product-filter";

export default async function CatalogCategoryPage({
  params: { code },
  searchParams,
}: {
  params: { code: string };
  searchParams: {
    page?: string;
    page_size?: string;
    properties?: string;
  };
}) {
  const itemJson = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/categories/public_code/${code}`
  );

  if (itemJson.status == 404) {
    return notFound();
  }

  const data = await itemJson.json();
  const pageSize = searchParams.page_size ?? "24";
  return (
    <>
      <h1 className="text-3xl font-bold lg:text-5xl dark:text-white">
        {data.name}
      </h1>
      {data.description && <p>{data.description}</p>}
      <div className="flex gap-x-6 mt-10">
        <div className="hidden h-full overflow-x-hidden overflow-y-scroll lg:flex">
          <ProductFilter category={code} properties={searchParams.properties} />
        </div>
        <div className="w-full flex-1 flex-col">
          <ProductToolbar
            page_size={pageSize}
            category={code}
            properties={searchParams.properties}
          />
          <Suspense
            key={searchParams.page + pageSize}
            fallback={<ProductListSkeleton />}
          >
            <ProductList
              page={searchParams.page}
              page_size={pageSize}
              category={code}
              properties={searchParams.properties}
            />
          </Suspense>
        </div>
      </div>
    </>
  );
}
