import type { Prisma } from '@prisma/client';
import { z } from 'zod';

export const users_rolesUncheckedCreateWithoutUsers_usersTousers_roles_user_idInputSchema: z.ZodType<Prisma.users_rolesUncheckedCreateWithoutUsers_usersTousers_roles_user_idInput> = z.object({
  role_id: z.string(),
  created_by: z.string().optional().nullable(),
  updated_by: z.string().optional().nullable()
}).strict();

export default users_rolesUncheckedCreateWithoutUsers_usersTousers_roles_user_idInputSchema;
