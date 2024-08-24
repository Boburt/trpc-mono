import { Card, CardBody } from "@nextui-org/react";
import { Skeleton } from "@nextui-org/skeleton";

export default function ManufacturersListSkeleton() {
  return (
    <div className="space-y-4">
      {Array.from({ length: 25 }).map((_, index) => (
        <Card key={index} className="w-full">
          <CardBody className="flex flex-row p-4">
            <div className="w-1/4 pr-4">
              <Skeleton className="rounded-lg">
                <div className="h-[200px] rounded-lg bg-default-300"></div>
              </Skeleton>
            </div>
            <div className="w-3/4 flex flex-col">
              <div className="flex items-center justify-between">
                <Skeleton className="rounded-lg">
                  <div className="h-3 rounded-lg bg-default-300"></div>
                </Skeleton>
              </div>
              <Skeleton className="rounded-lg mt-1">
                <div className="h-3 rounded-lg bg-default-300"></div>
              </Skeleton>
              <div className="mt-2 flex items-center">
                <Skeleton className="rounded-lg">
                  <div className="h-3 rounded-lg bg-default-300"></div>
                </Skeleton>
                <Skeleton className="rounded-lg">
                  <div className="h-3 rounded-lg bg-default-300"></div>
                </Skeleton>
              </div>
              <Skeleton className="rounded-lg">
                <div className="h-3 rounded-lg bg-default-300"></div>
              </Skeleton>
              {/* <div className="mt-2 flex justify-between items-end">
                  <div>
                    <p className="text-sm font-semibold">Main Products:</p>
                    <div className="flex flex-wrap mt-1">
                      {manufacturer.capacity.slice(0, 3).map((cap, index) => (
                        <Chip
                          key={index}
                          className="mr-1 mb-1"
                          size="sm"
                          variant="flat"
                        >
                          {cap}
                        </Chip>
                      ))}
                    </div>
                  </div>
                  <Button color="primary">Contact Supplier</Button>
                </div> */}
            </div>
          </CardBody>
        </Card>
      ))}
    </div>
  );
}
