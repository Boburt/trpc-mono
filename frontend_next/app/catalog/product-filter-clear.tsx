"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useMemo } from "react";

export default function ProductFilterClear() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { push } = useRouter();

  const clearFilters = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("price");
    params.delete("properties");
    params.delete("category");
    push(`${pathname}?${params.toString()}`);
  };

  const hasFilter = useMemo(() => {
    let res = false;
    if (searchParams.get("price")) {
      res = true;
    }
    if (searchParams.get("properties")) {
      res = true;
    }
    return res;
  }, [searchParams]);

  if (!hasFilter) {
    return <></>;
  }

  return (
    <div className="">
      <button
        className="text-gray-500 hover:text-gray-700 text-sm"
        onClick={clearFilters}
      >
        Очистить
      </button>
    </div>
  );
}
