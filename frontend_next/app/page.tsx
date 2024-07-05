import Cta from "@frontend_next/components/main/cta";
import News from "@frontend_next/components/news/News";
import ProductHome from "@frontend_next/components/products/home";
// import { InfiniteMovingCards } from "@frontend_next/components/ui/infinite-moving-cards";
import { Suspense } from "react";
// import { Marquee } from "@devnomic/marquee";
import "@devnomic/marquee/dist/index.css";
import Image from "next/image";
import { Marquee } from "@frontend_next/components/ui/marquee";

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
      {/* <Marquee
        fade={true}
        direction="left"
        reverse={false}
        pauseOnHover={false}
        className="" // pass class to change gap or speed
        innerClassName="" // pass class to change gap or speed
      >
        {images.map((image) => (
          <Image
            width={100}
            height={100}
            src={`/${image}`}
            alt="Groot with blue wisp"
            className="rounded-full"
          />
        ))}
      </Marquee> */}
      <Suspense>
        <ProductHome />
      </Suspense>
      <News />
    </>
  );
}
