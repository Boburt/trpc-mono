"use client";
import { DataTable } from "./data-table";
import { langsColumns } from "./columns";
import { Button } from "@components/ui/button";
import { Plus } from "lucide-react";
import LangsFormSheet from "@admin/components/forms/langs/sheet";

export default function LangsListPage() {
  return (
    <div>
      <div className="flex justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Langs List</h2>
        <div className="flex items-center space-x-2">
          <LangsFormSheet>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Create Lang
            </Button>
          </LangsFormSheet>
        </div>
      </div>
      <div className="py-10">
        <DataTable columns={langsColumns} />
      </div>
    </div>
  );
}
