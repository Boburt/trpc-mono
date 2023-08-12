import type { Prisma } from '@prisma/client';
import { z } from 'zod';

export const users_permissionsUser_idPermission_idCompoundUniqueInputSchema: z.ZodType<Prisma.users_permissionsUser_idPermission_idCompoundUniqueInput> = z.object({
  user_id: z.string(),
  permission_id: z.string()
}).strict();

export default users_permissionsUser_idPermission_idCompoundUniqueInputSchema;
