import { Card, CardBody, CardHeader } from "@nextui-org/react";
import { ProductFilterCategories } from "./product-filter-categories";
import { Suspense } from "react";
import ProductFilterFacets from "./product-filter-facets";
import { ScrollArea } from "@frontend_next/components/ui/scroll-area";
import ProductFilterClear from "./product-filter-clear";

export default function ProductFilter({
  category,
  properties,
}: {
  category?: string;
  properties?: string;
}) {
  return (
    <Card className="h-full max-h-fit w-full max-w-sm rounded-medium p-6 bg-content2 shadow-none ">
      <CardHeader className="text-large font-medium text-foreground justify-between">
        <div>Фильтр</div>
        <ProductFilterClear />
      </CardHeader>

      {/* <ScrollArea className="h-[calc(80vh-12rem)] mt-4"> */}
      <ProductFilterCategories />
      <Suspense key={category}>
        <ProductFilterFacets category={category} properties={properties} />
      </Suspense>
      {/* </ScrollArea> */}
    </Card>
  );
}
