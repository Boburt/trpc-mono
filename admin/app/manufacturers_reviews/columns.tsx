"use client";
import { ColumnDef } from "@tanstack/react-table";
import { RouterOutputs } from "@admin/utils/trpc";
import { Switch } from "@components/ui/switch";
import DeleteAction from "./delete-action";
import useCanAccess from "@admin/lib/use-can-access";
import { useManufacturersReviewsUpdate } from "@admin/store/apis/manufacturers_reviews";

export const manufacturersReviewsColumns: ColumnDef<
  RouterOutputs["manufacturersReviews"]["list"]["items"][0]
>[] = [
  {
    accessorKey: "active",
    header: "Активен",
    cell: function Cell({ row }) {
      const isCanEdit = useCanAccess("manufacturers_reviews.edit");
      const { mutateAsync: updateManufacturersReviews } =
        useManufacturersReviewsUpdate({});
      const record = row.original;
      return (
        <div className="flex items-center space-x-2">
          <Switch
            checked={record.active}
            onCheckedChange={() => {
              updateManufacturersReviews({
                where: {
                  id: record.id,
                },
                data: {
                  active: !record.active,
                },
              });
            }}
            disabled={!isCanEdit}
            aria-readonly={!isCanEdit}
          />
        </div>
      );
    },
  },
  {
    accessorKey: "rating",
    header: "Рейтинг",
  },
  {
    accessorKey: "comment",
    header: "Комментарий",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const record = row.original;

      return (
        <div className="flex items-center space-x-2">
          <DeleteAction recordId={record.id} />
        </div>
      );
    },
  },
];
