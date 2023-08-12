import type { Prisma } from '@prisma/client';
import { z } from 'zod';

export const roles_permissionsCreateManyRolesInputSchema: z.ZodType<Prisma.roles_permissionsCreateManyRolesInput> = z.object({
  permission_id: z.string(),
  created_by: z.string().optional().nullable(),
  updated_by: z.string().optional().nullable()
}).strict();

export default roles_permissionsCreateManyRolesInputSchema;
