import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { UuidWithAggregatesFilterSchema } from './UuidWithAggregatesFilterSchema';
import { UuidNullableWithAggregatesFilterSchema } from './UuidNullableWithAggregatesFilterSchema';

export const users_permissionsScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.users_permissionsScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => users_permissionsScalarWhereWithAggregatesInputSchema),z.lazy(() => users_permissionsScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => users_permissionsScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => users_permissionsScalarWhereWithAggregatesInputSchema),z.lazy(() => users_permissionsScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  user_id: z.union([ z.lazy(() => UuidWithAggregatesFilterSchema),z.string() ]).optional(),
  permission_id: z.union([ z.lazy(() => UuidWithAggregatesFilterSchema),z.string() ]).optional(),
  created_by: z.union([ z.lazy(() => UuidNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  updated_by: z.union([ z.lazy(() => UuidNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export default users_permissionsScalarWhereWithAggregatesInputSchema;
