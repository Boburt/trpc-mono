import { apiClient } from "@frontend_next/lib/eden";

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
