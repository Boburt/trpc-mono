import { StaticImport } from "next/dist/shared/lib/get-img-props";
import {
  JSXElementConstructor,
  Key,
  PromiseLikeOfReactNode,
  ReactElement,
  ReactNode,
  ReactPortal,
} from "react";
import { Carousel } from "react-responsive-carousel";
import Image from "next/image";
import Slider from "../slider/Slider";
import Logo from "./Logo";
import Like from "./Like";
import Products from "./Products";

export function ManufactureCard({ item }: { item: any }) {
  return (
    <>
      <div className="bg-base-200 shadow-xl mb-8 gap-96">
        <div className="flex justify-between w-full">
          <div className="flex mt-5 ml-5">
            <Logo logos={item.logo} logoWidth={100} logoHeight={10} />
            <div className="ml-5">
              <h1 className="text-2xl font-bold underline mb-1">{item.name}</h1>
              <p>{item.derc}</p>
            </div>
          </div>
          <Like />
        </div>
        <div className="card card-side flex justify-between">
          <div>
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
          <div>
            <Products
              price={item.products}
              image={item.products.image}
              moq={item.products.moq}
              products={item.products.price}
            />
          </div>
          <div className="w-1/3">
            <Slider images={item.slider} imageWidth={464} imageHeight={384} />
          </div>
        </div>
      </div>
    </>
  );
}
