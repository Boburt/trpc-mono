import Cta from "@frontend_next/components/main/cta";
import News from "@frontend_next/components/news/News";
import ProductHome from "@frontend_next/components/products/home";
import { Suspense } from "react";

export default function Home() {
  return (
    <>
      <Cta />
      <Suspense>
        <ProductHome />
      </Suspense>
      <News />
    </>
  );
}
