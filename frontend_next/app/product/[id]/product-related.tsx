"use client";
import { apiClient } from "@frontend_next/lib/eden";
import { Card, CardHeader } from "@nextui-org/react";
import { useSuspenseQuery } from "@tanstack/react-query";
import NextImage from "next/image";
import { Image } from "@nextui-org/image";
import Link from "next/link";

export default function ProductRelated({ id }: { id: string }) {
  const { data } = useSuspenseQuery({
    queryKey: ["product_related", id],
    queryFn: async () => {
      const { data } = await apiClient.api.products
        .public({
          id,
        })
        .related.get({
          query: {
            limit: "5",
            fields:
              "id,name,description,price,stock_quantity,manufacturers.name,images",
          },
        });
      return data;
    },
  });

  if (data && Array.isArray(data) && data.length > 0) {
    return (
      <div className="my-10">
        <h2 className="linked-heading text-3xl">Похожие</h2>
        <div className="my-auto grid grid-cols-1 gap-5 p-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5">
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
      </div>
    );
  } else {
    return <></>;
  }
}
