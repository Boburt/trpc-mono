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

export function ManufactureCard({ item }: { item: any }) {
  return (
    <div className="card card-side bg-base-200 shadow-xl mb-8 gap-96">
      <div className="">
        <div className="hero-content flex-col lg:flex-row">
          <Logo logos={item.logo} logoWidth={80} logoHeight={10} />
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
        <Like />
        <Slider images={item.slider} imageWidth={464} imageHeight={384} />
      </div>
    </div>
  );
}
