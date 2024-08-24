"use client";
import { ColumnDef } from "@tanstack/react-table";
import { Edit2Icon } from "lucide-react";
import { Button } from "@components/ui/button";
import { RouterOutputs } from "@admin/utils/trpc";
import DeleteAction from "./delete-action";
import ImageSizesFormSheet from "@admin/components/forms/image_sizes/sheet";
import CanAccess from "@admin/components/can-access";
import { image_sizes } from "@backend/../drizzle/schema";
import { InferSelectModel } from "drizzle-orm";

export const imageSizesColumns: ColumnDef<
  InferSelectModel<typeof image_sizes>
>[] = [
  {
    accessorKey: "code",
    header: "Код",
  },
  {
    accessorKey: "width",
    header: "Ширина",
  },
  {
    accessorKey: "height",
    header: "Высота",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const record = row.original;

      return (
        <div className="flex items-center space-x-2">
          <CanAccess permission="image_sizes.edit">
            <ImageSizesFormSheet recordId={record.id}>
              <Button variant="outline" size="sm">
                <Edit2Icon className="h-4 w-4" />
              </Button>
            </ImageSizesFormSheet>
          </CanAccess>
          <CanAccess permission="image_sizes.delete">
            <DeleteAction recordId={record.id} />
          </CanAccess>
        </div>
      );
    },
  },
];
