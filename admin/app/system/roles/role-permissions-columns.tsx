"use client";
import { ColumnDef } from "@tanstack/react-table";
import { RouterOutputs } from "@admin/utils/trpc";
import { permissions, roles_permissions } from "backend/drizzle/schema";
import { InferSelectModel } from "drizzle-orm";
import { RolesPermissionsRelation } from "@backend/modules/roles_permissions/dto/roles_permissions.dto";

export const rolesPermissionsColumns: ColumnDef<RolesPermissionsRelation>[] = [
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
  InferSelectModel<typeof permissions>
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
