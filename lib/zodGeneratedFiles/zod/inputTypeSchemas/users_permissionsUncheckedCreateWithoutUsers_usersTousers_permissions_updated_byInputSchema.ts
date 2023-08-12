import type { Prisma } from '@prisma/client';
import { z } from 'zod';

export const users_permissionsUncheckedCreateWithoutUsers_usersTousers_permissions_updated_byInputSchema: z.ZodType<Prisma.users_permissionsUncheckedCreateWithoutUsers_usersTousers_permissions_updated_byInput> = z.object({
  user_id: z.string(),
  permission_id: z.string(),
  created_by: z.string().optional().nullable()
}).strict();

export default users_permissionsUncheckedCreateWithoutUsers_usersTousers_permissions_updated_byInputSchema;
