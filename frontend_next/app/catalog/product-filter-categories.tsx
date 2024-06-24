"use client";
import { TreeCategoryDto } from "@backend/modules/categories/dtos/tree.dto";
import { apiClient } from "@frontend_next/lib/eden";
import { cn } from "@frontend_next/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { ChevronRightIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const ProductFilterCategories = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["catalog_categories"],
    queryFn: async () => {
      const { data } = await apiClient.api.categories.public.tree.get();
      return data;
    },
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });

  const pathname = usePathname();

  const renderMenu = (items: TreeCategoryDto[]) => {
    return (
      <ul className="grid gap-1">
        {items.map((item) => {
          const isActive = pathname === `/catalog/${item.code}`;
          return (
            <li key={item.id} className="group relative">
              <Link
                href={`/catalog/${item.code}`}
                className={cn(
                  "group flex items-center justify-between gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors focus:outline-none disabled:pointer-events-none disabled:opacity-50",
                  {
                    "bg-content3 text-accent-foreground": isActive,
                    "hover:bg-content3 hover:text-accent-foreground": !isActive,
                  }
                )}
                prefetch={false}
              >
                <span>{item.name}</span>
                {item.children.length > 0 && (
                  <ChevronRightIcon className="h-4 w-4 transition-transform group-hover:rotate-90" />
                )}
              </Link>
              {item.children.length > 0 && (
                <div className="pl-4 h-0 invisible group-hover:h-auto group-hover:visible">
                  {renderMenu(item.children)}
                </div>
              )}
            </li>
          );
        })}
      </ul>
    );
  };

  if (isLoading) {
    return <div></div>;
  } else if (data && Array.isArray(data) && data.length > 0) {
    return (
      <div className="text-foreground">
        <nav className="w-full">{renderMenu(data)}</nav>
      </div>
    );
  } else {
    return <div></div>;
  }
};
