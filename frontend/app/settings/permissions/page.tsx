"use client";
import { trpc } from "@frontend/utils/trpc";
import { DataTable } from "./data-table";
import { permissionsColumns } from "./columns";
import { Button } from "@frontend/components/ui/button";
import { Plus } from "lucide-react";
import PermissionsForm from "./form";
import { usePermissions_ListQuery } from "@frontend/store/api";
import { usePermissionsQuery } from "@frontend/store/permission";

export default function PermissionListPage() {
  const { data, isLoading } = usePermissionsQuery({
    take: 10,
  });
  return (
    <div>
      <div className="flex justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Permissions List</h2>
        <div className="flex items-center space-x-2">
          <PermissionsForm>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Create Permission
            </Button>
          </PermissionsForm>
        </div>
      </div>
      <div className="py-10">
        <DataTable
          columns={permissionsColumns}
          data={data ?? []}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}
