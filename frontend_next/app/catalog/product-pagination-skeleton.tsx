import { Skeleton } from "@nextui-org/skeleton";

export default function ProductPaginationSkeleton() {
  return (
    <div className="flex items-center justify-around w-full mt-6">
      <Skeleton className="rounded-lg h-9 w-44 ">
        <div className="h-9 w-44 rounded-lg bg-default-300"></div>
      </Skeleton>
    </div>
  );
}
