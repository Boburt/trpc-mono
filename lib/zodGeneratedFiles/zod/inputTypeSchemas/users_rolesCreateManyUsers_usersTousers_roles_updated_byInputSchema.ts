import type { Prisma } from '@prisma/client';
import { z } from 'zod';

export const users_rolesCreateManyUsers_usersTousers_roles_updated_byInputSchema: z.ZodType<Prisma.users_rolesCreateManyUsers_usersTousers_roles_updated_byInput> = z.object({
  user_id: z.string(),
  role_id: z.string(),
  created_by: z.string().optional().nullable()
}).strict();

export default users_rolesCreateManyUsers_usersTousers_roles_updated_byInputSchema;
