import type { Prisma } from '@prisma/client';
import { z } from 'zod';

export const rolesCreateManyUsers_roles_updated_byTousersInputSchema: z.ZodType<Prisma.rolesCreateManyUsers_roles_updated_byTousersInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  code: z.string().optional().nullable(),
  active: z.boolean().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  created_by: z.string().optional().nullable()
}).strict();

export default rolesCreateManyUsers_roles_updated_byTousersInputSchema;