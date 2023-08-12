import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { users_rolesWhereInputSchema } from './users_rolesWhereInputSchema';

export const Users_rolesListRelationFilterSchema: z.ZodType<Prisma.Users_rolesListRelationFilter> = z.object({
  every: z.lazy(() => users_rolesWhereInputSchema).optional(),
  some: z.lazy(() => users_rolesWhereInputSchema).optional(),
  none: z.lazy(() => users_rolesWhereInputSchema).optional()
}).strict();

export default Users_rolesListRelationFilterSchema;
