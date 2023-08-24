"use client";

import dbData from "../public/manafacturer.json";
import Image from "next/image";
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

export default function Proez() {
  return (
    <div className="relative mt-8 flex flex-col">
      {dbData.map((item: any) => (
        <div
          key={item.id}
          className="card card-side bg-base-200 shadow-xl mb-8 gap-96"
        >
          <div className="">
            <div className="hero-content flex-col lg:flex-row">
              <Image
                src={item.logo}
                alt={item.name}
                className="rounded-md w-16 h-16"
                width={1000}
                height={1000}
              />
              <div>
                <h1 className="text-2xl font-bold underline">{item.name}</h1>
                <p>{item.derc}</p>
              </div>
            </div>
            <div className="card-body">
              <h6 className="font-light font-serif tracking-wide">
                Rating and revews
              </h6>
              <p>
                <span>{item.reyting}</span>/5({item.reviews} reviews)
              </p>
              <h4 className="font-light font-serif tracking-wide">
                Factory capabilities
              </h4>
              {item.factory.map(
                (
                  facturyItem:
                    | string
                    | number
                    | boolean
                    | ReactElement<any, string | JSXElementConstructor<any>>
                    | Iterable<ReactNode>
                    | ReactPortal
                    | PromiseLikeOfReactNode
                    | null
                    | undefined,
                  facturIndex: Key | null | undefined
                ) => (
                  <ul
                    role="list"
                    className="list-inside list-disc text-sm font-bold"
                    key={facturIndex}
                  >
                    <li className="text-sm font-bold pl-2">{facturyItem}</li>
                  </ul>
                )
              )}
            </div>
          </div>
          <div className="w-1/3">
            <div className="flex justify-end mt-5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="1em"
                viewBox="0 0 512 512"
                className="h-4 w-4 fill-slate-400 hover:fill-slate-700 cursor-pointer active:fill-orange-500 my-auto mr-4"
              >
                <path d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z" />
              </svg>
              <button className="btn btn-outline rounded-full mr-4 text-[12px] font-bold 	">
                Chat now
              </button>

              <button className="btn btn-outline rounded-full mr-4 text-[12px] font-bold	">
                Contact us
              </button>
            </div>
            <Carousel className="dislay m-auto p-4">
              {item.slider.map(
                (
                  imagePath: string | StaticImport,
                  index: Key | null | undefined
                ) => (
                  <Image
                    key={index}
                    src={imagePath}
                    alt={`Image ${index}`}
                    width={1000}
                    height={1000}
                    className=" w-32 h-96"
                  />
                )
              )}
            </Carousel>
          </div>
        </div>
      ))}
    </div>
  );
}
