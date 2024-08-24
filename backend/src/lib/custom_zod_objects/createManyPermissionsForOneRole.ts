import { z } from "zod";

export const createManyPermissionsForOneRole = z.object({
  role_id: z.string(),
  permissions_ids: z.array(z.string()),
});
