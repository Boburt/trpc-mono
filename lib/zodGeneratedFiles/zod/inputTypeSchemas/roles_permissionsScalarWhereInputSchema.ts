import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { UuidFilterSchema } from './UuidFilterSchema';
import { UuidNullableFilterSchema } from './UuidNullableFilterSchema';

export const roles_permissionsScalarWhereInputSchema: z.ZodType<Prisma.roles_permissionsScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => roles_permissionsScalarWhereInputSchema),z.lazy(() => roles_permissionsScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => roles_permissionsScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => roles_permissionsScalarWhereInputSchema),z.lazy(() => roles_permissionsScalarWhereInputSchema).array() ]).optional(),
  role_id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  permission_id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  created_by: z.union([ z.lazy(() => UuidNullableFilterSchema),z.string() ]).optional().nullable(),
  updated_by: z.union([ z.lazy(() => UuidNullableFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export default roles_permissionsScalarWhereInputSchema;
