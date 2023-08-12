import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { users_permissionsWhereInputSchema } from './users_permissionsWhereInputSchema';

export const Users_permissionsListRelationFilterSchema: z.ZodType<Prisma.Users_permissionsListRelationFilter> = z.object({
  every: z.lazy(() => users_permissionsWhereInputSchema).optional(),
  some: z.lazy(() => users_permissionsWhereInputSchema).optional(),
  none: z.lazy(() => users_permissionsWhereInputSchema).optional()
}).strict();

export default Users_permissionsListRelationFilterSchema;
