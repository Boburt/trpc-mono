import { Card, CardBody, CardHeader } from "@nextui-org/react";
import { ProductFilterCategories } from "./product-filter-categories";

export default function ProductFilter() {
  return (
    <Card className="h-full max-h-fit w-full max-w-sm rounded-medium p-6 bg-content2 shadow-none ">
      <CardHeader className="text-large font-medium text-foreground">
        Фильтр
      </CardHeader>
      <ProductFilterCategories />
    </Card>
  );
}
