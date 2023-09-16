"use client";
import { ColumnDef } from "@tanstack/react-table";
import { RouterOutputs } from "@admin/utils/trpc";

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
