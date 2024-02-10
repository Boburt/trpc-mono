"use client";

import * as React from "react";
import { createRoot } from "react-dom/client";
import { useForm } from "@tanstack/react-form";
import type { FieldApi } from "@tanstack/react-form";
import { Switch } from "@nextui-org/switch";
import { Drawer } from "vaul";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@nextui-org/button";
import { MinusIcon, PlusIcon } from "lucide-react";
import { apiClient } from "@frontend/src/utils/eden";
import { toast } from "sonner";
import { useCookieState } from "use-cookie-state";
import { useState } from "react";
import { ProductAddingForm } from "./product_adding_form";

export function ProductDrawer() {
  const [open, setOpen] = useState(false);

  return (
    <Drawer.Root direction="right" open={open} onOpenChange={setOpen}>
      <Drawer.Trigger asChild>
        <Button color="primary" endContent={<PlusIcon />}>
          Добавить новый продукт
        </Button>
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/40 " />
        <Drawer.Content className="bg-white flex flex-col rounded-t-[10px] h-full w-[400px] mt-24 fixed bottom-0 right-0">
          <div className="p-4 bg-white flex-1 h-full">
            <div className="max-w-md mx-auto">
              <Drawer.Title className="font-medium mb-4 mt-16">
                Добавить новый продукт
              </Drawer.Title>
            </div>
            <ProductAddingForm setOpen={setOpen} />
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
