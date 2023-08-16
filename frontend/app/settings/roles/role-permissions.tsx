import { Button } from "@frontend/components/ui/button";
import { Plus } from "lucide-react";

export default function RolePermissions() {
  return (
    <div>
      <div className="flex justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Permissions List</h2>
        <div className="flex items-center space-x-2">
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Add Permission
          </Button>
        </div>
      </div>
      <div className="py-10"></div>
    </div>
  );
}
