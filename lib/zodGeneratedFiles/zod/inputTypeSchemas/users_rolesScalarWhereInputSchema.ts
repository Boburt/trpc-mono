import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { UuidFilterSchema } from './UuidFilterSchema';
import { UuidNullableFilterSchema } from './UuidNullableFilterSchema';

export const users_rolesScalarWhereInputSchema: z.ZodType<Prisma.users_rolesScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => users_rolesScalarWhereInputSchema),z.lazy(() => users_rolesScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => users_rolesScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => users_rolesScalarWhereInputSchema),z.lazy(() => users_rolesScalarWhereInputSchema).array() ]).optional(),
  user_id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  role_id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  created_by: z.union([ z.lazy(() => UuidNullableFilterSchema),z.string() ]).optional().nullable(),
  updated_by: z.union([ z.lazy(() => UuidNullableFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export default users_rolesScalarWhereInputSchema;
