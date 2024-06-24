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
            lorem ipsum dolor sit amet, consectetur adipiscing elit, seddo
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure.
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
}
