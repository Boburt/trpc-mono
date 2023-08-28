"use client";
import { ColumnDef } from "@tanstack/react-table";
import { Edit2Icon } from "lucide-react";
import { Button } from "@components/ui/button";
import { RouterOutputs } from "@admin/utils/trpc";
import { Switch } from "@components/ui/switch";
import DeleteAction from "./delete-action";
import CategoriesFormSheet from "@admin/components/forms/categories/sheet";
import CanAccess from "@admin/components/can-access";

export const categoriesColumns: ColumnDef<
  RouterOutputs["categories"]["list"]["items"][0]
>[] = [
  {
    accessorKey: "active",
    header: "Активен",
    cell: ({ row }) => {
      const record = row.original;

      return (
        <div className="flex items-center space-x-2">
          <Switch checked={record.active} disabled />
        </div>
      );
    },
  },
  {
    accessorKey: "code",
    header: "Символьный код",
  },
  {
    accessorKey: "name",
    header: "Заголовок",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const record = row.original;

      return (
        <div className="flex items-center space-x-2">
          <CanAccess permission="categories.edit">
            <CategoriesFormSheet recordId={record.id}>
              <Button variant="outline" size="sm">
                <Edit2Icon className="h-4 w-4" />
              </Button>
            </CategoriesFormSheet>
          </CanAccess>
          <CanAccess permission="categories.delete">
            <DeleteAction recordId={record.id} />
          </CanAccess>
        </div>
      );
    },
  },
];
