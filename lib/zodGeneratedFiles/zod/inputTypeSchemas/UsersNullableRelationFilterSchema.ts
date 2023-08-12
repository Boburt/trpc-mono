import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { usersWhereInputSchema } from './usersWhereInputSchema';

export const UsersNullableRelationFilterSchema: z.ZodType<Prisma.UsersNullableRelationFilter> = z.object({
  is: z.lazy(() => usersWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => usersWhereInputSchema).optional().nullable()
}).strict();

export default UsersNullableRelationFilterSchema;
