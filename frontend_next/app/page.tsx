import Cta from "@frontend_next/components/main/cta";
import News from "@frontend_next/components/news/News";
import ProductHome from "@frontend_next/components/products/home";
import { Suspense } from "react";
import Image from "next/image";
import { Marquee } from "@frontend_next/components/ui/marquee";
import TopProductsTab from "@frontend_next/components/main/top-products-tab";

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
            className="relative h-full w-fit mx-[4rem] flex items-center justify-start"
          >
            <Image
              width={100}
              height={100}
              src={`/${image}`}
              alt="Groot with blue wisp"
              className="rounded-full"
            />
          </div>
        ))}
      </Marquee>
      <TopProductsTab />
      <News />
    </>
  );
}
