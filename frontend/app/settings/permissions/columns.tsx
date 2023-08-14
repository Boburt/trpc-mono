"use client";
import { ColumnDef } from "@tanstack/react-table";
import { Edit2Icon } from "lucide-react";
import { z } from "zod";
import { Button } from "@components/ui/button";
import PermissionsForm from "./form";
import { permissions, permissionsSchema } from "@backend/lib/zod";
import { RouterInputs, RouterOutputs } from "@frontend/utils/trpc";

export const permissionsColumns: ColumnDef<
  RouterOutputs["permissions"]["list"][0]
>[] = [
  {
    accessorKey: "active",
    header: "Активен",
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
          <PermissionsForm recordId={record.id}>
            <Button variant="outline" size="icon">
              <Edit2Icon className="h-4 w-4" />
            </Button>
          </PermissionsForm>
        </div>
      );
    },
  },
];
