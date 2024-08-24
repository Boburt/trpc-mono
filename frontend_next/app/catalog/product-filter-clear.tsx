"use client";
import { Button } from "@nextui-org/button";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useMemo } from "react";

export default function ProductFilterClear({
  variant,
  className,
  color,
}: {
  className?: string;
  variant?:
    | "flat"
    | "shadow"
    | "bordered"
    | "solid"
    | "light"
    | "faded"
    | "ghost";
  color?:
    | "default"
    | "primary"
    | "secondary"
    | "success"
    | "warning"
    | "danger";
}) {
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
      <Button
        className={className}
        onClick={clearFilters}
        variant={variant || "light"}
        color={color}
      >
        Очистить
      </Button>
    </div>
  );
}
