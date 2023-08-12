import type { Prisma } from '@prisma/client';
import { z } from 'zod';

export const roles_permissionsRole_idPermission_idCompoundUniqueInputSchema: z.ZodType<Prisma.roles_permissionsRole_idPermission_idCompoundUniqueInput> = z.object({
  role_id: z.string(),
  permission_id: z.string()
}).strict();

export default roles_permissionsRole_idPermission_idCompoundUniqueInputSchema;
