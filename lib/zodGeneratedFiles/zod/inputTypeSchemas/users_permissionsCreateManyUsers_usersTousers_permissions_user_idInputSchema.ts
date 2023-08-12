import type { Prisma } from '@prisma/client';
import { z } from 'zod';

export const users_permissionsCreateManyUsers_usersTousers_permissions_user_idInputSchema: z.ZodType<Prisma.users_permissionsCreateManyUsers_usersTousers_permissions_user_idInput> = z.object({
  permission_id: z.string(),
  created_by: z.string().optional().nullable(),
  updated_by: z.string().optional().nullable()
}).strict();

export default users_permissionsCreateManyUsers_usersTousers_permissions_user_idInputSchema;
