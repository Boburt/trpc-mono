"use client";
import { ColumnDef } from "@tanstack/react-table";
import { Edit2Icon } from "lucide-react";
import { Button } from "@components/ui/button";
import { RouterOutputs } from "@admin/utils/trpc";
import LangsFormSheet from "@admin/components/forms/langs/sheet";
import DeleteAction from "./delete-action";
import { Switch } from "@components/ui/switch";
import CanAccess from "@admin/components/can-access";

export const langsColumns: ColumnDef<
  RouterOutputs["langs"]["list"]["items"][0]
>[] = [
  {
    accessorKey: "is_default",
    header: "По умолчанию",
    cell: ({ row }) => {
      const record = row.original;

      return (
        <div className="flex items-center space-x-2">
          <Switch checked={record.is_default} disabled />
        </div>
      );
    },
  },
  {
    accessorKey: "code",
    header: "Код",
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
          <CanAccess permission="langs.edit">
            <LangsFormSheet recordId={record.id}>
              <Button variant="outline" size="sm">
                <Edit2Icon className="h-4 w-4" />
              </Button>
            </LangsFormSheet>
          </CanAccess>
          <CanAccess permission="langs.delete">
            <DeleteAction recordId={record.id} />
          </CanAccess>
        </div>
      );
    },
  },
];
