import { Card, CardBody, CardHeader } from "@nextui-org/react";
import { ProductFilterCategories } from "./product-filter-categories";
import { Suspense } from "react";
import ProductFilterFacets from "./product-filter-facets";
import { ScrollArea } from "@frontend_next/components/ui/scroll-area";
import ProductFilterClear from "./product-filter-clear";
import { cn } from "@frontend_next/lib/utils";

export default function ProductFilter({
  category,
  properties,
  hideTitle = false,
  className,
  query,
}: {
  category?: string;
  properties?: string;
  hideTitle?: boolean;
  className?: string;
  query?: string;
}) {
  return (
    <Card
      className={cn(
        "h-full max-h-fit w-full max-w-sm rounded-medium p-6 bg-content2 shadow-none",
        className
      )}
    >
      {!hideTitle && (
        <CardHeader className="text-large font-medium text-foreground justify-between">
          <div>Фильтр</div>
          <ProductFilterClear className="text-gray-500 hover:text-gray-700 text-sm" />
        </CardHeader>
      )}

      {/* <ScrollArea className="h-[calc(80vh-12rem)] mt-4"> */}
      <ProductFilterCategories />
      <Suspense key={category}>
        <ProductFilterFacets
          category={category}
          properties={properties}
          query={query}
        />
      </Suspense>
      {/* </ScrollArea> */}
    </Card>
  );
}
