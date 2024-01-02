"use client";
import React from "react";
import { DataTable } from "./data-table";
import { spTicketStatusesColumns } from "./columns";
import SpTicketStatusesFormSheet from "@admin/components/forms/sp_ticket_statuses/sheet";
import { Plus } from "lucide-react";
import { Button } from "@admin/components/ui/button";

const SpTicketsStatusesPage = () => {
  return (
    <div>
      <div className="flex justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Статусы обращений</h2>
        <div className="flex items-center space-x-2">
          <SpTicketStatusesFormSheet>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Create Ticket Status
            </Button>
          </SpTicketStatusesFormSheet>
        </div>
      </div>
      <div className="py-10">
        <DataTable columns={spTicketStatusesColumns} />
      </div>
    </div>
  );
};

export default SpTicketsStatusesPage;
