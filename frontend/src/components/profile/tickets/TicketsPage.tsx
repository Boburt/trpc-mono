import Providers from "@frontend/src/store/provider";
import { CreateNewRequest } from "./CreateNewRequest";
import { RequestsListTable } from "./RequestsListTable";

export const TicketsPage = () => {
  return (
    <Providers>
      <div className="flex">
        <CreateNewRequest />
      </div>
      <div className="mt-2">
        <RequestsListTable />
      </div>
    </Providers>
  );
};
