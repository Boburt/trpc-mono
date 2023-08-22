"use client";
import { trpc } from "@admin/utils/trpc";
import { DataTable } from "./data-table";
import { permissionsColumns } from "./columns";
import { Button } from "@components/ui/button";
import { Plus } from "lucide-react";
import PermissionsFormSheet from "@admin/components/forms/permissions/sheet";

export default function PermissionListPage() {
  return (
    <div>
      <div className="flex justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Permissions List</h2>
        <div className="flex items-center space-x-2">
          <PermissionsFormSheet>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Create Permission
            </Button>
          </PermissionsFormSheet>
        </div>
      </div>
      <div className="py-10">
        <DataTable columns={permissionsColumns} />
      </div>
    </div>
  );
}
