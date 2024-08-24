import { ProductCounter } from "@frontend_next/app/catalog/product-counter";
import { ProductMakeRequest } from "@frontend_next/app/catalog/product-make-request";
import { apiClient } from "@frontend_next/lib/eden";
import { Card, CardHeader, CardFooter, Skeleton } from "@nextui-org/react";
import { useSuspenseQuery } from "@tanstack/react-query";
import Link from "next/link";
import NextImage from "next/image";
import { Image } from "@nextui-org/image";

export default function ProductsListByCategorySkeleton() {
  return (
    <div className="py-12 container mx-auto">
      <div className="flex items-end justify-between mb-8">
        <Skeleton>
          <div className="lg:text-4xl text-3xl font-bold text-gray-800 dark:text-white"></div>
        </Skeleton>
      </div>
      <div className="my-auto grid grid-cols-1 gap-5 py-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
        {Array.from({ length: 5 }).map((_, index) => (
          <Card key={index} isFooterBlurred>
            <Skeleton className="rounded-lg">
              <div className="h-[200px] rounded-lg bg-default-300"></div>
            </Skeleton>
            <CardHeader className="pb-0 pt-2 flex-col items-start">
              <div className="flex flex-col gap-3 w-full">
                <Skeleton className="rounded-lg">
                  <div className="h-3 rounded-lg bg-default-300"></div>
                </Skeleton>
                <Skeleton className="rounded-lg">
                  <div className="h-10 rounded-lg bg-default-300"></div>
                </Skeleton>

                <Skeleton className="rounded-lg">
                  <div className="h-3 rounded-lg bg-default-300"></div>
                </Skeleton>
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
}
