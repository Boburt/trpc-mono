"use client";
import { DataTable } from "./data-table";
import { manufacturersColumns } from "./columns";
import { Button } from "@components/ui/button";
import { Plus } from "lucide-react";
import ManufacturersFormSheet from "@admin/components/forms/manufacturers/sheet";

export default function CategoriesListPage() {
  return (
    <div>
      <div className="flex justify-between">
        <h2 className="text-3xl font-bold tracking-tight">
          Manufacturers List
        </h2>
        <div className="flex items-center space-x-2">
          <ManufacturersFormSheet>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Create Manufacturer
            </Button>
          </ManufacturersFormSheet>
        </div>
      </div>
      <div className="py-10">
        <DataTable columns={manufacturersColumns} />
      </div>
    </div>
  );
}
