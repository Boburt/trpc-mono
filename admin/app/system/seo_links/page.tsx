"use client";
import { DataTable } from "./data-table";
import { seoLinksColumns } from "./columns";
import { Button } from "@components/ui/button";
import { Plus } from "lucide-react";
import PermissionsFormSheet from "@admin/components/forms/permissions/sheet";
import CanAccess from "@admin/components/can-access";
import SeoLinksFormSheet from "@admin/components/forms/seo_links/sheet";

export default function SeoLinksListPage() {
  return (
    <div>
      <div className="flex justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Seo Links List</h2>
        <div className="flex items-center space-x-2">
          <CanAccess permission={"seo_links.add"}>
            <SeoLinksFormSheet>
              <Button>
                <Plus className="mr-2 h-4 w-4" /> Create Seo Link
              </Button>
            </SeoLinksFormSheet>
          </CanAccess>
        </div>
      </div>
      <div className="py-10">
        <DataTable columns={seoLinksColumns} />
      </div>
    </div>
  );
}
