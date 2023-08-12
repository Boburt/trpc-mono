import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { UuidFilterSchema } from './UuidFilterSchema';
import { StringFilterSchema } from './StringFilterSchema';
import { StringNullableFilterSchema } from './StringNullableFilterSchema';
import { BoolFilterSchema } from './BoolFilterSchema';
import { DateTimeFilterSchema } from './DateTimeFilterSchema';
import { UuidNullableFilterSchema } from './UuidNullableFilterSchema';
import { UsersNullableRelationFilterSchema } from './UsersNullableRelationFilterSchema';
import { usersWhereInputSchema } from './usersWhereInputSchema';
import { Roles_permissionsListRelationFilterSchema } from './Roles_permissionsListRelationFilterSchema';
import { Users_rolesListRelationFilterSchema } from './Users_rolesListRelationFilterSchema';

export const rolesWhereInputSchema: z.ZodType<Prisma.rolesWhereInput> = z.object({
  AND: z.union([ z.lazy(() => rolesWhereInputSchema),z.lazy(() => rolesWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => rolesWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => rolesWhereInputSchema),z.lazy(() => rolesWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  code: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  active: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  created_by: z.union([ z.lazy(() => UuidNullableFilterSchema),z.string() ]).optional().nullable(),
  updated_by: z.union([ z.lazy(() => UuidNullableFilterSchema),z.string() ]).optional().nullable(),
  users_roles_created_byTousers: z.union([ z.lazy(() => UsersNullableRelationFilterSchema),z.lazy(() => usersWhereInputSchema) ]).optional().nullable(),
  users_roles_updated_byTousers: z.union([ z.lazy(() => UsersNullableRelationFilterSchema),z.lazy(() => usersWhereInputSchema) ]).optional().nullable(),
  roles_permissions: z.lazy(() => Roles_permissionsListRelationFilterSchema).optional(),
  users_roles: z.lazy(() => Users_rolesListRelationFilterSchema).optional()
}).strict();

export default rolesWhereInputSchema;
