"use client";

import dbData from "../public/manafacturer.json";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import {
  JSXElementConstructor,
  Key,
  PromiseLikeOfReactNode,
  ReactElement,
  ReactNode,
  ReactPortal,
} from "react";
import { ManufactureCard } from "./manufacturers/Card";

export default function Proez() {
  return (
    <div className="relative mt-8 flex flex-col">
      {dbData.map((item: any) => (
        <ManufactureCard item={item} key={item.id} />
      ))}
    </div>
  );
}
