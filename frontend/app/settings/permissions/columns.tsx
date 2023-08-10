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
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Действия</DropdownMenuLabel>
              <DropdownMenuItem asChild>
                <PermissionsForm recordId={record.id}>
                  <Button
                    className="flex items-center space-x-1"
                    variant="ghost"
                  >
                    <Edit2Icon className="mr-2 h-4 w-4" /> Edit Permission
                  </Button>
                </PermissionsForm>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];
