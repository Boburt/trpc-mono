"use client";
import { DataTable } from "./data-table";
import { rolesColumns } from "./columns";
import { Button } from "@components/ui/button";
import { Plus } from "lucide-react";
import RolePermissions from "./role-permissions";
import RolesFormSheet from "@admin/components/forms/roles/sheet";
import CanAccess from "@admin/components/can-access";

export default function RolesListPage() {
  return (
    <div className="flex space-x-5">
      <div className="w-6/12">
        <div className="flex justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Roles List</h2>
          <div className="flex items-center space-x-2">
            <CanAccess permission="roles.add">
              <RolesFormSheet>
                <Button>
                  <Plus className="mr-2 h-4 w-4" /> Create Role
                </Button>
              </RolesFormSheet>
            </CanAccess>
          </div>
        </div>
        <div className="py-10">
          <DataTable columns={rolesColumns} />
        </div>
      </div>
      <div className="w-6/12">
        <RolePermissions />
      </div>
    </div>
  );
}
