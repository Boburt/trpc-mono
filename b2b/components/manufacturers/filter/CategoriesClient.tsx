"use client";

import { RouterOutputs, trpc } from "@/utils/trpc";
import Link from "next/link";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import { useMemo } from "react";

export default function CategoriesFilterClient({
  initialData,
}: {
  initialData: RouterOutputs["categories"]["activeCachedCategories"];
}) {
  const pathname = usePathname();

  const { data: categories, isLoading } =
    trpc.categories.activeCachedCategories.useQuery(
      {
        take: 100,
      },
      {
        initialData,
        refetchOnMount: false,
        refetchOnReconnect: false,
      }
    );

  const isHome = useMemo(() => {
    return pathname === "/";
  }, [pathname]);

  return (
    <>
      <div className="sticky top-0 bg-white mx-auto rounded-md items-center p-4 mb-2">
        <div className="flex gap-4">
          <Link
            href="/"
            className={isHome ? "border-b-2 border-black" : "cursor-pointer"}
          >
            All
          </Link>
          {categories.map((category) => {
            const isActive = pathname === `/categories/${category.code}`;
            return (
              <Link
                href={`/categories/${category.code}`}
                className={clsx("border-b-2", {
                  "border-black": isActive,
                  "cursor-pointer": !isActive,
                  "border-transparent": !isActive,
                })}
                key={category.code}
              >
                {category.name}
              </Link>
            );
          })}
        </div>
        <div className="divider my-2"></div>
        <div className="flex items-center gap-2">
          <div className="rounded-md border px-2">Verified</div>
          <div className="rounded-md border px-2">Verified</div>
          <div className="rounded-md border px-2">Verified</div>
          <div className="rounded-md border px-2">Verified</div>
        </div>
      </div>
    </>
  );
}
