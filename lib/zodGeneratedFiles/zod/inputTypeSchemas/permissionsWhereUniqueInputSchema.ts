import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { permissionsWhereInputSchema } from './permissionsWhereInputSchema';
import { StringFilterSchema } from './StringFilterSchema';
import { BoolFilterSchema } from './BoolFilterSchema';
import { DateTimeFilterSchema } from './DateTimeFilterSchema';
import { UuidNullableFilterSchema } from './UuidNullableFilterSchema';
import { UsersNullableRelationFilterSchema } from './UsersNullableRelationFilterSchema';
import { usersWhereInputSchema } from './usersWhereInputSchema';
import { Roles_permissionsListRelationFilterSchema } from './Roles_permissionsListRelationFilterSchema';
import { Users_permissionsListRelationFilterSchema } from './Users_permissionsListRelationFilterSchema';

export const permissionsWhereUniqueInputSchema: z.ZodType<Prisma.permissionsWhereUniqueInput> = z.union([
  z.object({
    id: z.string(),
    slug: z.string()
  }),
  z.object({
    id: z.string(),
  }),
  z.object({
    slug: z.string(),
  }),
])
.and(z.object({
  id: z.string().optional(),
  slug: z.string().optional(),
  AND: z.union([ z.lazy(() => permissionsWhereInputSchema),z.lazy(() => permissionsWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => permissionsWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => permissionsWhereInputSchema),z.lazy(() => permissionsWhereInputSchema).array() ]).optional(),
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
}).strict());

export default permissionsWhereUniqueInputSchema;
