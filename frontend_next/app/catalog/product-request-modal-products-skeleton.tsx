import { ScrollArea } from "@frontend_next/components/ui/scroll-area";
import { Card, CardBody, ScrollShadow } from "@nextui-org/react";
import { Skeleton } from "@nextui-org/skeleton";

export default function ProductRequestModalProductsSkeleton({
  itemsCount,
}: {
  itemsCount: number;
}) {
  return (
    <div>
      <div className="pb-2 font-bold text-2xl text-content4-foreground uppercase">
        Выбрано
      </div>
      <ScrollShadow className="h-[420px]">
        <div className="grid grid-cols-1 gap-3">
          {[...Array(itemsCount)].map((_, index) => (
            <Card key={index}>
              <CardBody className="grid grid-cols-6 gap-2">
                <div className="col-span-2">
                  <Skeleton className="rounded-md">
                    <div className="h-24"></div>
                  </Skeleton>
                </div>
                <div className="col-span-4 space-y-3">
                  <div className="text-medium font-medium text-default-700 leading-tight">
                    <Skeleton className="rounded-md">
                      <div className="h-6"></div>
                    </Skeleton>
                  </div>
                  <div className="text-small text-default-600 flex-1">
                    <Skeleton className="rounded-md">
                      <div className="h-6"></div>
                    </Skeleton>
                  </div>
                  <div className="text-small font-medium text-default-700">
                    <Skeleton className="rounded-md">
                      <div className="h-6"></div>
                    </Skeleton>
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
