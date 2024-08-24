"use client";
import { ColumnDef } from "@tanstack/react-table";
import { Edit2Icon } from "lucide-react";
import { Button } from "@components/ui/button";
import { RouterOutputs } from "@admin/utils/trpc";
import { Switch } from "@components/ui/switch";
import DeleteAction from "./delete-action";
import PermissionsFormSheet from "@admin/components/forms/permissions/sheet";
import { sp_ticket_categories } from "@backend/../drizzle/schema";
import { InferSelectModel } from "drizzle-orm";
import SpTicketCategoriesFormSheet from "@admin/components/forms/sp_ticket_categories/sheet";

export const spTicketCategoriesColumns: ColumnDef<
  InferSelectModel<typeof sp_ticket_categories>
>[] = [
  {
    accessorKey: "name",
    header: "Название",
  },
  {
    accessorKey: "description",
    header: "Описание",
  },
  {
    accessorKey: "sort",
    header: "Сортировка",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const record = row.original;

      return (
        <div className="flex items-center space-x-2">
          <SpTicketCategoriesFormSheet recordId={record.id}>
            <Button variant="outline" size="sm">
              <Edit2Icon className="h-4 w-4" />
            </Button>
          </SpTicketCategoriesFormSheet>
          <DeleteAction recordId={record.id} />
        </div>
      );
    },
  },
];
