import { apiClient } from "@frontend_next/lib/eden";
import { Card, CardBody, ScrollShadow } from "@nextui-org/react";
import { useSuspenseQuery } from "@tanstack/react-query";
import NextImage from "next/image";
import { Image } from "@nextui-org/image";
import { ScrollArea } from "@frontend_next/components/ui/scroll-area";

export default function ProductRequestModalProducts({
  productIds,
}: {
  productIds: string[];
}) {
  const { data } = useSuspenseQuery({
    queryKey: ["request_selected_products", { ids: productIds }],
    queryFn: async () => {
      const { data } = await apiClient.api.products.public.by_ids.get({
        query: {
          ids: productIds.join(","),
        },
      });
      return data;
    },
  });

  return (
    <div>
      <div className="pb-2 font-bold text-2xl text-content4-foreground uppercase">
        Выбрано
      </div>
      <ScrollShadow className="md:h-[420px]">
        <div className="grid grid-cols-1 gap-3">
          {data &&
            data.map((product) => (
              <Card key={product.id}>
                <CardBody className="grid grid-cols-6 gap-2">
                  <div className="col-span-2">
                    <Image
                      as={NextImage}
                      isZoomed
                      radius="lg"
                      width={100}
                      height={50}
                      className="w-full object-cover h-[100px]"
                      src={`${process.env.NEXT_PUBLIC_API_URL}${product.images?.[0]?.path}`}
                      alt={product.name}
                    />
                  </div>
                  <div className="col-span-4">
                    <div className="text-medium font-medium text-default-700 leading-tight">
                      {product.name}
                    </div>
                    <div className="text-small text-default-600 flex-1">
                      {product.description}
                    </div>
                    <div className="text-small font-medium text-default-700">
                      {Intl.NumberFormat("ru-RU", {
                        style: "currency",
                        currency: "UZS",
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 2,
                      }).format(+product.price!)}
                    </div>
                  </div>
                </CardBody>
              </Card>
            ))}
        </div>
      </ScrollShadow>
    </div>
  );
}
