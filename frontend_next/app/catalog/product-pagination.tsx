"use client";
import { apiClient } from "@frontend_next/lib/eden";
import { Pagination } from "@nextui-org/pagination";
import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useMemo } from "react";

export default function ProductPagination({
  page,
  page_size,
  category,
}: {
  page?: string;
  page_size?: string;
  category?: string;
}) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const { data } = useSuspenseQuery({
    queryKey: ["products_pagination", category],
    queryFn: async () => {
      const { data } = await apiClient.api.products.public.count.get({
        query: {
          category,
        },
      });
      return data;
    },
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });

  const changePage = (page: number) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("page", page.toString());
    replace(`${pathname}?${newSearchParams.toString()}`);
  };

  const pages = useMemo(() => {
    if (!data) {
      return 0;
    }
    let pageSize = page_size ? +page_size : 25;
    return Math.ceil(+data / pageSize);
  }, [data, page_size]);

  return (
    <div className="flex justify-around items-center mt-6 w-full">
      <Pagination
        total={pages}
        color="primary"
        page={page ? +page : 1}
        onChange={changePage}
      />
    </div>
  );
}
