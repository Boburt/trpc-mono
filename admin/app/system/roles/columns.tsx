"use client";
import { ColumnDef } from "@tanstack/react-table";
import { Edit2Icon } from "lucide-react";
import { Button } from "@components/ui/button";
import { RouterOutputs } from "@admin/utils/trpc";
import { Switch } from "@components/ui/switch";
import DeleteAction from "./delete-action";
import RolesFormSheet from "@admin/components/forms/roles/sheet";
import CanAccess from "@admin/components/can-access";

export const rolesColumns: ColumnDef<
  RouterOutputs["roles"]["list"]["items"][0]
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
    accessorKey: "name",
    header: "Заголовок",
  },
  {
    accessorKey: "code",
    header: "Код",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const record = row.original;

      return (
        <div className="flex items-center space-x-2">
          <RolesFormSheet recordId={record.id}>
            <Button variant="outline" size="sm">
              <Edit2Icon className="h-4 w-4" />
            </Button>
          </RolesFormSheet>
          <CanAccess permission="roles.delete">
            <DeleteAction recordId={record.id} />
          </CanAccess>
        </div>
      );
    },
  },
];
