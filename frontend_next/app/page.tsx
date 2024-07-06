import Cta from "@frontend_next/components/main/cta";
import News from "@frontend_next/components/news/News";
import ProductHome from "@frontend_next/components/products/home";
import { Suspense } from "react";
import Image from "next/image";
import { Marquee } from "@frontend_next/components/ui/marquee";
import TopProductsTab from "@frontend_next/components/main/top-products-tab";
import ProductsListByCategory from "@frontend_next/components/main/products-by-category";
import ProductsListByCategorySkeleton from "@frontend_next/components/main/products-by-category-skeleton";

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
      <Marquee>
        {images.map((image) => (
          <div
            key={image}
            className="relative h-full w-fit mx-[4rem] md:flex items-center justify-start"
          >
            <Image
              width={100}
              height={100}
              src={`/${image}`}
              alt="Groot with blue wisp"
              className="rounded-full aspect-square"
            />
          </div>
        ))}
      </Marquee>
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
