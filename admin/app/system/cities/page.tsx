"use client";
import { DataTable } from "./data-table";
import { citiesColumns } from "./columns";
import { Button } from "@components/ui/button";
import { Plus } from "lucide-react";
import CanAccess from "@admin/components/can-access";
import CitiesFormSheet from "@admin/components/forms/cities/sheet";

export default function CitiesListPage() {
  return (
    <div>
      <div className="flex justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Cities List</h2>
        <div className="flex items-center space-x-2">
          <CanAccess permission="cities.add">
            <CitiesFormSheet>
              <Button>
                <Plus className="mr-2 h-4 w-4" /> Create City
              </Button>
            </CitiesFormSheet>
          </CanAccess>
        </div>
      </div>
      <div className="py-10">
        <DataTable columns={citiesColumns} />
      </div>
    </div>
  );
}
