import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { usersWhereInputSchema } from './usersWhereInputSchema';

export const UsersRelationFilterSchema: z.ZodType<Prisma.UsersRelationFilter> = z.object({
  is: z.lazy(() => usersWhereInputSchema).optional(),
  isNot: z.lazy(() => usersWhereInputSchema).optional()
}).strict();

export default UsersRelationFilterSchema;
