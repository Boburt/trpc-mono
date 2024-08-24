"use client";
import { ColumnDef } from "@tanstack/react-table";
import { RouterOutputs } from "@admin/utils/trpc";
import { Button } from "@admin/components/ui/button";
import { Edit2Icon } from "lucide-react";
import ManufacturersPropertiesForm from "./manufacturers-properties-form";
import { manufacturers_properties } from "@backend/../drizzle/schema";
import { InferSelectModel } from "drizzle-orm";

export const manufacturersPropertiesColumns: ColumnDef<
  InferSelectModel<typeof manufacturers_properties>
>[] = [
  {
    accessorKey: "name",
    header: "Заголовок",
  },
  {
    accessorKey: "code",
    header: "Код",
  },
  {
    accessorKey: "actions",
    header: "Действия",
    cell: ({ row }) => {
      const record = row.original;
      return (
        <div className="flex items-center space-x-2">
          <ManufacturersPropertiesForm recordId={record.id}>
            <Button variant="outline" size="sm">
              <Edit2Icon className="h-4 w-4" />
            </Button>
          </ManufacturersPropertiesForm>
        </div>
      );
    },
  },
];
