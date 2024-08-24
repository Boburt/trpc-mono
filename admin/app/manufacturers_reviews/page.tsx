"use client";
import { DataTable } from "./data-table";
import { manufacturersReviewsColumns } from "./columns";
import { Button } from "@components/ui/button";
import { Plus } from "lucide-react";
import PermissionsFormSheet from "@admin/components/forms/permissions/sheet";

export default function PermissionListPage() {
  return (
    <div>
      <div className="flex justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Reviews List</h2>
      </div>
      <div className="py-10">
        <DataTable columns={manufacturersReviewsColumns} />
      </div>
    </div>
  );
}
