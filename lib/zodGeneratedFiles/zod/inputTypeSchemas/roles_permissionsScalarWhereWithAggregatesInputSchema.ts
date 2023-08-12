import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { UuidWithAggregatesFilterSchema } from './UuidWithAggregatesFilterSchema';
import { UuidNullableWithAggregatesFilterSchema } from './UuidNullableWithAggregatesFilterSchema';

export const roles_permissionsScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.roles_permissionsScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => roles_permissionsScalarWhereWithAggregatesInputSchema),z.lazy(() => roles_permissionsScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => roles_permissionsScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => roles_permissionsScalarWhereWithAggregatesInputSchema),z.lazy(() => roles_permissionsScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  role_id: z.union([ z.lazy(() => UuidWithAggregatesFilterSchema),z.string() ]).optional(),
  permission_id: z.union([ z.lazy(() => UuidWithAggregatesFilterSchema),z.string() ]).optional(),
  created_by: z.union([ z.lazy(() => UuidNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  updated_by: z.union([ z.lazy(() => UuidNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export default roles_permissionsScalarWhereWithAggregatesInputSchema;
