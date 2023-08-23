"use client";
import { ColumnDef } from "@tanstack/react-table";
import { Edit2Icon } from "lucide-react";
import { Button } from "@components/ui/button";
import { RouterOutputs } from "@admin/utils/trpc";
import { Switch } from "@components/ui/switch";
import DeleteAction from "./delete-action";
import PermissionsFormSheet from "@admin/components/forms/permissions/sheet";

export const permissionsColumns: ColumnDef<
  RouterOutputs["permissions"]["list"]["items"][0]
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
    accessorKey: "slug",
    header: "Код",
  },
  {
    accessorKey: "description",
    header: "Описание",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const record = row.original;

      return (
        <div className="flex items-center space-x-2">
          <PermissionsFormSheet recordId={record.id}>
            <Button variant="outline" size="sm">
              <Edit2Icon className="h-4 w-4" />
            </Button>
          </PermissionsFormSheet>
          <DeleteAction recordId={record.id} />
        </div>
      );
    },
  },
];
