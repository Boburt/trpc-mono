import { usersSchema } from "@backend/lib/zod";
import { z } from "zod";

export const loginInput = z.object({
  login: z.string(),
  password: z.string(),
});

export const typeLoginOutput = z.object({
  data: usersSchema,
  refreshToken: z.string(),
  accessToken: z.string(),
  rights: z.array(z.string()),
});
