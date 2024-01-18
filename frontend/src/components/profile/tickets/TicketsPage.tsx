import Providers from "@frontend/src/store/provider";
import { CreateNewRequest } from "./CreateNewRequest";
import { RequestsListTable } from "./RequestsListTable";
import KanbanBoard from "./kanban/KanbanBoard";

export const TicketsPage = () => {
  return (
    <Providers>
      <div className="flex">
        <CreateNewRequest />
      </div>
      <div className="mt-2">
        <RequestsListTable />
      </div>
      <div className="mt-2">
        <KanbanBoard />
      </div>
    </Providers>
  );
};
