"use client";
import React from "react";
import { DataTable } from "./data-table";
import { spTicketCategoriesColumns } from "./columns";
import SpTicketCategoriesFormSheet from "@admin/components/forms/sp_ticket_categories/sheet";
import { Button } from "@admin/components/ui/button";
import { Plus } from "lucide-react";

const SpTicketsCategoriesPage = () => {
  return (
    <div>
      <div className="flex justify-between">
        <h2 className="text-3xl font-bold tracking-tight">
          Категории обращений
        </h2>
        <div className="flex items-center space-x-2">
          <SpTicketCategoriesFormSheet>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Create Ticket Category
            </Button>
          </SpTicketCategoriesFormSheet>
        </div>
      </div>
      <div className="py-10">
        <DataTable columns={spTicketCategoriesColumns} />
      </div>
    </div>
  );
};

export default SpTicketsCategoriesPage;
