"use client";
import { Card, CardFooter, Image } from "@nextui-org/react";
import dayjs from "dayjs";
import Link from "next/link";
import { usePathname } from "next/navigation";
import "dayjs/locale/ru";
import { useMemo } from "react";
import { cn } from "@frontend_next/lib/utils";
import { promises as fs } from "fs";
dayjs.locale("ru");

export default async function News() {
  const pathname = usePathname();

  const file = await fs.readFile("./frontend_next/store/news.json", "utf8");
  const data = JSON.parse(file);

  const news = useMemo(() => {
    // if pathname == / get only first 4 news

    if (pathname === "/") {
      return data.slice(0, 4);
    }
    // if pathname == /news get all news
    return data;
  }, [pathname]);

  return (
    <div className=" md:px-6 px-4 py-12">
      <div
        className={cn(
          "flex items-end justify-between",
          { "mb-20": pathname !== "/" },
          { "mb-8": pathname === "/" }
        )}
      >
        <h1
          className={cn(
            "lg:text-4xl text-3xl font-bold text-gray-800 dark:text-white "
          )}
        >
          Новости
        </h1>
        {pathname !== "/news" && (
          <div className="flex justify-end uppercase hover:text-default-600 dark:hover:text-default-500">
            <Link href="/news">Все новости</Link>
          </div>
        )}
      </div>
      <div className="grid grid-cols-4 gap-4">
        {news.map((item: any, index: any) => {
          return (
            <Card className="h-[300px]" isBlurred key={index} isFooterBlurred>
              <CardFooter className="absolute bottom-0 z-10 pb-0 pt-2 px-4 flex-col items-start bg-black/60 border-b-1 border-default-600 dark:border-default-100">
                <Link
                  className="uppercase font-bold text-default-100 dark:text-default-900"
                  href={`/news/${item.id}`}
                >
                  {item.title}
                </Link>
                <div className="flex justify-end pb-4 w-full">
                  <small className="text-default-200 text-end dark:text-default-800">
                    {dayjs(item.created_at).format("DD MMM YYYY")}
                  </small>
                </div>
              </CardFooter>
              <Image
                removeWrapper
                alt="Card background"
                width="100%"
                className="z-0 w-full h-full object-cover"
                src={item.image}
                // height={50}
              />
            </Card>
          );
        })}
      </div>
    </div>
  );
}
