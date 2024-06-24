"use client";

import { Tab, Tabs } from "@nextui-org/tabs";

export default function ProductDetailTabs({ product }: { product: any }) {
  return (
    <div className="flex w-full flex-col mt-6">
      <Tabs
        aria-label="Options"
        color="primary"
        variant="underlined"
        classNames={{
          tabList:
            "gap-6 w-full relative rounded-none p-0 border-b border-divider",
          cursor: "w-full bg-default-900",
          tab: "max-w-fit px-0 h-12",
          tabContent:
            "group-data-[selected=true]:text-default-900 text-default-600",
        }}
      >
        <Tab key="specs" title="Спецификации">
          <div className="w-full h-full">
            <div className="grid grid-cols-1 gap-4 mt-4">
              <div className="flex flex-col">
                <div className="text-lg font-medium text-default-900">
                  Версия
                </div>
                <div className="text-sm text-default-600">1.0</div>
              </div>
              <div className="flex flex-col">
                <div className="text-lg font-medium text-default-900">
                  Версия
                </div>
                <div className="text-sm text-primary-600">1.0</div>
              </div>
            </div>
          </div>
        </Tab>
        <Tab key="reviews" title="Отзывы" />
        <Tab key="docs" title="Документация" />
      </Tabs>
    </div>
  );
}
