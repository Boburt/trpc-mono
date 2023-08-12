import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { UuidWithAggregatesFilterSchema } from './UuidWithAggregatesFilterSchema';
import { StringWithAggregatesFilterSchema } from './StringWithAggregatesFilterSchema';
import { BoolWithAggregatesFilterSchema } from './BoolWithAggregatesFilterSchema';
import { DateTimeWithAggregatesFilterSchema } from './DateTimeWithAggregatesFilterSchema';
import { UuidNullableWithAggregatesFilterSchema } from './UuidNullableWithAggregatesFilterSchema';

export const permissionsScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.permissionsScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => permissionsScalarWhereWithAggregatesInputSchema),z.lazy(() => permissionsScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => permissionsScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => permissionsScalarWhereWithAggregatesInputSchema),z.lazy(() => permissionsScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidWithAggregatesFilterSchema),z.string() ]).optional(),
  slug: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  active: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  created_by: z.union([ z.lazy(() => UuidNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  updated_by: z.union([ z.lazy(() => UuidNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export default permissionsScalarWhereWithAggregatesInputSchema;
