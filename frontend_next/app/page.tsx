import Cta from "@frontend_next/components/main/cta";
import News from "@frontend_next/components/news/News";
import ProductHome from "@frontend_next/components/products/home";
import { Suspense } from "react";
import Image from "next/image";
import { Marquee } from "@frontend_next/components/ui/marquee";
import TopProductsTab from "@frontend_next/components/main/top-products-tab";
import ProductsListByCategory from "@frontend_next/components/main/products-by-category";
import ProductsListByCategorySkeleton from "@frontend_next/components/main/products-by-category-skeleton";
import { FeaturesGrid } from "@frontend_next/components/main/features";

export default function Home() {
  const images = [
    "brand1.jpg",
    "brand2.jpg",
    "brand3.jpg",
    "brand4.jpg",
    "brand5.jpg",
  ];
  return (
    <>
      <Cta />
      <FeaturesGrid />
      <TopProductsTab />
      <Suspense fallback={<ProductsListByCategorySkeleton />}>
        <ProductsListByCategory category="kardnaya" />
      </Suspense>
      <Suspense fallback={<ProductsListByCategorySkeleton />}>
        <ProductsListByCategory category="dzhinsovaya-tkan-denim" />
      </Suspense>
      <Suspense fallback={<ProductsListByCategorySkeleton />}>
        <ProductsListByCategory category="makhrovaya-tkan" />
      </Suspense>
      <Suspense fallback={<ProductsListByCategorySkeleton />}>
        <ProductsListByCategory category="krashennaya" />
      </Suspense>
      <News />
    </>
  );
}
