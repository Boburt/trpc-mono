"use client";

import { Drawer } from "vaul";
import { Button } from "@nextui-org/button";
import { PlusIcon } from "lucide-react";
import { useState } from "react";
import { ProductAddingForm } from "./product_adding_form";
import { Tabs, Tab } from "@nextui-org/tabs";

export function ProductDrawer({
  children,
  record_id,
}: {
  children: React.ReactNode;
  record_id?: string;
}) {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <Drawer.Root direction="right" open={open} onOpenChange={setOpen}>
      <Drawer.Trigger asChild>{children}</Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/40 " />
        <Drawer.Content className="bg-white flex flex-col rounded-t-[10px] h-full w-[400px] mt-24 fixed bottom-0 right-0">
          <div className="p-4 bg-white flex flex-col items-start h-full dark:bg-slate-800">
            <div className="max-w-md">
              <Drawer.Title className="text-lg font-semibold leading-none tracking-tight mb-4 mt-16 dark:text-white">
                {record_id ? "Редактировать продукт" : "Добавить новый продукт"}
              </Drawer.Title>
            </div>
            {open && (
              <ProductAddingForm setOpen={setOpen} recordId={record_id} />
            )}
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
