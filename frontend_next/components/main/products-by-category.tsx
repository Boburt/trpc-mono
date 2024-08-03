"use client";
import { ProductCounter } from "@frontend_next/app/catalog/product-counter";
import { ProductMakeRequest } from "@frontend_next/app/catalog/product-make-request";
import { apiClient } from "@frontend_next/lib/eden";
import { Card, CardHeader, CardFooter } from "@nextui-org/react";
import { useSuspenseQuery } from "@tanstack/react-query";
import Link from "next/link";
import NextImage from "next/image";
import { Image } from "@nextui-org/image";
import { ProductPrice } from "../products/product-price";

export default function ProductsListByCategory({
  category,
}: {
  category: string;
}) {
  const { data } = useSuspenseQuery({
    queryKey: ["products_list_by_category", category],
    queryFn: async () => {
      const { data } = await apiClient.api.products.public.data.get({
        query: {
          limit: 5,
          page: 1,
          category: category,
        },
      });
      return data;
    },
  });
  if (data && Array.isArray(data.products) && data.products.length > 0) {
    return (
      <div className="py-12 container mx-auto">
        <div className="flex items-end justify-between mb-8">
          <h1 className="lg:text-4xl text-3xl font-bold text-gray-800 dark:text-white">
            {/* @ts-ignore */}
            {data.categoryData.name}
          </h1>
          <div className="flex justify-end uppercase hover:text-default-600 dark:hover:text-default-500">
            {/* @ts-ignore */}
            <Link href={`/catalog/${data.categoryData.code}`}>Перейти</Link>
          </div>
        </div>
        <div className="my-auto grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {data.products.map((product) => (
            <Card key={product.id} isFooterBlurred>
              <Link href={`/product/${product.id}`} className="p-4">
                <Image
                  as={NextImage}
                  isZoomed
                  radius="lg"
                  width={300}
                  height={200}
                  className="w-full object-cover h-[200px]"
                  src={`${process.env.NEXT_PUBLIC_API_URL}${product.images?.[0]?.path}`}
                  alt={product.name}
                />
              </Link>
              <CardHeader className="py-2 px-4 flex-col items-start flex-1">
                <div className="flex flex-col gap-3 flex-1">
                  <Link
                    className="text-medium font-medium text-default-700 leading-tight"
                    href={`/product/${product.id}`}
                  >
                    {product.name}
                  </Link>
                  <div className="text-small text-default-600 flex-1 hidden md:block">
                    {product.description}
                  </div>
                  <ProductPrice
                    {...product}
                    className="text-small font-medium text-default-700 align-bottom"
                  />
                </div>
              </CardHeader>
              <CardFooter className="bg-content4/30 border-t-1 border-zinc-100/50 justify-around flex items-center flex-col">
                <ProductCounter productId={product.id} />
                <ProductMakeRequest productId={product.id} />
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    );
  } else {
    return <></>;
  }
}
