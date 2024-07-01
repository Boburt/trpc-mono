import { apiClient } from "@frontend_next/lib/eden";
import { memberships } from "backend/drizzle/schema";

export const createProfileQuery = async ({
  newProfile,
  token,
}: {
  newProfile: Record<string, any>;
  token: string;
}) => {
  return await apiClient.api.profiles.post(
    {
      data: newProfile,
      fields: ["id"],
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

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
