import type { Prisma } from '@prisma/client';
import { z } from 'zod';

export const roles_permissionsUncheckedCreateWithoutUsers_roles_permissions_updated_byTousersInputSchema: z.ZodType<Prisma.roles_permissionsUncheckedCreateWithoutUsers_roles_permissions_updated_byTousersInput> = z.object({
  role_id: z.string(),
  permission_id: z.string(),
  created_by: z.string().optional().nullable()
}).strict();

export default roles_permissionsUncheckedCreateWithoutUsers_roles_permissions_updated_byTousersInputSchema;
