"use client";
import { apiClient } from "@frontend_next/lib/eden";
import { Button } from "@nextui-org/button";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Image } from "@nextui-org/react";

export default function NewsDetailPage({
  params: { id },
}: {
  params: {
    id: string;
  };
}) {
  const router = useRouter();
  const { data: news } = useQuery({
    queryKey: ["news"],
    queryFn: async () => {
      const { data } = await apiClient.api.news.public.get({
        query: {
          limit: "20",
        },
      });
      return data;
    },
  });

  if (!news) {
    return <></>;
  }
  const newsItem = news.find((item: any) => item.id == id);
  console.log(newsItem);
  return (
    <div>
      <div
        className="flex w-full cursor-pointer items-center"
        onClick={() => router.back()}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M19 12H5"
            stroke="white"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M12 19L5 12L12 5"
            stroke="white"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        <div>Back</div>
      </div>

      <div className="flex justify-end pb-4 w-full">
        <small className="text-default-200 dark:text-default-800 ">
          <div>{dayjs(newsItem.created_at).format("DD MMM YYYY")}</div>
        </small>
      </div>
      <div className="text-lg font-bold">{newsItem.title}</div>
      <Image
        removeWrapper
        alt="Card background"
        width="100%"
        className="z-0 w-full h-full object-cover my-4"
        src={newsItem.image}
      />
      <div>{newsItem.description}</div>
    </div>
  );
}
