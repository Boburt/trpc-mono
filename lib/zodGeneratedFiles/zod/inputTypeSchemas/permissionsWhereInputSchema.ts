import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { UuidFilterSchema } from './UuidFilterSchema';
import { StringFilterSchema } from './StringFilterSchema';
import { BoolFilterSchema } from './BoolFilterSchema';
import { DateTimeFilterSchema } from './DateTimeFilterSchema';
import { UuidNullableFilterSchema } from './UuidNullableFilterSchema';
import { UsersNullableRelationFilterSchema } from './UsersNullableRelationFilterSchema';
import { usersWhereInputSchema } from './usersWhereInputSchema';
import { Roles_permissionsListRelationFilterSchema } from './Roles_permissionsListRelationFilterSchema';
import { Users_permissionsListRelationFilterSchema } from './Users_permissionsListRelationFilterSchema';

export const permissionsWhereInputSchema: z.ZodType<Prisma.permissionsWhereInput> = z.object({
  AND: z.union([ z.lazy(() => permissionsWhereInputSchema),z.lazy(() => permissionsWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => permissionsWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => permissionsWhereInputSchema),z.lazy(() => permissionsWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  slug: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  active: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  created_by: z.union([ z.lazy(() => UuidNullableFilterSchema),z.string() ]).optional().nullable(),
  updated_by: z.union([ z.lazy(() => UuidNullableFilterSchema),z.string() ]).optional().nullable(),
  users_permissions_created_byTousers: z.union([ z.lazy(() => UsersNullableRelationFilterSchema),z.lazy(() => usersWhereInputSchema) ]).optional().nullable(),
  users_permissions_updated_byTousers: z.union([ z.lazy(() => UsersNullableRelationFilterSchema),z.lazy(() => usersWhereInputSchema) ]).optional().nullable(),
  roles_permissions: z.lazy(() => Roles_permissionsListRelationFilterSchema).optional(),
  users_permissions: z.lazy(() => Users_permissionsListRelationFilterSchema).optional()
}).strict();

export default permissionsWhereInputSchema;
