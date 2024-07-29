"use client";
import { Tab, Tabs } from "@nextui-org/tabs";
import { Suspense } from "react";
import TopProductsTabSkeleton from "./top-products-tab-skeleton";
import TopProductList from "./top-product-list";
import NewProductList from "./new-product-list";
import Link from "next/link";

export default function TopProductsTab() {
  return (
    <div className="grid grid-cols-1 gap-4 container mx-auto my-10 relative">
      <div className="flex w-full flex-col">
        <Tabs
          aria-label="Options"
          color="primary"
          radius="full"
          className="pl-2"
        >
          <Tab key="top" title="Популярные">
            <Suspense fallback={<TopProductsTabSkeleton />}>
              <TopProductList />
            </Suspense>
          </Tab>
          <Tab key="new" title="Новинки">
            <Suspense fallback={<TopProductsTabSkeleton />}>
              <NewProductList />
            </Suspense>
          </Tab>
        </Tabs>
        <div className="flex justify-end  uppercase hover:text-default-600 dark:hover:text-default-500 text-xs md:text-base absolute top-2 right-4 ">
          <Link href="/catalog">Весь каталог</Link>
        </div>
      </div>
    </div>
  );
}
