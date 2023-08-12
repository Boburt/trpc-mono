import type { Prisma } from '@prisma/client';
import { z } from 'zod';

export const permissionsCreateManyUsers_permissions_created_byTousersInputSchema: z.ZodType<Prisma.permissionsCreateManyUsers_permissions_created_byTousersInput> = z.object({
  id: z.string().optional(),
  slug: z.string(),
  description: z.string(),
  active: z.boolean().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  updated_by: z.string().optional().nullable()
}).strict();

export default permissionsCreateManyUsers_permissions_created_byTousersInputSchema;
