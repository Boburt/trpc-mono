"use client";
import { ColumnDef } from "@tanstack/react-table";
import { Edit2Icon } from "lucide-react";
import { Button } from "@components/ui/button";
import { RouterOutputs } from "@admin/utils/trpc";
import { Switch } from "@components/ui/switch";
import DeleteAction from "./delete-action";
import RolesFormSheet from "@admin/components/forms/roles/sheet";
import CanAccess from "@admin/components/can-access";
import { manufacturers_properties_categories } from "@backend/../drizzle/schema";
import { InferSelectModel } from "drizzle-orm";

export const rolesColumns: ColumnDef<
  InferSelectModel<typeof manufacturers_properties_categories>
>[] = [
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
          <CanAccess permission="manufacturers_properties_categories.edit">
            <RolesFormSheet recordId={record.id}>
              <Button variant="outline" size="sm">
                <Edit2Icon className="h-4 w-4" />
              </Button>
            </RolesFormSheet>
          </CanAccess>
          <CanAccess permission="manufacturers_properties_categories.delete">
            <DeleteAction recordId={record.id} />
          </CanAccess>
        </div>
      );
    },
  },
];
