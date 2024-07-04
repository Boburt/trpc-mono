"use client";

import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@frontend_next/components/ui/drawer";
import { Button } from "@nextui-org/button";
import { Select, SelectItem } from "@nextui-org/select";
import { ListFilter, Menu } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import ProductFilter from "./product-filter";
import { ScrollArea } from "@frontend_next/components/ui/scroll-area";
import ProductFilterClear from "./product-filter-clear";
import ProductSearchInput from "./product-search-input";
import { RequestModeSwitcher } from "./product-request-mode";

export default function ProductToolbar({
  page_size,
  category,
  properties,
}: {
  page_size: string;
  category?: string;
  properties?: string;
}) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const openDrawer = () => setIsDrawerOpen(true);
  const closeDrawer = () => setIsDrawerOpen(false);

  return (
    <header className="relative z-20 flex flex-wrap gap-2 rounded-medium bg-default-50 px-4 pb-3 pt-2 md:pt-3 justify-between items-end">
      <div className="flex items-center gap-2">
        <Button
          className="lg:hidden"
          variant="bordered"
          onClick={openDrawer}
          startContent={<ListFilter size={24} />}
        >
          Фильтры
        </Button>
        <ProductSearchInput />
        <RequestModeSwitcher />
      </div>
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
      <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
        <DrawerContent className="mx-auto w-full bg-content2">
          <DrawerHeader>
            <DrawerTitle>Фильтры</DrawerTitle>
          </DrawerHeader>
          <div className="p-4">
            {isDrawerOpen && (
              <ScrollArea className="h-[calc(100vh-10rem)]">
                <ProductFilter
                  category={category}
                  properties={properties}
                  hideTitle={true}
                  className="max-w-md mx-auto"
                />
              </ScrollArea>
            )}
          </div>
          <DrawerFooter className="pt-2 flex flex-col space-y-3">
            <Button color="primary" onPress={closeDrawer} className="w-full">
              Показать
            </Button>
            <ProductFilterClear
              variant="ghost"
              color="primary"
              className="w-full"
            />
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </header>
  );
}
