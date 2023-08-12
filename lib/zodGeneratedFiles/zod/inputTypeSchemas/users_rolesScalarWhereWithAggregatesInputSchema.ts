import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { UuidWithAggregatesFilterSchema } from './UuidWithAggregatesFilterSchema';
import { UuidNullableWithAggregatesFilterSchema } from './UuidNullableWithAggregatesFilterSchema';

export const users_rolesScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.users_rolesScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => users_rolesScalarWhereWithAggregatesInputSchema),z.lazy(() => users_rolesScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => users_rolesScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => users_rolesScalarWhereWithAggregatesInputSchema),z.lazy(() => users_rolesScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  user_id: z.union([ z.lazy(() => UuidWithAggregatesFilterSchema),z.string() ]).optional(),
  role_id: z.union([ z.lazy(() => UuidWithAggregatesFilterSchema),z.string() ]).optional(),
  created_by: z.union([ z.lazy(() => UuidNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  updated_by: z.union([ z.lazy(() => UuidNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export default users_rolesScalarWhereWithAggregatesInputSchema;
