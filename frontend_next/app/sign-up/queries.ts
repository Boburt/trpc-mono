import { apiClient } from "@frontend_next/lib/eden";
import { memberships } from "backend/drizzle/schema";

export const getProfileData = async (token: string) => {
  return await apiClient.api.profiles.get({
    query: {
      fields: "field_name,field_value",
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
