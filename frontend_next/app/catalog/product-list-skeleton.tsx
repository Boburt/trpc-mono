import { Card, CardHeader, Skeleton } from "@nextui-org/react";

export default function ProductListSkeleton() {
  return (
    <div className="my-auto grid grid-cols-1 gap-5 p-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
      {Array.from({ length: 25 }).map((_, index) => (
        <Card key={index} className="p-4">
          <Skeleton className="rounded-lg">
            <div className="h-[200px] rounded-lg bg-default-300"></div>
          </Skeleton>
          <CardHeader className="pb-0 pt-2 flex-col items-start">
            <div className="flex flex-col gap-3 w-full">
              <Skeleton className="rounded-lg">
                <div className="h-3 rounded-lg bg-default-300"></div>
              </Skeleton>
              <Skeleton className="rounded-lg">
                <div className="h-10 rounded-lg bg-default-300"></div>
              </Skeleton>

              <Skeleton className="rounded-lg">
                <div className="h-3 rounded-lg bg-default-300"></div>
              </Skeleton>
            </div>
          </CardHeader>
        </Card>
      ))}
    </div>
  );
}
