import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { users_rolesUser_idRole_idCompoundUniqueInputSchema } from './users_rolesUser_idRole_idCompoundUniqueInputSchema';
import { users_rolesWhereInputSchema } from './users_rolesWhereInputSchema';
import { UuidFilterSchema } from './UuidFilterSchema';
import { UuidNullableFilterSchema } from './UuidNullableFilterSchema';
import { UsersNullableRelationFilterSchema } from './UsersNullableRelationFilterSchema';
import { usersWhereInputSchema } from './usersWhereInputSchema';
import { RolesRelationFilterSchema } from './RolesRelationFilterSchema';
import { rolesWhereInputSchema } from './rolesWhereInputSchema';
import { UsersRelationFilterSchema } from './UsersRelationFilterSchema';

export const users_rolesWhereUniqueInputSchema: z.ZodType<Prisma.users_rolesWhereUniqueInput> = z.object({
  user_id_role_id: z.lazy(() => users_rolesUser_idRole_idCompoundUniqueInputSchema)
})
.and(z.object({
  user_id_role_id: z.lazy(() => users_rolesUser_idRole_idCompoundUniqueInputSchema).optional(),
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
}).strict());

export default users_rolesWhereUniqueInputSchema;
