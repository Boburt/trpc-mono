"use client";
import { ColumnDef } from "@tanstack/react-table";
import { Edit2Icon } from "lucide-react";
import { Button } from "@components/ui/button";
import { RouterOutputs } from "@admin/utils/trpc";
import { Switch } from "@components/ui/switch";
import DeleteAction from "./delete-action";
import PermissionsFormSheet from "@admin/components/forms/permissions/sheet";
import CanAccess from "@admin/components/can-access";
import SeoLinksFormSheet from "@admin/components/forms/seo_links/sheet";

export const seoLinksColumns: ColumnDef<
  RouterOutputs["seoLinks"]["list"]["items"][0]
>[] = [
  {
    accessorKey: "link",
    header: "Ссылка",
  },
  {
    accessorKey: "title",
    header: "Заголовок",
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
          <CanAccess permission={"seo_links.edit"}>
            <SeoLinksFormSheet recordId={record.id}>
              <Button variant="outline" size="sm">
                <Edit2Icon className="h-4 w-4" />
              </Button>
            </SeoLinksFormSheet>
          </CanAccess>
          <CanAccess permission={"seo_links.delete"}>
            <DeleteAction recordId={record.id} />
          </CanAccess>
        </div>
      );
    },
  },
];
