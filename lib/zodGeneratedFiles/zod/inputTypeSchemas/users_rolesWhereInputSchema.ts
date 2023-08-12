import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { UuidFilterSchema } from './UuidFilterSchema';
import { UuidNullableFilterSchema } from './UuidNullableFilterSchema';
import { UsersNullableRelationFilterSchema } from './UsersNullableRelationFilterSchema';
import { usersWhereInputSchema } from './usersWhereInputSchema';
import { RolesRelationFilterSchema } from './RolesRelationFilterSchema';
import { rolesWhereInputSchema } from './rolesWhereInputSchema';
import { UsersRelationFilterSchema } from './UsersRelationFilterSchema';

export const users_rolesWhereInputSchema: z.ZodType<Prisma.users_rolesWhereInput> = z.object({
  AND: z.union([ z.lazy(() => users_rolesWhereInputSchema),z.lazy(() => users_rolesWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => users_rolesWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => users_rolesWhereInputSchema),z.lazy(() => users_rolesWhereInputSchema).array() ]).optional(),
  user_id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  role_id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  created_by: z.union([ z.lazy(() => UuidNullableFilterSchema),z.string() ]).optional().nullable(),
  updated_by: z.union([ z.lazy(() => UuidNullableFilterSchema),z.string() ]).optional().nullable(),
  users_usersTousers_roles_created_by: z.union([ z.lazy(() => UsersNullableRelationFilterSchema),z.lazy(() => usersWhereInputSchema) ]).optional().nullable(),
  roles: z.union([ z.lazy(() => RolesRelationFilterSchema),z.lazy(() => rolesWhereInputSchema) ]).optional(),
  users_usersTousers_roles_updated_by: z.union([ z.lazy(() => UsersNullableRelationFilterSchema),z.lazy(() => usersWhereInputSchema) ]).optional().nullable(),
  users_usersTousers_roles_user_id: z.union([ z.lazy(() => UsersRelationFilterSchema),z.lazy(() => usersWhereInputSchema) ]).optional(),
}).strict();

export default users_rolesWhereInputSchema;
