import type { Prisma } from '@prisma/client';
import { z } from 'zod';

export const users_rolesCreateManyInputSchema: z.ZodType<Prisma.users_rolesCreateManyInput> = z.object({
  user_id: z.string(),
  role_id: z.string(),
  created_by: z.string().optional().nullable(),
  updated_by: z.string().optional().nullable()
}).strict();

export default users_rolesCreateManyInputSchema;
