import Providers from "@frontend/src/store/provider";
import { $searchParams } from "@frontend/src/store/search_params";
import { PublicManufacturer } from "@backend/modules/manufacturers/dto/list.dto";
import { Card, CardBody } from "@nextui-org/card";
import { ManufacturersFilter } from "./filter/ManufacturersFilter";
import { $facets, $values } from "@frontend/src/store/manufacturers_filter";

import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
} from "@frontend/src/components/ui/drawer";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@frontend/src/components/ui/dialog";
import { Button } from "@nextui-org/button";
import { useState } from "react";
import { Filter } from "lucide-react";
import { ScrollShadow } from "@nextui-org/scroll-shadow";
import ManufacturersListClient from "./ManufacturersListClient";

export const ManufacturersPage = ({
  categorySlug,
  initialData,
  searchParams,
  pathname,
}: {
  categorySlug?: string;
  initialData: {
    items: PublicManufacturer[];
  };
  searchParams?: string;
  pathname?: string;
}) => {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <div className="flex gap-x-6">
      <Card className="hidden h-full max-w-[288px] overflow-scroll sm:flex">
        <CardBody>
          <ManufacturersFilter />
        </CardBody>
      </Card>
      <div className="w-full flex-1 flex-col">
        <Card className="flex sm:hidden">
          <Drawer open={open} onOpenChange={setOpen}>
            <DrawerTrigger asChild>
              <Button
                color="default"
                variant="bordered"
                startContent={<Filter />}
              >
                Фильтр
              </Button>
            </DrawerTrigger>
            <DrawerContent className="px-3">
              <ScrollShadow className="h-[90dvh]">
                {open && <ManufacturersFilter setOpen={setOpen} />}
              </ScrollShadow>
              {/* <DialogHeader>
                <DialogTitle>Добавить обращение</DialogTitle>
              </DialogHeader> */}
            </DrawerContent>
          </Drawer>
        </Card>
        <ManufacturersListClient
          categorySlug={categorySlug}
          initialData={initialData}
          pathname={pathname}
        />
      </div>
    </div>
  );
};

export const ManufacturersPageProvider = ({
  categorySlug,
  initialData,
  searchParams,
  pathname,
  facets,
  filterValues,
}: {
  categorySlug?: string;
  initialData: {
    items: PublicManufacturer[];
  };
  searchParams?: string;
  pathname?: string;
  facets: any; // RouterOutputs["manufacturers"]["getFacetFilter"];
  filterValues: {
    [key: string]: string[];
  };
}) => {
  if (searchParams) {
    $searchParams.set(searchParams);
  } else {
    $searchParams.set("");
  }

  $facets.set(facets);
  $values.set(filterValues);
  return (
    <Providers>
      <ManufacturersPage
        categorySlug={categorySlug}
        initialData={initialData}
        pathname={pathname}
        searchParams={searchParams}
      />
    </Providers>
  );
};
