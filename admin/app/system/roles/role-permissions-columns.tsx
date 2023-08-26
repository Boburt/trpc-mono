"use client";
import { ColumnDef } from "@tanstack/react-table";
import { RouterOutputs } from "@admin/utils/trpc";

export const rolesPermissionsColumns: ColumnDef<
  RouterOutputs["rolesPermissions"]["list"][0]
>[] = [
  {
    accessorKey: "name",
    cell: ({ row }) => {
      const record = row.original;
      return record.permissions.description;
    },
    header: "Заголовок",
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
