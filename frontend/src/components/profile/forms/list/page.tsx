import Providers from "@frontend/src/store/provider";
import { ProfileFormsListTable } from "./list_table";

export const ProfileFormsListPage = () => {
  return (
    <Providers>
      <ProfileFormsListTable />
    </Providers>
  );
};
