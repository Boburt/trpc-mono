import { Card, CardHeader } from "@nextui-org/react";

export default function ProductFilter() {
  return (
    <Card className="h-full max-h-fit w-full max-w-sm rounded-medium p-6 bg-default-50">
      <CardHeader className="text-large font-medium text-foreground">
        Фильтр
      </CardHeader>
    </Card>
  );
}
