import { paginatedZodObj } from "@backend/lib/z_objects";
import { z } from "zod";

export const seoLinkByLinkSchema = z.object({
  link: z.string(),
});
