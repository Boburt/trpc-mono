import { z } from "zod";

export const loginInput = z.object({
  login: z.string(),
  password: z.string(),
});
