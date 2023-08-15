import { z } from "zod";

export const createManyPermissionsForOneUser = z.object({
  user_id: z.string(),
  permissions_ids: z.array(z.string()),
});
