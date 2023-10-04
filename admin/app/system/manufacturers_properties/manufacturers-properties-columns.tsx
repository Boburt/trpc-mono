"use client";
import { ColumnDef } from "@tanstack/react-table";
import { RouterOutputs } from "@admin/utils/trpc";
import { Button } from "@admin/components/ui/button";
import { Edit2Icon } from "lucide-react";
import ManufacturersPropertiesForm from "./manufacturers-properties-form";

export const manufacturersPropertiesColumns: ColumnDef<
  RouterOutputs["manufacturersProperties"]["list"]["items"][0]
>[] = [
  {
    accessorKey: "name",
    cell: ({ row }) => {
      const record = row.original;
      return record.name;
    },
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

export const linkedRolesPermissionsColumns: ColumnDef<
  RouterOutputs["permissions"]["list"]["items"][0]
>[] = [
  {
    accessorKey: "name",
    cell: ({ row }) => {
      const record = row.original;
      return record.description;
    },
    header: "Заголовок",
  },
];
