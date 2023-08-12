import type { Prisma } from '@prisma/client';
import { z } from 'zod';

export const rolesCreateManyInputSchema: z.ZodType<Prisma.rolesCreateManyInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  code: z.string().optional().nullable(),
  active: z.boolean().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  created_by: z.string().optional().nullable(),
  updated_by: z.string().optional().nullable()
}).strict();

export default rolesCreateManyInputSchema;
