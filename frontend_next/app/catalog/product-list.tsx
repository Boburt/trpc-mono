"use client";
import { apiClient } from "@frontend_next/lib/eden";
import { Card, CardHeader, Pagination } from "@nextui-org/react";
import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import NextImage from "next/image";
import { Image } from "@nextui-org/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { CircleAlert } from "lucide-react";

export default function ProductList({
  page,
  page_size,
  category,
}: {
  page?: string;
  page_size?: string;
  category?: string;
}) {
  const pageSize = page_size ? +page_size : 24;
  const offset = page ? (+page - 1) * pageSize : 0;
  const { data } = useSuspenseQuery({
    queryKey: ["products", offset, pageSize, category],
    queryFn: async () => {
      const { data } = await apiClient.api.products.public.data.get({
        query: {
          limit: pageSize,
          offset,
          fields:
            "id,name,description,price,stock_quantity,manufacturers.name,images",
          // @ts-ignore
          category: category ?? null,
        },
      });
      return data;
    },
  });

  if (data && Array.isArray(data) && data.length > 0) {
    return (
      <div className="my-auto grid grid-cols-1 gap-5 py-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {data.map((product) => (
          <Card key={product.id} className="p-4">
            <Link href={`/product/${product.id}`}>
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
            <CardHeader className="pb-0 pt-2 flex-col items-start">
              <div className="flex flex-col gap-3">
                <Link
                  className="text-medium font-medium text-default-700 leading-tight"
                  href={`/product/${product.id}`}
                >
                  {product.name}
                </Link>
                <div className="text-small text-default-600">
                  {product.description}
                </div>
                <p className="text-small font-medium text-default-700">
                  {Intl.NumberFormat("ru-RU", {
                    style: "currency",
                    currency: "UZS",
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 2,
                  }).format(+product.price!)}
                </p>
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>
    );
  } else {
    // show there is no any products message
    return (
      <div className="text-center p-6 shadow-md rounded-lg my-auto bg-content2 dark:shadow-none mt-6">
        <div className="mb-4 flex items-center justify-center">
          <CircleAlert className="h-14 w-16 text-gray-400" />
        </div>
        <h2 className="text-xl font-semibold text-content2-foreground mb-2">
          Нет доступных товаров
        </h2>
        <p className="text-content4-foreground mb-4">
          Похоже, что в этой категории в данный момент нет товаров. Пожалуйста,
          проверьте позже или изучите другие категории.
        </p>
      </div>
    );
  }
}
