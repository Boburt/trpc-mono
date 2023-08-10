import { trpc } from "@frontend/utils/trpc";
import { DataTable } from "./data-table";
import { permissionsColumns } from "./columns";
import { Button } from "@frontend/components/ui/button";
import { Plus } from "lucide-react";
import PermissionsForm from "./form";

export default async function PermissionListPage() {
  const data = await trpc.permissions.list.query({
    take: 10,
  });
  console.log(data);
  return (
    <div>
      <div className="flex justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Permission List</h2>
        <div className="flex items-center space-x-2">
          <PermissionsForm>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Create Permission
            </Button>
          </PermissionsForm>
        </div>
      </div>
      <div className="py-10">
        <DataTable columns={permissionsColumns} data={data} />
      </div>
    </div>
  );
}
