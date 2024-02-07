import { Key, useMemo } from "react";
import Like from "./Like";
import clsx from "clsx";
import { ChatNow, ChatNowProvider } from "../chat/ChatNow";
import { PublicManufacturer } from "@backend/modules/manufacturers/dto/list.dto";

export function ManufactureCard({ item }: { item: PublicManufacturer }) {
  const logoImage = useMemo(() => {
    return item.images?.find((image) => image.code === "logo");
  }, [item.images]);
  // const categories = useMemo(() => {
  //   return item.manufacturers_categories?.map((category) =>
  //     category.manufacturers_categories_categories.name.toLowerCase()
  //   );
  // }, [item.manufacturers_categories]);

  return (
    <div className="flex flex-col relative bg-white border shadow-sm rounded-xl dark:bg-slate-900 dark:border-gray-700 dark:shadow-slate-700/[.7]">
      <img
        className="w-full h-auto rounded-t-xl"
        src="https://images.unsplash.com/photo-1680868543815-b8666dba60f7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2532&q=80"
        alt="Image Description"
      />
      <div className="p-4 md:p-5 flex flex-col flex-1 content-around">
        <div className="flex-1 ">
          <h3 className="text-base font-bold text-gray-800 dark:text-white">
            {item.short_name}
          </h3>
          <p className="mt-1 text-gray-500 dark:text-gray-400 text-xs truncate ...">
            "lorem ipsum dolor sit amet, consectetur adipiscing elit, seddo
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure."
          </p>
        </div>
        <div className="tabular-nums">
          <div className="flex items-center">
            <svg
              className="w-4 h-4 text-yellow-300 mr-1"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 22 20"
            >
              <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
            </svg>
            <p className="ml-2 font-bold text-gray-900 dark:text-white">
              {item.rating}
            </p>
          </div>
        </div>
        <div className="my-2">
          <ChatNowProvider manufacturerId={item.id} />
        </div>
      </div>
    </div>
  );

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
                  itemProp="logo"
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
              <a
                className="link link-hover"
                href={`/manufacturer/item/${item.id}`}
              >
                <h3 className="card-title uppercase " itemProp="name">
                  {item.short_name}
                </h3>
              </a>
              <span>{item.name}</span>
              <div className="mt-2 flex space-x-2 hidden sm:block">
                {item.city_id && (
                  <>
                    <a
                      className="link link-hover"
                      href={`/?manufacturers_filter[city][]=${item.cities?.name}`}
                    >
                      {item.cities?.name}
                    </a>
                    <div className="divider divider-horizontal"></div>
                  </>
                )}
                {item.manufacturers_categories &&
                  item.manufacturers_categories.length > 0 && (
                    <>
                      <span>
                        Категории:{" "}
                        {item.manufacturers_categories.map((category, i) => (
                          <span key={category.id}>
                            {i > 0 && ", "}{" "}
                            <a
                              href={`/manufacturer/categories/${category.manufacturers_categories_categories.code}/`}
                              className="link link-hover"
                            >
                              {category.manufacturers_categories_categories.name.toLowerCase()}
                            </a>
                          </span>
                        ))}
                      </span>
                      <div className="divider divider-horizontal"></div>
                    </>
                  )}
              </div>
            </div>
          </div>
          <ChatNowProvider manufacturerId={item.id} />
          <Like />
        </div>
        <div className="card card-side flex justify-between">
          <div>
            <div className="card-body mt-4">
              <div className="font-light font-serif tracking-wide">
                Rating and reviews
              </div>
              <div className="tabular-nums">
                <div className="flex items-center">
                  <svg
                    className="w-4 h-4 text-yellow-300 mr-1"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 22 20"
                  >
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                  </svg>
                  <p className="ml-2 font-bold text-gray-900 dark:text-white">
                    {item.rating}
                  </p>
                </div>
              </div>
              {/* <p>
                <span>{item.reyting}</span>/5 ({item.reviews} reviews)
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
