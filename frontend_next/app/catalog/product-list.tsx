"use client";
import { apiClient } from "@frontend_next/lib/eden";
import { Card, CardFooter, CardHeader, Pagination } from "@nextui-org/react";
import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import NextImage from "next/image";
import { Image } from "@nextui-org/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { CircleAlert } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ProductCounter } from "./product-counter";
import { ProductMakeRequest } from "./product-make-request";
import { ProductPrice } from "@frontend_next/components/products/product-price";

export default function ProductList({
  page,
  page_size,
  category,
  properties,
  query,
}: {
  page?: string;
  page_size?: string;
  category?: string;
  properties?: string;
  query?: string;
}) {
  const pageSize = page_size ? +page_size : 24;
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { push } = useRouter();

  const queryParams = useMemo(() => {
    let res: {
      limit: number;
      page: number;
      fields: string;
      category?: string;
      properties?: string;
      query?: string;
    } = {
      limit: pageSize,
      page: page ? +page : 1,
      fields:
        "id,name,description,price,stock_quantity,manufacturers.name,images",
    };

    if (category) {
      res.category = category;
    }

    if (properties) {
      res.properties = properties;
    }

    if (query) {
      res.query = query;
    }

    return res;
  }, [page, pageSize, category, properties, query]);

  const changePage = (page: number) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("page", page.toString());
    push(`${pathname}?${newSearchParams.toString()}`);
  };

  const { data } = useSuspenseQuery({
    queryKey: ["products", page, pageSize, category, properties, query],
    queryFn: async () => {
      const { data } = await apiClient.api.products.public.data.get({
        query: queryParams,
      });
      return data;
    },
  });

  if (data && Array.isArray(data.products) && data.products.length > 0) {
    return (
      <div>
        <div className="my-auto grid  gap-2 py-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
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
        <div className="flex justify-around items-center mt-6 w-full">
          <Pagination
            total={data.totalPages}
            color="primary"
            page={page ? +page : 1}
            onChange={changePage}
          />
        </div>
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
