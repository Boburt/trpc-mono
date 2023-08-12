import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { UuidFilterSchema } from './UuidFilterSchema';
import { UuidNullableFilterSchema } from './UuidNullableFilterSchema';

export const users_permissionsScalarWhereInputSchema: z.ZodType<Prisma.users_permissionsScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => users_permissionsScalarWhereInputSchema),z.lazy(() => users_permissionsScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => users_permissionsScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => users_permissionsScalarWhereInputSchema),z.lazy(() => users_permissionsScalarWhereInputSchema).array() ]).optional(),
  user_id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  permission_id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  created_by: z.union([ z.lazy(() => UuidNullableFilterSchema),z.string() ]).optional().nullable(),
  updated_by: z.union([ z.lazy(() => UuidNullableFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export default users_permissionsScalarWhereInputSchema;
