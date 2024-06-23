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
        <SelectItem key={25} value={"25"}>
          25
        </SelectItem>
        <SelectItem key={50} value={"50"}>
          50
        </SelectItem>
        <SelectItem key={100} value={"100"}>
          100
        </SelectItem>
      </Select>
    </header>
  );
}
