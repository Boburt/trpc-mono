import type { Prisma } from '@prisma/client';
import { z } from 'zod';

export const usersCreatedoc_filesInputSchema: z.ZodType<Prisma.usersCreatedoc_filesInput> = z.object({
  set: z.string().array()
}).strict();

export default usersCreatedoc_filesInputSchema;
