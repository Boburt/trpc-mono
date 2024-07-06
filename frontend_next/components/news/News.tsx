"use client";
import { Card, CardFooter, Image } from "@nextui-org/react";
import dayjs from "dayjs";
import Link from "next/link";
import { usePathname } from "next/navigation";
import "dayjs/locale/ru";
import { useMemo } from "react";
import { cn } from "@frontend_next/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@frontend_next/lib/eden";
dayjs.locale("ru");

export default function News() {
  const pathname = usePathname();

  const { data: news } = useQuery({
    queryKey: ["news", pathname],
    queryFn: async () => {
      const { data } = await apiClient.api.news.public.get({
        query: {
          limit: pathname != "/news" ? "5" : "20",
        },
      });
      return data;
    },
  });

  return (
    <div
      className={cn("py-12", {
        "container mx-auto": pathname != "/news",
      })}
    >
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
      <div className="grid md:grid-cols-5 gap-4 grid-cols-2">
        {news &&
          news.map((item: any, index: any) => {
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
