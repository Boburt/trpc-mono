import Cta from "@frontend_next/components/main/cta";
import News from "@frontend_next/components/news/News";
import ProductHome from "@frontend_next/components/products/home";
import { InfiniteMovingCards } from "@frontend_next/components/ui/infinite-moving-cards";
import { Suspense } from "react";

export default function Home() {
  return (
    <>
      <Cta />
      <InfiniteMovingCards
        direction="right"
        speed="slow"
        items={[
          {
            link: "https://wallpapers.com/images/high/1920x1080-hd-groot-with-blue-wisp-s4o4agkegdizjcop.webp",
          },
          {
            link: "https://wallpapers.com/images/high/1920x1080-hd-groot-with-blue-wisp-s4o4agkegdizjcop.webp",
          },
          {
            link: "https://wallpapers.com/images/high/1920x1080-hd-groot-with-blue-wisp-s4o4agkegdizjcop.webp",
          },
          {
            link: "https://wallpapers.com/images/high/1920x1080-hd-groot-with-blue-wisp-s4o4agkegdizjcop.webp",
          },
          {
            link: "https://wallpapers.com/images/high/1920x1080-hd-groot-with-blue-wisp-s4o4agkegdizjcop.webp",
          },
          {
            link: "https://wallpapers.com/images/high/1920x1080-hd-groot-with-blue-wisp-s4o4agkegdizjcop.webp",
          },
          {
            link: "https://wallpapers.com/images/high/1920x1080-hd-groot-with-blue-wisp-s4o4agkegdizjcop.webp",
          },
        ]}
      />
      <Suspense>
        <ProductHome />
      </Suspense>
      <News />
    </>
  );
}
