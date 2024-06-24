"use client";

import { Select, SelectItem } from "@nextui-org/select";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function ProductToolbar({ page_size }: { page_size: string }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  return (
    <header className="relative z-20 flex gap-2 rounded-medium bg-default-50 px-4 pb-3 pt-2 md:pt-3 justify-end">
      <Select
        labelPlacement="outside"
        label="На странице: "
        className="max-w-xs"
        selectedKeys={[page_size]}
        onSelectionChange={(value) => {
          const newSearchParams = new URLSearchParams(searchParams);
          newSearchParams.set("page_size", [...value][0].toString());
          replace(`${pathname}?${newSearchParams.toString()}`);
        }}
      >
        <SelectItem key={24} value={"24"}>
          24
        </SelectItem>
        <SelectItem key={48} value={"48"}>
          48
        </SelectItem>
        <SelectItem key={96} value={"96"}>
          96
        </SelectItem>
      </Select>
    </header>
  );
}
