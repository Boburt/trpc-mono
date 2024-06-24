import { apiClient } from "@frontend_next/lib/eden";
import { notFound } from "next/navigation";
import { Image as NextImage } from "@nextui-org/image";
import Image from "next/image";
import { Button } from "@nextui-org/button";
import { Heart } from "lucide-react";
import { Tab, Tabs } from "@nextui-org/tabs";
import ProductDetailTabs from "./product-tabs";

export default async function ProductPage({
  params: { id },
}: {
  params: {
    id: string;
  };
}) {
  const { data, status } = await apiClient.api.products
    .public({
      id,
    })
    .get();

  if (status != 200) {
    return notFound();
  }
  return (
    <div>
      <div className="relative flex flex-col gap-4 lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
        <div className="relative h-full w-full flex-none">
          <NextImage
            as={Image}
            isZoomed
            width={500}
            height={500}
            alt={data.name}
            src={`${process.env.NEXT_PUBLIC_API_URL}${data.images?.[0]?.path}`}
            className="max-w-fit min-w-full object-cover"
          />
        </div>
        <div className="flex flex-col">
          <h1 className="text-2xl font-bold tracking-tight">{data.name}</h1>
          <p className="text-xl font-medium tracking-tight my-2">
            {Intl.NumberFormat("ru-RU", {
              style: "currency",
              currency: "UZS",
              minimumFractionDigits: 0,
              maximumFractionDigits: 2,
            }).format(+data.price!)}
          </p>
          <div className="line-clamp-3 text-medium text-default-700 mt-4">
            {data.description}
          </div>
          <div className="flex items-center gap-x-2 my-4">
            <Button color="primary" className="w-full font-bold">
              Оставить заявку
            </Button>
            <Button color="default" isIconOnly>
              <Heart className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
      <ProductDetailTabs product={data} />
    </div>
  );
}
