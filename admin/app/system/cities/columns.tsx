"use client";
import { ColumnDef } from "@tanstack/react-table";
import { Edit2Icon } from "lucide-react";
import { Button } from "@components/ui/button";
import { RouterOutputs } from "@admin/utils/trpc";
import DeleteAction from "./delete-action";
import CanAccess from "@admin/components/can-access";
import CitiesFormSheet from "@admin/components/forms/cities/sheet";

export const citiesColumns: ColumnDef<
  RouterOutputs["cities"]["list"]["items"][0]
>[] = [
  {
    accessorKey: "slug",
    header: "Код",
  },
  {
    accessorKey: "name",
    header: "Название",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const record = row.original;

      return (
        <div className="flex items-center space-x-2">
          <CanAccess permission="cities.edit">
            <CitiesFormSheet recordId={record.id}>
              <Button variant="outline" size="sm">
                <Edit2Icon className="h-4 w-4" />
              </Button>
            </CitiesFormSheet>
          </CanAccess>
          <CanAccess permission="cities.delete">
            <DeleteAction recordId={record.id} />
          </CanAccess>
        </div>
      );
    },
  },
];
