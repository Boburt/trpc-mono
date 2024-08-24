"use client";
import { ColumnDef } from "@tanstack/react-table";
import { Edit2Icon } from "lucide-react";
import { Button } from "@components/ui/button";
import { RouterOutputs } from "@admin/utils/trpc";
import { Switch } from "@components/ui/switch";
import DeleteAction from "./delete-action";
import PermissionsFormSheet from "@admin/components/forms/permissions/sheet";
import {
  sp_ticket_categories,
  sp_ticket_statuses,
} from "@backend/../drizzle/schema";
import { InferSelectModel } from "drizzle-orm";
import SpTicketCategoriesFormSheet from "@admin/components/forms/sp_ticket_categories/sheet";

export const spTicketStatusesColumns: ColumnDef<
  InferSelectModel<typeof sp_ticket_statuses>
>[] = [
  {
    accessorKey: "name",
    header: "Название",
  },
  {
    accessorKey: "code",
    header: "Код",
  },
  {
    accessorKey: "sort",
    header: "Сортировка",
  },
  {
    accessorKey: "color",
    cell: ({ row }) => {
      const record = row.original;

      return (
        <div
          className="w-5 h-5 rounded-full"
          style={record.color ? { backgroundColor: record.color } : {}}
        />
      );
    },
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
