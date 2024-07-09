"use client";
import { useSession } from "next-auth/react";
import KanbanBoard from "./(kanban)/KanbanBoard";
import { CreateNewRequest } from "./create-new-request";
import { RequestsListTable } from "./request-list-table";
import { useCanAccess } from "@frontend_next/lib/can-access";

export default function ProfileRequests() {
  const { data: session } = useSession();
  const canEdit = useCanAccess("sp_tickets.edit");
  if (!session) {
    return <></>;
  }

  if (canEdit) {
    return (
      <div className="px-4 sm:px-6 lg:px-8">
        <KanbanBoard />
      </div>
    );
  } else {
    return (
      <>
        <div className="flex">
          <CreateNewRequest />
        </div>
        <div className="mt-2">
          <RequestsListTable />
        </div>
      </>
    );
  }
}
