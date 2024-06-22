"use client";
import { useSession } from "next-auth/react";
import KanbanBoard from "./(kanban)/KanbanBoard";
import { CreateNewRequest } from "./create-new-request";
import { RequestsListTable } from "./request-list-table";

export default function ProfileRequests() {
  const { data: session } = useSession();
  if (!session) {
    return <></>;
  }

  //   if (session.user.permissions.includes("sp_tickets.edit")) {
  //     return (
  //       <div className="px-4 sm:px-6 lg:px-8">
  //         <KanbanBoard />
  //       </div>
  //     );
  //   } else {
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
  //   }
}
