import { Button } from "@components/ui/button";
import { Plus } from "lucide-react";
import { ManufacturersPropertiesDataTable } from "./manufacturers-properties-table";
import { manufacturersPropertiesColumns } from "./manufacturers-properties-columns";
import ManufacturersPropertiesForm from "./manufacturers-properties-form";

export default function ManufacturersProperties() {
  return (
    <div>
      <div className="flex justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Properties List</h2>
        <div className="flex items-center space-x-2">
          <ManufacturersPropertiesForm>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Add Property
            </Button>
          </ManufacturersPropertiesForm>
        </div>
      </div>
      <div className="py-10">
        <ManufacturersPropertiesDataTable
          columns={manufacturersPropertiesColumns}
        />
      </div>
    </div>
  );
}
