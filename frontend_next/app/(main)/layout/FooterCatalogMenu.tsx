"use client";
import { apiClient } from "@frontend_next/lib/eden";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

export default function FooterCatalogMenu() {
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
  if (isLoading) {
    return <div></div>;
  } else if (data && Array.isArray(data) && data.length > 0) {
    return (
      <div>
        <h4 className="text-xs font-semibold text-gray-900 uppercase dark:text-gray-100">
          Каталог
        </h4>

        <div className="mt-3 grid space-y-3 text-sm">
          {data.map((category) => (
            <p key={category.id}>
              <Link
                className="inline-flex gap-x-2 text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                href={`/catalog/${category.code}`}
              >
                {category.name}
              </Link>
            </p>
          ))}
        </div>
      </div>
    );
  } else {
    return <div></div>;
  }
}
