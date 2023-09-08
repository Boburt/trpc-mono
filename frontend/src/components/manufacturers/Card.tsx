import { Key, useMemo } from "react";
import Slider from "../slider/Slider";
import Logo from "./Logo";
import Like from "./Like";
import Products from "./Products";
import { z } from "zod";
import {
  ManufacturersSchema,
  ManufacturersWithRelationsSchema,
} from "@backend/lib/zod";
import { RouterOutputs } from "@frontend/src/utils/trpc";

export function ManufactureCard({
  item,
}: {
  item: RouterOutputs["manufacturers"]["list"]["items"][number];
}) {
  const logoImage = useMemo(() => {
    return item.images?.find((image) => image.code === "logo");
  }, [item.images]);

  return (
    <>
      <div
        className="bg-base-200 shadow-xl mb-8 gap-96"
        itemScope
        itemType="https://schema.org/Organization"
      >
        <div className="flex justify-between w-full">
          <div className="flex mt-5 ml-5">
            {/* <Logo logos={item.logo} logoWidth={100} logoHeight={10} /> */}
            <div className="avatar">
              <div className="w-24 rounded-xl">
                <img
                  src={
                    logoImage
                      ? `${import.meta.env.PUBLIC_TRPC_API_URL}${
                          logoImage.path
                        }`
                      : "/images/no-photo.webp"
                  }
                  alt=""
                />
              </div>
            </div>
            <div className="ml-5">
              <a className="link link-hover" href={`/manufacturer/${item.id}`}>
                <h3 className="card-title uppercase" itemProp="name">
                  {item.short_name}
                </h3>
              </a>
              <span className="">{item.name}</span>
            </div>
          </div>
          <Like />
        </div>
        <div className="card card-side flex justify-between">
          <div>
            <div className="card-body mt-4">
              <h6 className="font-light font-serif tracking-wide">
                Rating and revews
              </h6>
              {/* <p>
                <span>{item.reyting}</span>/5({item.reviews} reviews)
              </p> */}
              <h4 className="font-light font-serif tracking-wide mt-5">
                Factory capabilities
              </h4>
              {/* {item.factory.map(
                (facturyItem: any, facturIndex: Key | null | undefined) => (
                  <ul
                    role="list"
                    className="list-inside list-disc text-sm font-bold"
                    key={facturIndex}
                  >
                    <li className="text-sm font-bold pl-2">{facturyItem}</li>
                  </ul>
                )
              )} */}
            </div>
          </div>
          <div>
            {/* <Products
              products={item.products}
              price={item.products.prices}
              image={item.products.image}
              moq={item.products.moq}
              imageWidth={130}
              imageHeight={1}
            /> */}
          </div>
          <div className="w-1/3">
            {/* <Slider images={item.slider} imageWidth={464} imageHeight={384} /> */}
          </div>
        </div>
      </div>
    </>
  );
}
