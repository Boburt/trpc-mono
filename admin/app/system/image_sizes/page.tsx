"use client";
import { DataTable } from "./data-table";
import { imageSizesColumns } from "./columns";
import { Button } from "@components/ui/button";
import { Plus } from "lucide-react";
import ImageSizesFormSheet from "@admin/components/forms/image_sizes/sheet";
import CanAccess from "@admin/components/can-access";

export default function LangsListPage() {
  return (
    <div>
      <div className="flex justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Image Sizes List</h2>
        <div className="flex items-center space-x-2">
          <CanAccess permission="image_sizes.add">
            <ImageSizesFormSheet>
              <Button>
                <Plus className="mr-2 h-4 w-4" /> Create Image Size
              </Button>
            </ImageSizesFormSheet>
          </CanAccess>
        </div>
      </div>
      <div className="py-10">
        <DataTable columns={imageSizesColumns} />
      </div>
    </div>
  );
}
