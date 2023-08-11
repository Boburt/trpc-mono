"use client";
import { ColumnDef } from "@tanstack/react-table";
import { permissionsModel } from "@lib/zod_objects/permissions/z_objects";
import { MoreHorizontal, Edit2Icon } from "lucide-react";
import { z } from "zod";
import { Button } from "@components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@components/ui/dropdown-menu";
import PermissionsForm from "./form";

export const permissionsColumns: ColumnDef<z.infer<typeof permissionsModel>>[] =
  [
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
