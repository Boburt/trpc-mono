import Providers from "@frontend/src/store/provider";
import { CreateNewRequest } from "./CreateNewRequest";
import { RequestsListTable } from "./RequestsListTable";
import KanbanBoard from "./kanban/KanbanBoard";

export const TicketsPage = ({ permissions }: { permissions: string[] }) => {
  return (
    <Providers>
      {!permissions.includes("sp_tickets.edit") && (
        <>
          <div className="flex">
            <CreateNewRequest />
          </div>
          <div className="mt-2">
            <RequestsListTable />
          </div>
        </>
      )}
      {permissions.includes("sp_tickets.edit") && (
        <div className="mt-2">
          <KanbanBoard />
        </div>
      )}
    </Providers>
  );
};
