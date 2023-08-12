import type { Prisma } from '@prisma/client';
import { z } from 'zod';

export const users_rolesUser_idRole_idCompoundUniqueInputSchema: z.ZodType<Prisma.users_rolesUser_idRole_idCompoundUniqueInput> = z.object({
  user_id: z.string(),
  role_id: z.string()
}).strict();

export default users_rolesUser_idRole_idCompoundUniqueInputSchema;
