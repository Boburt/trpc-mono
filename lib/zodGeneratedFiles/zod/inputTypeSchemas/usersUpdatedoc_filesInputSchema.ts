import type { Prisma } from '@prisma/client';
import { z } from 'zod';

export const usersUpdatedoc_filesInputSchema: z.ZodType<Prisma.usersUpdatedoc_filesInput> = z.object({
  set: z.string().array().optional(),
  push: z.union([ z.string(),z.string().array() ]).optional(),
}).strict();

export default usersUpdatedoc_filesInputSchema;
