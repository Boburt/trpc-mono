import { GetServerSideProps, Metadata, ResolvingMetadata } from "next";
import { apiClient } from "@frontend_next/lib/eden";
import { notFound } from "next/navigation";
import { Image as NextImage } from "@nextui-org/image";
import Image from "next/image";
import { Button } from "@nextui-org/button";
import { Heart } from "lucide-react";
import { Tab, Tabs } from "@nextui-org/tabs";
import ProductDetailTabs from "./product-tabs";
import { Suspense } from "react";
import ProductRelated from "./product-related";
import { ProductMakeRequest } from "@frontend_next/app/catalog/product-make-request";
import { ProductCounter } from "@frontend_next/app/catalog/product-counter";
import { Product } from "schema-dts";
import { JsonLd } from "react-schemaorg";
import Head from "next/head";

type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const id = params.id;
  const { data, status } = await apiClient.api.products
    .public({
      id,
    })
    .get();

  if (data && "id" in data) {
    const imageUrl = data.images?.[0]?.path
      ? `${process.env.NEXT_PUBLIC_API_URL}${data.images?.[0]?.path}`
      : "";
    const productUrl = `${process.env.NEXT_PUBLIC_API_URL}/products/${params.id}`;
    return {
      title: data.name,
      description: data.description,
      alternates: {
        canonical: productUrl,
      },
      openGraph: {
        title: data.name,
        description: data.description ?? data.name,
        url: productUrl,
        siteName: "Портал легкой промышленности",
        images: [
          {
            url: imageUrl,
            alt: data.name,
          },
        ],
        locale: "ru_RU",
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        site: "Портал легкой промышленности",
        title: data.name,
        description: data.description ?? data.name,
        images: imageUrl,
      },
      other: {
        "og:product:price:amount": data.price!.toString(),
        "og:product:price:currency": "UZS",
        "og:product:availability":
          data.stock_quantity! > 0 ? "instock" : "outofstock",
        "og:product:condition": "new", // Adjust if you have used products
        "og:product:retailer_item_id": data.id,
        "og:product:image": imageUrl,
      },
    };
  } else {
    return {
      title: "Product not found",
    };
  }
}

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
    <>
      {data && "id" in data && (
        <JsonLd<Product>
          item={{
            "@context": "https://schema.org",
            "@type": "Product",
            name: data.name,
            image: `${process.env.NEXT_PUBLIC_API_URL}${data.images?.[0]?.path}`,
            description: data.description ?? data.name,
            sku: data.id,
            offers: {
              "@type": "Offer",
              price: data.price!,
              priceCurrency: "UZS",
            },
          }}
        />
      )}
      <div>
        {data && "id" in data && (
          <>
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
                <h1 className="text-2xl font-bold tracking-tight">
                  {data.name}
                </h1>
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
                <div className="flex items-end gap-x-2 my-4">
                  <ProductCounter productId={id} />
                  <ProductMakeRequest
                    productId={id}
                    className="w-full font-bold"
                  />
                  <Button color="default" isIconOnly>
                    <Heart className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
            <ProductDetailTabs product={data} />
            <Suspense>
              <ProductRelated id={data.id} />
            </Suspense>
          </>
        )}
      </div>
    </>
  );
}
