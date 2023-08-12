import { z } from 'zod';
import type { Prisma } from '@prisma/client';

export const permissionsCountOutputTypeSelectSchema: z.ZodType<Prisma.permissionsCountOutputTypeSelect> = z.object({
  roles_permissions: z.boolean().optional(),
  users_permissions: z.boolean().optional(),
}).strict();

export default permissionsCountOutputTypeSelectSchema;
