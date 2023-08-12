import type { Prisma } from '@prisma/client';
import { z } from 'zod';

export const roles_permissionsUncheckedCreateInputSchema: z.ZodType<Prisma.roles_permissionsUncheckedCreateInput> = z.object({
  role_id: z.string(),
  permission_id: z.string(),
  created_by: z.string().optional().nullable(),
  updated_by: z.string().optional().nullable()
}).strict();

export default roles_permissionsUncheckedCreateInputSchema;
