import { z } from "zod";

export const createManyRolesForUserSchema = z.object({
  user_id: z.string(),
  roles_ids: z.array(z.string()),
});
