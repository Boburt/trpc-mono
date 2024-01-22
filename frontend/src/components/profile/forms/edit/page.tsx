import Providers from "@frontend/src/store/provider";
import { ProfileFormsEditForm } from "./edit_form";
import { forms } from "backend/drizzle/schema";
import { InferSelectModel } from "drizzle-orm";

export const ProfileFormsListPage = ({
  formItem,
}: {
  formItem: InferSelectModel<typeof forms>;
}) => {
  return (
    <Providers>
      <ProfileFormsEditForm formItem={formItem} />
    </Providers>
  );
};
