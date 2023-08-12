import { z } from 'zod';
import type { Prisma } from '@prisma/client';

export const rolesCountOutputTypeSelectSchema: z.ZodType<Prisma.rolesCountOutputTypeSelect> = z.object({
  roles_permissions: z.boolean().optional(),
  users_roles: z.boolean().optional(),
}).strict();

export default rolesCountOutputTypeSelectSchema;
