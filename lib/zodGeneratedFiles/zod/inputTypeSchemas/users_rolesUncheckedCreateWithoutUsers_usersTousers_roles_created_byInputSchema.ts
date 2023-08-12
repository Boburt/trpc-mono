import type { Prisma } from '@prisma/client';
import { z } from 'zod';

export const users_rolesUncheckedCreateWithoutUsers_usersTousers_roles_created_byInputSchema: z.ZodType<Prisma.users_rolesUncheckedCreateWithoutUsers_usersTousers_roles_created_byInput> = z.object({
  user_id: z.string(),
  role_id: z.string(),
  updated_by: z.string().optional().nullable()
}).strict();

export default users_rolesUncheckedCreateWithoutUsers_usersTousers_roles_created_byInputSchema;
