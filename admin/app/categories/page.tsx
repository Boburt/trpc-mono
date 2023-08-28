"use client";
import { DataTable } from "./data-table";
import { categoriesColumns } from "./columns";
import { Button } from "@components/ui/button";
import { Plus } from "lucide-react";
import CategoriesFormSheet from "@admin/components/forms/categories/sheet";

export default function CategoriesListPage() {
  return (
    <div>
      <div className="flex justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Categories List</h2>
        <div className="flex items-center space-x-2">
          <CategoriesFormSheet>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Create Category
            </Button>
          </CategoriesFormSheet>
        </div>
      </div>
      <div className="py-10">
        <DataTable columns={categoriesColumns} />
      </div>
    </div>
  );
}
